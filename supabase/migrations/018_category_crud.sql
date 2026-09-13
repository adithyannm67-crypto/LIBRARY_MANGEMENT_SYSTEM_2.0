-- Category CRUD RPCs used by the admin categories page modals.
--
--   save_category   -> the add/edit-category modal calls supabase.rpc('save_category', {...})
--   delete_category -> the delete-category confirm modal calls supabase.rpc('delete_category', {...})
--
-- Flow notes:
--   * save_category upserts by category_id when given; otherwise it resolves
--     an existing category by lower(name) (so categories created by save_book
--     are reused) and falls back to inserting a fresh `c<N>` row.
--   * delete_category nulls out books.category_id references, deletes the row,
--     then resyncs categories.book_count from the remaining books. books keeps
--     its display `category` text column, so unlinking an unused id is safe.
-- Idempotent: safe to run on the live DB or a fresh rebuild.

-- ============================================================
-- 1. RLS write access for categories (defensive: the policies
--    may already exist from migration 013/014).
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='categories' AND policyname='CATEGORIES_WRITE') THEN
    CREATE POLICY "CATEGORIES_WRITE" ON categories FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

GRANT SELECT, INSERT, UPDATE, DELETE ON categories TO anon, authenticated;

-- ============================================================
-- 2. save_category RPC
--    p_category_id '' (or missing) => create; otherwise update that row.
--    If a row with the same lower(name) already exists it is updated
--    and its id returned, keeping names unique per categories_name_key.
-- ============================================================
CREATE OR REPLACE FUNCTION save_category(
  p_category_id TEXT,
  p_name TEXT,
  p_description TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_name TEXT := btrim(p_name);
  v_id TEXT := btrim(p_category_id);
BEGIN
  IF v_name = '' THEN
    RAISE EXCEPTION 'Category name is required';
  END IF;

  -- Edit by id: update the row directly.
  IF v_id <> '' AND EXISTS (SELECT 1 FROM categories WHERE category_id = v_id) THEN
    UPDATE categories SET
      name = v_name,
      description = coalesce(btrim(p_description), '')
    WHERE category_id = v_id;
    RETURN v_id;
  END IF;

  -- Reuse an existing category with the same name (case-insensitive).
  SELECT category_id INTO v_id
  FROM categories
  WHERE lower(name) = lower(v_name)
  LIMIT 1;

  IF v_id IS NOT NULL THEN
    UPDATE categories SET
      description = coalesce(btrim(p_description), '')
    WHERE category_id = v_id;
    RETURN v_id;
  END IF;

  -- Create a fresh category with the next c<N> id.
  v_id := 'c' || (
    SELECT COALESCE(MAX(NULLIF(regexp_replace(category_id, '\D', '', 'g'), '')::bigint), 0) + 1
    FROM categories
    WHERE category_id ~ '^c[0-9]+$'
  );

  INSERT INTO categories (category_id, name, description, book_count)
  VALUES (v_id, v_name, coalesce(btrim(p_description), ''), 0);

  RETURN v_id;
END;
$$;

GRANT EXECUTE ON FUNCTION save_category(TEXT, TEXT, TEXT) TO anon, authenticated;

-- ============================================================
-- 3. delete_category RPC
--    Returns TRUE if a category was deleted, FALSE if it didn't exist.
--    Unlinks books.category_id (books keeps its display name in the
--    `category` column), deletes the row, then resyncs book_count.
-- ============================================================
CREATE OR REPLACE FUNCTION delete_category(p_category_id TEXT)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM categories WHERE category_id = p_category_id) THEN
    RETURN false;
  END IF;

  -- Unlink books that pointed at this category.
  UPDATE books SET category_id = NULL WHERE category_id = p_category_id;

  DELETE FROM categories WHERE category_id = p_category_id;

  -- Keep categories.book_count in sync with the actual books count.
  -- "WHERE true" is required: the safeupdate extension on Supabase API
  -- roles rejects UPDATE statements without an explicit WHERE clause.
  UPDATE categories c
  SET book_count = (SELECT COUNT(*) FROM books b WHERE b.category_id = c.category_id)
  WHERE true;

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION delete_category(TEXT) TO anon, authenticated;
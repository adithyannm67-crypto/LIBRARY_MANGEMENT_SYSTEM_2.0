-- Author CRUD RPCs used by the admin authors page modals.
--
--   save_author  -> the add/edit-author modal calls supabase.rpc('save_author', {...})
--   delete_author -> the delete-author confirm modal calls supabase.rpc('delete_author', {...})
--
-- Flow notes:
--   * save_author upserts by author_id when given; otherwise it resolves an
--     existing author by lower(name) (so authors created by save_book are
--     reused) and falls back to inserting a fresh `au<N>` row.
--   * delete_author removes the author's book_auther_mapping links (the only
--     FK reference to authors) before deleting the row, then resyncs
--     authors.book_count from the mapping.
-- Idempotent: safe to run on the live DB or a fresh rebuild.

-- ============================================================
-- 1. RLS write access for the authors table (currently SELECT-only;
--    the RPCs run as the calling role via SECURITY INVOKER).
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='authors' AND policyname='AUTHERS_WRITE') THEN
    CREATE POLICY "AUTHERS_WRITE" ON authors FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

GRANT SELECT, INSERT, UPDATE, DELETE ON authors TO anon, authenticated;

-- ============================================================
-- 2. save_author RPC
--    p_author_id '' (or missing) => create; otherwise update that row.
--    If a row with the same lower(name) already exists it is updated
--    and its id returned, keeping names unique per the authors_name_key
--    constraint added in migration 012.
-- ============================================================
CREATE OR REPLACE FUNCTION save_author(
  p_author_id TEXT,
  p_name TEXT,
  p_nationality TEXT,
  p_bio TEXT,
  p_rating NUMERIC
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_name TEXT := btrim(p_name);
  v_id TEXT := btrim(p_author_id);
BEGIN
  IF v_name = '' THEN
    RAISE EXCEPTION 'Author name is required';
  END IF;

  -- Edit by id: update the row directly.
  IF v_id <> '' AND EXISTS (SELECT 1 FROM authors WHERE author_id = v_id) THEN
    UPDATE authors SET
      name = v_name,
      nationality = coalesce(btrim(p_nationality), ''),
      bio = coalesce(btrim(p_bio), ''),
      rating = coalesce(p_rating, 0)
    WHERE author_id = v_id;
    RETURN v_id;
  END IF;

  -- Reuse an existing author with the same name (case-insensitive).
  SELECT author_id INTO v_id
  FROM authors
  WHERE lower(name) = lower(v_name)
  LIMIT 1;

  IF v_id IS NOT NULL THEN
    UPDATE authors SET
      nationality = coalesce(btrim(p_nationality), ''),
      bio = coalesce(btrim(p_bio), ''),
      rating = coalesce(p_rating, 0)
    WHERE author_id = v_id;
    RETURN v_id;
  END IF;

  -- Create a fresh author with the next au<N> id.
  v_id := 'au' || (
    SELECT COALESCE(MAX(NULLIF(regexp_replace(author_id, '\D', '', 'g'), '')::bigint), 0) + 1
    FROM authors
    WHERE author_id ~ '^au[0-9]+$'
  );

  INSERT INTO authors (author_id, name, nationality, book_count, borrow_count, rating, bio)
  VALUES (v_id, v_name, coalesce(btrim(p_nationality), ''), 0, 0, coalesce(p_rating, 0), coalesce(btrim(p_bio), ''));

  RETURN v_id;
END;
$$;

GRANT EXECUTE ON FUNCTION save_author(TEXT, TEXT, TEXT, TEXT, NUMERIC) TO anon, authenticated;

-- ============================================================
-- 3. delete_author RPC
--    Returns TRUE if an author was deleted, FALSE if it didn't exist.
--    Removes the book<->author mapping links first (the only FK
--    referencing authors) so books are not orphaned, then resyncs
--    authors.book_count for the remaining rows.
-- ============================================================
CREATE OR REPLACE FUNCTION delete_author(p_author_id TEXT)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM authors WHERE author_id = p_author_id) THEN
    RETURN false;
  END IF;

  -- Unlink the author from any books.
  DELETE FROM book_auther_mapping WHERE author_id = p_author_id;

  DELETE FROM authors WHERE author_id = p_author_id;

  -- Keep authors.book_count in sync with the mapping.
  -- "WHERE true" is required: the safeupdate extension on Supabase API
  -- roles rejects UPDATE statements without an explicit WHERE clause.
  UPDATE authors a
  SET book_count = (SELECT COUNT(*) FROM book_auther_mapping ba WHERE ba.author_id = a.author_id)
  WHERE true;

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION delete_author(TEXT) TO anon, authenticated;
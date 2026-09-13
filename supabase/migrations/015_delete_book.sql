-- delete_book RPC used by the Delete button on each admin books-table row.
-- Flow: grab the book's title -> remove its physical copies from inventory
-- (inventory is keyed by book_title, not book_id) -> remove the author
-- mapping (the only FK referencing books) -> delete the book ->
-- resync authors.book_count and categories.book_count.
-- Idempotent: safe to run on the live DB or a fresh rebuild.

-- ============================================================
-- 1. RLS write access for inventory (currently SELECT-only).
--    books && book_auther_mapping already have ALL policies from 013.
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='inventory' AND policyname='INVENTORY_WRITE') THEN
    CREATE POLICY "INVENTORY_WRITE" ON inventory FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

GRANT SELECT, INSERT, UPDATE, DELETE ON inventory TO anon, authenticated;

-- ============================================================
-- 2. delete_book RPC
--    Returns TRUE if a book was deleted, FALSE if it didn't exist.
-- ============================================================
CREATE OR REPLACE FUNCTION delete_book(p_book_id TEXT)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_title TEXT;
BEGIN
  SELECT title INTO v_title FROM books WHERE book_id = p_book_id;
  IF v_title IS NULL THEN
    RETURN false;
  END IF;

  -- 1. Physical copies tied to this title
  DELETE FROM inventory WHERE book_title = v_title;

  -- 2. Author mapping (only FK referencing books)
  DELETE FROM book_auther_mapping WHERE book_id = p_book_id;

  -- 3. The book itself
  DELETE FROM books WHERE book_id = p_book_id;

  -- 4. Keep authors.book_count in sync with the mapping.
  --    "WHERE true" is required: the safeupdate extension on Supabase API
  --    roles rejects UPDATE statements without an explicit WHERE clause.
  UPDATE authors a
  SET book_count = (SELECT COUNT(*) FROM book_auther_mapping ba WHERE ba.author_id = a.author_id)
  WHERE true;

  -- 5. Keep categories.book_count in sync with the actual books count.
  UPDATE categories c
  SET book_count = (SELECT COUNT(*) FROM books b WHERE b.category_id = c.category_id)
  WHERE true;

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION delete_book(TEXT) TO anon, authenticated;
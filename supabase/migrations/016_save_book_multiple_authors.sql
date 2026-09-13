-- Update save_book RPC to accept MULTIPLE author names (p_author_names TEXT[]).
-- Migration 014 created the single-author version; the add/edit-book modal
-- now submits an array of author names, so each name is resolved/created and
-- inserted into book_auther_mapping individually.
-- Idempotent: safe to run on the live DB or a fresh rebuild.

-- ============================================================
-- save_book RPC — the modal calls supabase.rpc('save_book', {...})
--    Flow: resolve publisher by name (create if missing) ->
--    resolve category by name (create if missing) ->
--    upsert book (mapping books.category_id to the category) ->
--    for EACH author name: reuse existing author or insert new ->
--    rebuild book<->author mapping -> sync authors.book_count
--    -> sync categories.book_count
-- ============================================================
CREATE OR REPLACE FUNCTION save_book(
  p_book_id TEXT,
  p_title TEXT,
  p_author_names TEXT[],
  p_isbn TEXT,
  p_category TEXT,
  p_subcategory TEXT,
  p_publisher TEXT,
  p_published_year INTEGER,
  p_pages INTEGER,
  p_language TEXT,
  p_rating NUMERIC,
  p_total_copies INTEGER,
  p_available_copies INTEGER,
  p_tags TEXT,
  p_is_new BOOLEAN,
  p_is_bestseller BOOLEAN,
  p_description TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_author_id TEXT;
  v_author_name TEXT;
  v_publisher_id TEXT;
  v_category_id TEXT;
BEGIN
  -- 1. Resolve publisher by name; create if missing (books stores publisher_id)
  SELECT publisher_id INTO v_publisher_id
  FROM publishers
  WHERE lower(name) = lower(btrim(p_publisher))
  LIMIT 1;

  IF v_publisher_id IS NULL THEN
    v_publisher_id := 'pub' || (
      SELECT COALESCE(MAX(NULLIF(regexp_replace(publisher_id, '\D', '', 'g'), '')::bigint), 0) + 1
      FROM publishers
      WHERE publisher_id ~ '^pub[0-9]+$'
    );
    INSERT INTO publishers (publisher_id, name)
    VALUES (v_publisher_id, btrim(p_publisher));
  END IF;

  -- 2. Resolve category by name; create if missing (books stores category_id)
  SELECT category_id INTO v_category_id
  FROM categories
  WHERE lower(name) = lower(btrim(p_category))
  LIMIT 1;

  IF v_category_id IS NULL THEN
    v_category_id := 'c' || (
      SELECT COALESCE(MAX(NULLIF(regexp_replace(category_id, '\D', '', 'g'), '')::bigint), 0) + 1
      FROM categories
      WHERE category_id ~ '^c[0-9]+$'
    );
    INSERT INTO categories (category_id, name, book_count)
    VALUES (v_category_id, btrim(p_category), 0);
  END IF;

  -- 3. Upsert the book (books.category_id maps to the categories row)
  INSERT INTO books (
    book_id, title, isbn, category, subcategory, category_id, publisher_id,
    published_year, pages, language, rating, review_count,
    total_copies, available_copies, tags, is_new, is_bestseller, description
  ) VALUES (
    p_book_id, btrim(p_title), p_isbn, p_category, p_subcategory, v_category_id, v_publisher_id,
    p_published_year, p_pages, p_language, p_rating, 0,
    p_total_copies, p_available_copies, p_tags, p_is_new, p_is_bestseller, p_description
  )
  ON CONFLICT (book_id) DO UPDATE SET
    title = EXCLUDED.title,
    isbn = EXCLUDED.isbn,
    category = EXCLUDED.category,
    subcategory = EXCLUDED.subcategory,
    category_id = EXCLUDED.category_id,
    publisher_id = EXCLUDED.publisher_id,
    published_year = EXCLUDED.published_year,
    pages = EXCLUDED.pages,
    language = EXCLUDED.language,
    rating = EXCLUDED.rating,
    total_copies = EXCLUDED.total_copies,
    available_copies = EXCLUDED.available_copies,
    tags = EXCLUDED.tags,
    is_new = EXCLUDED.is_new,
    is_bestseller = EXCLUDED.is_bestseller,
    description = EXCLUDED.description;

  -- 4. Rebuild the mapping for this book for EVERY author name.
  IF p_author_names IS NULL OR cardinality(p_author_names) = 0 THEN
    RAISE EXCEPTION 'At least one author is required';
  END IF;

  DELETE FROM book_auther_mapping WHERE book_id = p_book_id;

  FOREACH v_author_name IN ARRAY p_author_names LOOP
    v_author_name := btrim(v_author_name);
    CONTINUE WHEN v_author_name = '';

    -- Author exists (case-insensitive)? reuse : insert
    SELECT author_id INTO v_author_id
    FROM authors
    WHERE lower(name) = lower(v_author_name)
    LIMIT 1;

    IF v_author_id IS NULL THEN
      v_author_id := 'au' || (
        SELECT COALESCE(MAX(NULLIF(regexp_replace(author_id, '\D', '', 'g'), '')::bigint), 0) + 1
        FROM authors
        WHERE author_id ~ '^au[0-9]+$'
      );
      INSERT INTO authors (author_id, name, book_count, borrow_count)
      VALUES (v_author_id, v_author_name, 0, 0);
    END IF;

    INSERT INTO book_auther_mapping (book_id, author_id)
    VALUES (p_book_id, v_author_id);
  END LOOP;

  -- 5. Keep authors.book_count in sync with the mapping.
  --     "WHERE true" is required: the safeupdate extension on Supabase API
  --     roles rejects UPDATE statements without an explicit WHERE clause.
  UPDATE authors a
  SET book_count = (SELECT COUNT(*) FROM book_auther_mapping ba WHERE ba.author_id = a.author_id)
  WHERE true;

  -- 6. Keep categories.book_count in sync with the actual books count.
  UPDATE categories c
  SET book_count = (SELECT COUNT(*) FROM books b WHERE b.category_id = c.category_id)
  WHERE true;

  RETURN v_author_id;
END;
$$;

GRANT EXECUTE ON FUNCTION save_book(
  TEXT, TEXT, TEXT[], TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER,
  TEXT, NUMERIC, INTEGER, INTEGER, TEXT, BOOLEAN, BOOLEAN, TEXT
) TO anon, authenticated;
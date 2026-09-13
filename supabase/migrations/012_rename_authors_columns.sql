-- Normalize authors table to match the Author type used in the app
-- (author_id PK, snake_case columns, unique name for author-exists lookup)
-- Idempotent: skips renames/constraints that already exist.

DO $$
BEGIN
  -- PK column: id -> author_id
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='public' AND table_name='authors' AND column_name='id')
     AND NOT EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='public' AND table_name='authors' AND column_name='author_id') THEN
    ALTER TABLE authors RENAME COLUMN id TO author_id;
  END IF;

  -- bookCount -> book_count
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='public' AND table_name='authors' AND column_name='bookCount') THEN
    ALTER TABLE authors RENAME COLUMN bookCount TO book_count;
  END IF;

  -- borrowCount -> borrow_count (or live variant total_borrows)
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='public' AND table_name='authors' AND column_name='borrowCount') THEN
    ALTER TABLE authors RENAME COLUMN borrowCount TO borrow_count;
  ELSIF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='public' AND table_name='authors' AND column_name='total_borrows') THEN
    ALTER TABLE authors RENAME COLUMN total_borrows TO borrow_count;
  END IF;

  -- Unique constraint on name (used for the author-exists lookup)
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                 WHERE conrelid = 'public.authors'::regclass AND conname = 'authors_name_key') THEN
    ALTER TABLE authors ADD CONSTRAINT authors_name_key UNIQUE (name);
  END IF;
END $$;

-- Keep the name index current
DROP INDEX IF EXISTS idx_authors_name;
CREATE INDEX IF NOT EXISTS idx_authors_name ON authors(name);

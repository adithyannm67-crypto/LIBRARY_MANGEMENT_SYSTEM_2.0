-- Create books table for the library catalog
CREATE TABLE IF NOT EXISTS books (
  book_id TEXT NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  publisher TEXT NOT NULL,
  published_year INTEGER NOT NULL,
  pages INTEGER NOT NULL,
  language TEXT NOT NULL,
  rating NUMERIC(3, 1) NOT NULL,
  review_count INTEGER NOT NULL DEFAULT 0,
  total_copies INTEGER NOT NULL DEFAULT 0,
  available_copies INTEGER NOT NULL DEFAULT 0,
  tags TEXT NOT NULL,
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_bestseller BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL,
  CONSTRAINT books_pkey1 PRIMARY KEY (book_id),
  CONSTRAINT books_isbn_key UNIQUE (isbn)
);

-- Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON books
  FOR SELECT
  USING (true);

-- Create indexes for common queries
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_isbn ON books(isbn);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_title ON books USING gin(to_tsvector('english', title));

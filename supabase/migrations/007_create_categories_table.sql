-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  category_id VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  book_count INTEGER DEFAULT 0,
  CONSTRAINT categories_pkey PRIMARY KEY (category_id),
  CONSTRAINT categories_name_key UNIQUE (name)
);

-- Index for lookups
CREATE INDEX idx_categories_name ON categories(name);

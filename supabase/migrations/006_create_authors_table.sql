-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  nationality TEXT NOT NULL DEFAULT '',
  bookCount INTEGER NOT NULL DEFAULT 0,
  borrowCount INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 0,
  bio TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON authors
  FOR SELECT
  USING (true);

-- Create indexes for common queries
CREATE INDEX idx_authors_name ON authors(name);
CREATE INDEX idx_authors_nationality ON authors(nationality);

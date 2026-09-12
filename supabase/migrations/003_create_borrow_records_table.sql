-- Create borrow_records table for tracking book borrows
CREATE TABLE IF NOT EXISTS borrow_records (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(member_id) ON DELETE CASCADE,
  book_id TEXT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  borrowedAt TEXT NOT NULL,
  dueAt TEXT NOT NULL,
  returnedAt TEXT,
  renewCount INTEGER NOT NULL DEFAULT 0,
  maxRenews INTEGER NOT NULL DEFAULT 2,
  borrowrecord_status TEXT NOT NULL DEFAULT 'active' CHECK (borrowrecord_status IN ('active', 'overdue', 'returned')),
  fine NUMERIC(10, 2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE borrow_records ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON borrow_records
  FOR SELECT
  USING (true);

-- Create indexes for common queries
CREATE INDEX idx_borrow_records_member_id ON borrow_records(member_id);
CREATE INDEX idx_borrow_records_book_id ON borrow_records(book_id);
CREATE INDEX idx_borrow_records_status ON borrow_records(borrowrecord_status);

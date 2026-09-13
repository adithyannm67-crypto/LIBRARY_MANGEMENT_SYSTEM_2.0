-- Create borrow_records table
CREATE TABLE IF NOT EXISTS borrow_records (
  borrowrecord_id TEXT NOT NULL,
  member_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  borrowed_at TIMESTAMPTZ NOT NULL,
  due_at TIMESTAMPTZ NOT NULL,
  returned_at TIMESTAMPTZ,
  renew_count INTEGER NOT NULL DEFAULT 0,
  max_renews INTEGER NOT NULL DEFAULT 2,
  borrowrecord_status TEXT NOT NULL,
  fine NUMERIC(10, 2) NOT NULL DEFAULT 0,
  notes TEXT,
  CONSTRAINT borrow_records_pkey PRIMARY KEY (borrowrecord_id),
  CONSTRAINT borrow_records_book_id_fkey FOREIGN KEY (book_id) REFERENCES "booksOld" (book_id),
  CONSTRAINT borrow_records_member_id_fkey FOREIGN KEY (member_id) REFERENCES members (member_id),
  CONSTRAINT borrow_records_borrowrecord_status_check CHECK (
    borrowrecord_status = ANY(ARRAY['active'::TEXT, 'overdue'::TEXT, 'returned'::TEXT])
  )
);

-- Indexes
CREATE INDEX idx_borrow_records_member_id ON borrow_records(member_id);
CREATE INDEX idx_borrow_records_book_id ON borrow_records(book_id);
CREATE INDEX idx_borrow_records_status ON borrow_records(borrowrecord_status);
CREATE INDEX idx_borrow_records_due_at ON borrow_records(due_at);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  reservation_id VARCHAR(20) NOT NULL,
  member_name VARCHAR(100) NOT NULL,
  book_title VARCHAR(255) NOT NULL,
  reserved_at DATE NOT NULL,
  queue_position INTEGER NOT NULL,
  total_queue INTEGER NOT NULL,
  est_availability DATE,
  expires_at DATE,
  status VARCHAR(20) NOT NULL,
  CONSTRAINT reservations_pkey PRIMARY KEY (reservation_id)
);

-- Indexes
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_member_name ON reservations(member_name);
CREATE INDEX idx_reservations_book_title ON reservations(book_title);

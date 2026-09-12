-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
  inventory_id VARCHAR(10) NOT NULL,
  book_title VARCHAR(255) NOT NULL,
  copy_number INTEGER NOT NULL,
  condition VARCHAR(50) DEFAULT 'good',
  status VARCHAR(50) DEFAULT 'available',
  acquired_at DATE,
  last_checked DATE,
  notes TEXT,
  CONSTRAINT inventory_pkey PRIMARY KEY (inventory_id)
);

-- Indexes
CREATE INDEX idx_inventory_book_title ON inventory(book_title);
CREATE INDEX idx_inventory_status ON inventory(status);
CREATE INDEX idx_inventory_condition ON inventory(condition);

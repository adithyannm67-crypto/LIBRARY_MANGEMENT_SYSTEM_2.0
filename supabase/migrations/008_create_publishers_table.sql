-- Create publishers table
CREATE TABLE IF NOT EXISTS publishers (
  publisher_id VARCHAR(10) NOT NULL,
  name VARCHAR(150) NOT NULL,
  country VARCHAR(100) DEFAULT 'USA',
  books_in_library INTEGER DEFAULT 0,
  founded INTEGER,
  website VARCHAR(255),
  contact_email VARCHAR(255),
  CONSTRAINT publishers_pkey PRIMARY KEY (publisher_id)
);

-- Index for lookups
CREATE INDEX idx_publishers_name ON publishers(name);

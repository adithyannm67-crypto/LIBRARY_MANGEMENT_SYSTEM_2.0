-- Create members table for admin portal
CREATE TABLE IF NOT EXISTS members (
  member_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  avatarInitials TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  member_status TEXT NOT NULL DEFAULT 'active' CHECK (member_status IN ('active', 'suspended', 'expired')),
  tier TEXT NOT NULL DEFAULT 'Standard' CHECK (tier IN ('Standard', 'Premium', 'Staff')),
  memberSince TEXT NOT NULL,
  institution TEXT,
  bio TEXT,
  borrowCount INTEGER NOT NULL DEFAULT 0,
  activeLoans INTEGER NOT NULL DEFAULT 0,
  overdueCount INTEGER NOT NULL DEFAULT 0,
  returnedCount INTEGER NOT NULL DEFAULT 0,
  reservationCount INTEGER NOT NULL DEFAULT 0,
  fines NUMERIC(10, 2) NOT NULL DEFAULT 0,
  totalFinesPaid NUMERIC(10, 2) NOT NULL DEFAULT 0,
  favoriteCategory TEXT,
  totalReadingHours INTEGER NOT NULL DEFAULT 0,
  lastActivity TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (adjust based on your auth setup)
CREATE POLICY "Allow admin read access" ON members
  FOR SELECT
  USING (true);  -- Adjust this based on your auth requirements

-- Create index for common queries
CREATE INDEX idx_members_status ON members(member_status);
CREATE INDEX idx_members_tier ON members(tier);
CREATE INDEX idx_members_email ON members(email);

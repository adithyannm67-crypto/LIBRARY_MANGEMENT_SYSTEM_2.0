-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '🏆',
  category TEXT NOT NULL DEFAULT 'general',
  rarity TEXT NOT NULL DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  points INTEGER NOT NULL DEFAULT 0,
  target INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON achievements
  FOR SELECT
  USING (true);

-- Create user_achievements table (tracks per-member progress)
CREATE TABLE IF NOT EXISTS user_achievements (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  achievement_id TEXT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  member_id TEXT NOT NULL REFERENCES members(member_id) ON DELETE CASCADE,
  progress INTEGER NOT NULL DEFAULT 0,
  unlocked BOOLEAN NOT NULL DEFAULT false,
  unlocked_at TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(achievement_id, member_id)
);

-- Enable Row Level Security
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON user_achievements
  FOR SELECT
  USING (true);

-- Create indexes for common queries
CREATE INDEX idx_user_achievements_member_id ON user_achievements(member_id);
CREATE INDEX idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- ====================================
-- WARRANTY KEEPER DATABASE SCHEMA
-- ====================================
-- Run this in Supabase SQL Editor
-- ====================================

-- Drop existing tables if they exist (for fresh install)
DROP TABLE IF EXISTS warranties CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 1. Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- 2. Warranties Table
CREATE TABLE warranties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product TEXT NOT NULL,
  platform TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  purchase_date DATE NOT NULL,
  expires_at DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranties ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for Categories
-- Allow users to view only their own categories
CREATE POLICY "Users can view own categories"
  ON categories FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own categories
CREATE POLICY "Users can insert own categories"
  ON categories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own categories
CREATE POLICY "Users can update own categories"
  ON categories FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow users to delete their own categories
CREATE POLICY "Users can delete own categories"
  ON categories FOR DELETE
  USING (auth.uid() = user_id);

-- 5. RLS Policies for Warranties
-- Allow users to view only their own warranties
CREATE POLICY "Users can view own warranties"
  ON warranties FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own warranties
CREATE POLICY "Users can insert own warranties"
  ON warranties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own warranties
CREATE POLICY "Users can update own warranties"
  ON warranties FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow users to delete their own warranties
CREATE POLICY "Users can delete own warranties"
  ON warranties FOR DELETE
  USING (auth.uid() = user_id);

-- 6. Create index for better performance
CREATE INDEX IF NOT EXISTS idx_warranties_user_id ON warranties(user_id);
CREATE INDEX IF NOT EXISTS idx_warranties_expires_at ON warranties(expires_at);
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);

-- 7. Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Trigger to auto-update updated_at
CREATE TRIGGER update_warranties_updated_at
  BEFORE UPDATE ON warranties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Done! Your database is ready.

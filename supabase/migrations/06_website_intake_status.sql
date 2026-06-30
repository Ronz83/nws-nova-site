-- Add status column to website_intake table
ALTER TABLE public.website_intake 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending';

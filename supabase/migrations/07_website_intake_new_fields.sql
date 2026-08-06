-- Add new fields to website_intake table
ALTER TABLE public.website_intake 
ADD COLUMN IF NOT EXISTS existing_website_url TEXT,
ADD COLUMN IF NOT EXISTS design_inspiration_url TEXT;

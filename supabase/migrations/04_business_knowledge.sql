-- Create a table for storing business knowledge per location
CREATE TABLE IF NOT EXISTS public.business_knowledge (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id TEXT NOT NULL UNIQUE,
    knowledge_text TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.business_knowledge ENABLE ROW LEVEL SECURITY;

-- Allow read access to anyone (since the API will handle auth logic based on locationId)
CREATE POLICY "Enable read access for all users" ON public.business_knowledge
    FOR SELECT
    USING (true);

-- Allow insert/update access to authenticated service role or via API
CREATE POLICY "Enable insert/update for all users" ON public.business_knowledge
    FOR ALL
    USING (true);
    
-- Add trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_business_knowledge_modtime
    BEFORE UPDATE ON public.business_knowledge
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

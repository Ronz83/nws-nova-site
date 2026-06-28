-- Create the ai_routing_rules table to map AI events to GHL users
CREATE TABLE IF NOT EXISTS public.ai_routing_rules (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type text NOT NULL UNIQUE,
    ghl_user_id text NOT NULL,
    ghl_user_name text,
    ghl_user_email text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.ai_routing_rules ENABLE ROW LEVEL SECURITY;

-- Create policies (assuming service role bypasses RLS for now, but good practice to have them)
CREATE POLICY "Allow service role full access" ON public.ai_routing_rules
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_routing_rules_modtime
    BEFORE UPDATE ON public.ai_routing_rules
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

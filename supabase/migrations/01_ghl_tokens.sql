-- Create the ghl_tokens table to securely store OAuth credentials
CREATE TABLE IF NOT EXISTS public.ghl_tokens (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id text NOT NULL UNIQUE,
    location_id text,
    access_token text NOT NULL,
    refresh_token text NOT NULL,
    expires_in integer NOT NULL,
    scope text,
    user_type text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.ghl_tokens ENABLE ROW LEVEL SECURITY;

-- Allow service role to do everything
CREATE POLICY "Service Role Full Access" ON public.ghl_tokens
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');

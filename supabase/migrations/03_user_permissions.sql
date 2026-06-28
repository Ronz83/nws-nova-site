-- Create the user_permissions table to map GHL users to NWS Hub access
CREATE TABLE IF NOT EXISTS public.user_permissions (
    ghl_user_id text PRIMARY KEY,
    name text,
    email text,
    role text,
    location_id text,
    operations boolean DEFAULT false,
    growth boolean DEFAULT false,
    automations boolean DEFAULT false,
    ai_studio boolean DEFAULT false,
    settings boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;

-- Allow anon full access since NWS Dashboard uses GHL SSO (not Supabase Auth)
CREATE POLICY "Allow anon full access" ON public.user_permissions
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Ensure update_modified_column function exists (created in 02_ai_routing_rules)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_permissions_modtime') THEN
        CREATE TRIGGER update_user_permissions_modtime
            BEFORE UPDATE ON public.user_permissions
            FOR EACH ROW
            EXECUTE FUNCTION update_modified_column();
    END IF;
END
$$;

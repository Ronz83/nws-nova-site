-- Snapshot configuration storage for the Snapshot Manager
-- Stores the feature-to-plan mapping metadata for fast dashboard loading.
-- The actual GHL deployment uses the GHL Snapshot API.

CREATE TABLE IF NOT EXISTS public.snapshot_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    plan_tier TEXT NOT NULL DEFAULT 'custom',
    industry TEXT,
    ghl_snapshot_id TEXT,
    features JSONB NOT NULL DEFAULT '{}'::jsonb,
    integrations JSONB NOT NULL DEFAULT '{}'::jsonb,
    template_id TEXT,
    promotions JSONB DEFAULT '{}'::jsonb,
    custom_values JSONB DEFAULT '{}'::jsonb,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.snapshot_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for snapshot_configs" ON public.snapshot_configs
    FOR ALL USING (true);

-- Auto-update timestamp
CREATE TRIGGER update_snapshot_configs_modtime
    BEFORE UPDATE ON public.snapshot_configs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Website intake form submissions
CREATE TABLE IF NOT EXISTS public.website_intake (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id TEXT NOT NULL UNIQUE,
    business_name TEXT,
    tagline TEXT,
    primary_color TEXT,
    secondary_color TEXT,
    services_list TEXT,
    operating_hours TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    social_links TEXT,
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.website_intake ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for website_intake" ON public.website_intake
    FOR ALL USING (true);

CREATE TRIGGER update_website_intake_modtime
    BEFORE UPDATE ON public.website_intake
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

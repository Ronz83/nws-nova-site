-- Run this in NWS App Connect Supabase (hyhyhrplhmbmutewzrfg) SQL Editor
-- Creates the token storage table for the NWS CRM OAuth connection

create table if not exists nws_crm_tokens (
  id            uuid primary key default gen_random_uuid(),
  company_id    text unique not null,
  location_id   text,
  access_token  text not null,
  refresh_token text not null,
  expires_at    timestamptz,
  updated_at    timestamptz default now()
);

-- Only the service role can read/write tokens
alter table nws_crm_tokens enable row level security;

create policy "service_role_only" on nws_crm_tokens
  using (auth.role() = 'service_role');

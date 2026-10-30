-- Cloudflare D1 (businesses-os-db) schema for nws-nova-site. Replaces supabase/migrations/*.
-- NOT applied. Review, then: npx wrangler d1 execute businesses-os-db --remote --file=migrations/d1/0001_nws_nova_site.sql
-- Statements are idempotent (IF NOT EXISTS). Where a table already exists in D1 with a different shape,
-- the ALTERs at the bottom may fail with "duplicate column"; skip those individually.
-- Timestamps are ISO-8601 TEXT; booleans are INTEGER 0/1; JSON columns are TEXT.

CREATE TABLE IF NOT EXISTS ghl_tokens (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  company_id TEXT NOT NULL UNIQUE,
  location_id TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_in INTEGER NOT NULL,
  scope TEXT,
  user_type TEXT,
  token_type TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS ai_routing_rules (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  event_type TEXT NOT NULL UNIQUE,
  ghl_user_id TEXT NOT NULL,
  ghl_user_name TEXT,
  ghl_user_email TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS user_permissions (
  ghl_user_id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  role TEXT,
  location_id TEXT,
  operations INTEGER NOT NULL DEFAULT 0,
  growth INTEGER NOT NULL DEFAULT 0,
  automations INTEGER NOT NULL DEFAULT 0,
  ai_studio INTEGER NOT NULL DEFAULT 0,
  settings INTEGER NOT NULL DEFAULT 0,
  require_upgrade INTEGER NOT NULL DEFAULT 1,
  onboarded INTEGER NOT NULL DEFAULT 0,
  business_name TEXT,
  business_logo TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

-- Staff portal logins (portal.noveltywebsolutions.com). password_hash format: scrypt$<saltHex>$<hashHex>
-- Seed staff out-of-band; never commit hashes or passwords.
CREATE TABLE IF NOT EXISTS portal_staff (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'portal_user',   -- super_admin | portal_admin | portal_user
  password_hash TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS business_knowledge (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  location_id TEXT NOT NULL UNIQUE,
  knowledge_text TEXT NOT NULL,
  updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS snapshot_configs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  plan_tier TEXT NOT NULL DEFAULT 'custom',
  industry TEXT,
  ghl_snapshot_id TEXT,
  features TEXT NOT NULL DEFAULT '{}',
  integrations TEXT NOT NULL DEFAULT '{}',
  template_id TEXT,
  promotions TEXT DEFAULT '{}',
  custom_values TEXT DEFAULT '{}',
  notes TEXT,
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS website_intake (
  id TEXT PRIMARY KEY,
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
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
-- NOTE: supabase migrations 06/07 (status + new intake fields) were not re-derived here; add columns
-- from those files (e.g. status) with ALTER TABLE website_intake ADD COLUMN ... before relying on them.

CREATE TABLE IF NOT EXISTS workbench_results (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  expires_at TEXT NOT NULL,
  first_name TEXT, last_name TEXT, email TEXT, phone TEXT,
  domain TEXT, business_name TEXT, title TEXT, industry TEXT, challenge TEXT, team_size TEXT,
  assessment TEXT,
  agent_id TEXT, agent_public_key TEXT
);

CREATE TABLE IF NOT EXISTS fulfillment_tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  client_name TEXT,
  priority TEXT,
  "column" TEXT NOT NULL DEFAULT 'Backlog',
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS projects (
  project_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE INDEX IF NOT EXISTS idx_user_permissions_location ON user_permissions(location_id);
CREATE INDEX IF NOT EXISTS idx_projects_email ON projects(email);

-- If user_permissions already exists in D1 from an earlier schema, add any missing columns (ignore duplicate-column errors):
-- ALTER TABLE user_permissions ADD COLUMN onboarded INTEGER NOT NULL DEFAULT 0;
-- ALTER TABLE user_permissions ADD COLUMN business_name TEXT;
-- ALTER TABLE user_permissions ADD COLUMN business_logo TEXT;
-- ALTER TABLE user_permissions ADD COLUMN primary_color TEXT;
-- ALTER TABLE user_permissions ADD COLUMN secondary_color TEXT;

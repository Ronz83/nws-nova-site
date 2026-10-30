# Novelty → Business OS API contract

Novelty (`nws-nova-site`) owns no database and no passwords. Business OS (`BUSINESS_OS_URL`) is the identity,
permissions and data hub; Novelty is a client of it. Client code: `api/lib/bos.ts`. Every call throws `BosError`
on failure (unconfigured, unreachable, non-2xx). No mock data, no fallbacks.

## Environment (Novelty)

| Var | Purpose |
|---|---|
| `BUSINESS_OS_URL` | Base URL of Business OS |
| `BUSINESS_OS_SERVICE_TOKEN` | Bearer token for server-to-server calls (Business OS must issue and scope it to Novelty) |
| `SESSION_SECRET` | Signs the Novelty cookie (`uid`/`exp` only). Not shared |
| `SSO_REDIRECT_BASE` | Public Novelty origin used for redirects |

Server-to-server requests send `Authorization: Bearer <service token>` and, when acting for a user, `X-Acting-User: <uid>`.
Business OS must enforce authorization itself (do not trust `X-Acting-User` without the service token).

## SSO flow

1. Browser → Novelty `GET /api/auth/start` → 302 to `GET {BOS}/api/v1/sso/novelty?redirect_uri=<novelty>/api/auth/sso`.
2. Business OS (user signed in there) issues a 5-min HS256 JWT, `aud: "nws-nova"`, and 302s to `redirect_uri?code=<jwt>`.
3. Novelty `GET /api/auth/sso?code=` calls `POST {BOS}/api/v1/sso/verify` (no auth header) and sets a 1h HttpOnly cookie with only `uid`/`exp`.
4. Each request re-validates identity via `POST /api/v1/sso/introspect` (cached max 60s). 401/403/404 from it means signed out.

## Endpoints Business OS must expose

Auth shape `AuthResult` = `{ tenant, user: { id, email, name, role, permissions, locationIds, businessName?, businessLogo?, onboarded?, primaryColor?, secondaryColor? } }`.
`permissions` is either an object of flags (`operations, growth, automations, aiStudio, settings, requireUpgrade`) or an array of those keys. Admin roles Novelty recognises: `super_admin`, `portal_admin`, `agency_admin`.

| # | Method + path | Auth | Body / query | Returns |
|---|---|---|---|---|
| 1 | `GET /api/v1/sso/novelty` | BOS user session | `redirect_uri` (allow-list Novelty origins) | 302 with `?code=<JWT>` |
| 2 | `POST /api/v1/sso/verify` | none (code is the credential; single use) | `{ code, aud }` | `AuthResult`; 401 if bad/expired/wrong aud |
| 3 | `POST /api/v1/sso/introspect` | service token | `{ uid, aud }` | `AuthResult`; 401/403/404 if disabled or unknown |
| 4 | `GET /api/v1/novelty/permissions` | service | `?ids=a,b` | `{ permissions: [...] }` |
| 5 | `PUT /api/v1/novelty/permissions` | service + acting admin | `{ userId, name?, email?, role?, permissions }` | 200 |
| 6 | `POST /api/v1/novelty/provision` | service | `{ userId, role, locationId, planTier, permissions }` (Stripe-triggered; idempotent upsert) | 200 |
| 7 | `GET` / `PATCH /api/v1/novelty/users/:id/profile` | service + acting user | `{ businessLogo, primaryColor, secondaryColor }` | `{ businessLogo, primaryColor, secondaryColor }`, 404 if none |
| 8 | `POST /api/v1/novelty/users/:id/onboarding` | service + acting user | `{ name, businessName, businessLogo, primaryColor, secondaryColor }` | 200 (sets `onboarded`) |
| 9 | `GET` / `PUT /api/v1/novelty/projects/:projectId/state` | service | PUT `{ email, state }` | GET `{ email, state }`, 404 if none |
| 10 | `GET` / `PUT /api/v1/novelty/website-intake/:locationId` | service | PUT: intake columns (`business_name, tagline, primary_color, secondary_color, services_list, operating_hours, phone, email, address, social_links, special_instructions, updated_at`) | row / 404 |
| 11 | `GET /api/v1/novelty/website-intake` | service | none | `{ data: [rows, newest first] }` |
| 12 | `POST /api/v1/novelty/workbench-results` | service | `{ first_name, last_name, email, phone, domain, business_name, title, industry, challenge, team_size, assessment, agent_id, agent_public_key, expires_at }` | `{ id }` |
| 13 | `GET /api/v1/novelty/workbench-results/:id` | service | none | row incl. `created_at, expires_at`; 404 if none |
| 14 | `GET/POST /api/v1/novelty/snapshot-configs`, `GET/PATCH/DELETE .../:id` | service (admin acting) | `name, plan_tier, industry, ghl_snapshot_id, features, integrations, template_id, promotions, custom_values, notes` (JSON fields as objects) | `{ snapshots }` / row |
| 15 | `POST /api/v1/novelty/fulfillment-tasks`, `PATCH .../:id` | service | `{ title, client_name, priority, column }` / `{ column }` | task row; 404 on PATCH if none |
| 16 | `GET /api/v1/novelty/clients` | service | `?limit=` | `{ clients: [{ location_id, role }] }` |
| 17 | `GET` / `PATCH /api/v1/novelty/ghl-token` | service | PATCH `{ companyId, access_token?, refresh_token?, expires_in?, location_id? }` | token row (`access_token, token_type, expires_in, refresh_token, scope, user_type, company_id, location_id`), 404 if none |

Notes:
- `workbench-results/:id` backs the public share page `/results/:id`; Novelty serves it without a session, so the id must be an unguessable UUID.
- Business knowledge: Novelty's `/api/knowledge` still reads and writes the GHL custom value `CB AI Knowledge` using the token from #17. No Business OS endpoint is required unless knowledge is moved into Business OS.
- Dropped tables with no code path (`ai_routing_rules`, `business_knowledge`) need no endpoint.

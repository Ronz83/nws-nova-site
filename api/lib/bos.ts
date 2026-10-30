/**
 * Business OS client. Business OS (BUSINESS_OS_URL) is the identity, permissions and data hub;
 * Novelty is a client of it and owns no database. Every method makes a real HTTP call and
 * throws BosError on any failure (not configured, network, non-2xx). There is no mock data
 * and no silent fallback. Required endpoints are specified in docs/NOVELTY_BOS_API.md.
 *
 * Server-to-server auth: `Authorization: Bearer BUSINESS_OS_SERVICE_TOKEN`, plus
 * `X-Acting-User: <uid>` when acting for a signed-in user.
 */
export class BosError extends Error {
  constructor(message: string, public status: number = 502, public body?: unknown) {
    super(message);
    this.name = 'BosError';
  }
}

export interface BosUser {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: Record<string, unknown> | string[];
  locationIds: string[];
  /** Optional profile fields; if Business OS omits them the UI uses neutral defaults. */
  businessName?: string;
  businessLogo?: string;
  onboarded?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
}
export interface BosAuth {
  tenant: unknown;
  user: BosUser;
}

function baseUrl(): string {
  const u = process.env.BUSINESS_OS_URL;
  if (!u) throw new BosError('BUSINESS_OS_URL is not configured', 500);
  return u.replace(/\/$/, '');
}

interface Opts {
  body?: unknown;
  query?: Record<string, string | number | undefined>;
  actingUser?: string;
  /** Resolve 404 to null instead of throwing (for "not found" reads). */
  nullOn404?: boolean;
  noAuth?: boolean;
}

export async function bosRequest<T = any>(method: string, path: string, opts: Opts = {}): Promise<T> {
  const url = new URL(`${baseUrl()}${path}`);
  for (const [k, v] of Object.entries(opts.query || {})) if (v !== undefined) url.searchParams.set(k, String(v));
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  if (!opts.noAuth) {
    const token = process.env.BUSINESS_OS_SERVICE_TOKEN;
    if (!token) throw new BosError('BUSINESS_OS_SERVICE_TOKEN is not configured', 500);
    headers.Authorization = `Bearer ${token}`;
  }
  if (opts.actingUser) headers['X-Acting-User'] = opts.actingUser;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: AbortSignal.timeout(10_000),
    });
  } catch (e: any) {
    throw new BosError(`Business OS unreachable: ${e.message}`, 502);
  }
  if (res.status === 404 && opts.nullOn404) return null as T;
  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* non-JSON body */ }
  if (!res.ok) {
    throw new BosError(`Business OS ${method} ${path} -> ${res.status}`, res.status === 401 || res.status === 403 ? res.status : 502, json ?? text);
  }
  return json as T;
}

const enc = encodeURIComponent;

export const bos = {
  sso: {
    /** Exchange the 5-min JWT code for the user. The signing secret is never shared with Novelty. */
    verify: (code: string) =>
      bosRequest<BosAuth>('POST', '/api/v1/sso/verify', { body: { code, aud: 'nws-nova' }, noAuth: true }),
    /** Re-read current role/permissions for a signed-in uid. */
    introspect: (uid: string) => bosRequest<BosAuth>('POST', '/api/v1/sso/introspect', { body: { uid, aud: 'nws-nova' } }),
    loginUrl: (redirectUri: string) =>
      `${baseUrl()}/api/v1/sso/novelty?redirect_uri=${enc(redirectUri)}`,
  },
  permissions: {
    list: (ids: string[]) => bosRequest<{ permissions: any[] }>('GET', '/api/v1/novelty/permissions', { query: { ids: ids.join(',') } }),
    update: (actingUser: string, body: unknown) => bosRequest('PUT', '/api/v1/novelty/permissions', { body, actingUser }),
    provision: (body: unknown) => bosRequest('POST', '/api/v1/novelty/provision', { body }),
  },
  profile: {
    get: (userId: string) => bosRequest<any>('GET', `/api/v1/novelty/users/${enc(userId)}/profile`, { nullOn404: true }),
    update: (userId: string, body: unknown, actingUser: string) =>
      bosRequest<any>('PATCH', `/api/v1/novelty/users/${enc(userId)}/profile`, { body, actingUser, nullOn404: true }),
    completeOnboarding: (userId: string, body: unknown) =>
      bosRequest('POST', `/api/v1/novelty/users/${enc(userId)}/onboarding`, { body, actingUser: userId }),
  },
  projects: {
    get: (projectId: string) =>
      bosRequest<{ email: string; state: unknown } | null>('GET', `/api/v1/novelty/projects/${enc(projectId)}/state`, { nullOn404: true }),
    put: (projectId: string, email: string, state: unknown) =>
      bosRequest('PUT', `/api/v1/novelty/projects/${enc(projectId)}/state`, { body: { email, state } }),
  },
  websiteIntake: {
    get: (locationId: string) => bosRequest<any>('GET', `/api/v1/novelty/website-intake/${enc(locationId)}`, { nullOn404: true }),
    upsert: (locationId: string, fields: Record<string, unknown>) =>
      bosRequest('PUT', `/api/v1/novelty/website-intake/${enc(locationId)}`, { body: fields }),
    list: () => bosRequest<{ data: any[] }>('GET', '/api/v1/novelty/website-intake'),
  },
  workbenchResults: {
    get: (id: string) => bosRequest<any>('GET', `/api/v1/novelty/workbench-results/${enc(id)}`, { nullOn404: true }),
    save: (record: Record<string, unknown>) => bosRequest<{ id: string }>('POST', '/api/v1/novelty/workbench-results', { body: record }),
  },
  snapshots: {
    list: () => bosRequest<{ snapshots: any[] }>('GET', '/api/v1/novelty/snapshot-configs'),
    get: (id: string) => bosRequest<any>('GET', `/api/v1/novelty/snapshot-configs/${enc(id)}`, { nullOn404: true }),
    create: (body: unknown) => bosRequest<any>('POST', '/api/v1/novelty/snapshot-configs', { body }),
    update: (id: string, body: unknown) => bosRequest<any>('PATCH', `/api/v1/novelty/snapshot-configs/${enc(id)}`, { body, nullOn404: true }),
    remove: (id: string) => bosRequest('DELETE', `/api/v1/novelty/snapshot-configs/${enc(id)}`),
  },
  fulfillmentTasks: {
    create: (body: unknown) => bosRequest<any>('POST', '/api/v1/novelty/fulfillment-tasks', { body }),
    update: (id: string, body: unknown) => bosRequest<any>('PATCH', `/api/v1/novelty/fulfillment-tasks/${enc(id)}`, { body, nullOn404: true }),
  },
  clients: {
    list: (limit = 20) => bosRequest<{ clients: any[] }>('GET', '/api/v1/novelty/clients', { query: { limit } }),
  },
  ghlToken: {
    get: () => bosRequest<any>('GET', '/api/v1/novelty/ghl-token', { nullOn404: true }),
    update: (companyId: string, body: unknown) => bosRequest('PATCH', '/api/v1/novelty/ghl-token', { body: { companyId, ...(body as object) } }),
  },
};

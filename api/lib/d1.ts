/**
 * Cloudflare D1 data layer (businesses-os-db) via the D1 HTTP query API.
 * Env: CLOUDFLARE_ACCOUNT_ID, D1_DATABASE_ID, CLOUDFLARE_API_TOKEN
 * Server-side only. All values are bound parameters, never string-interpolated.
 */

type Param = string | number | boolean | null;

function cfg() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.D1_DATABASE_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !databaseId || !token) {
    throw new Error('D1 not configured: set CLOUDFLARE_ACCOUNT_ID, D1_DATABASE_ID, CLOUDFLARE_API_TOKEN');
  }
  return { accountId, databaseId, token };
}

export async function d1Query<T = Record<string, any>>(sql: string, params: Param[] = []): Promise<T[]> {
  const { accountId, databaseId, token } = cfg();
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql, params }),
    }
  );
  const json: any = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(`D1 query failed: ${json?.errors?.[0]?.message || res.status}`);
  }
  return (json.result?.[0]?.results ?? []) as T[];
}

export async function d1First<T = Record<string, any>>(sql: string, params: Param[] = []): Promise<T | null> {
  const rows = await d1Query<T>(sql, params);
  return rows[0] ?? null;
}

export function newId(): string {
  return crypto.randomUUID();
}

/** Serialize JSON columns for storage. */
export const toJson = (v: unknown) => JSON.stringify(v ?? {});

/** Parse JSON columns on read; tolerant of already-parsed or empty values. */
export function fromJson<T = any>(v: unknown, fallback: T): T {
  if (v == null || v === '') return fallback;
  if (typeof v !== 'string') return v as T;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

/** Build a parameterized UPDATE for a whitelisted set of columns. Returns null if nothing to set. */
export function buildUpdate(
  table: string,
  allowed: readonly string[],
  values: Record<string, unknown>,
  whereCol: string,
  whereVal: Param
): { sql: string; params: Param[] } | null {
  const sets: string[] = [];
  const params: Param[] = [];
  for (const col of allowed) {
    if (values[col] === undefined) continue;
    const v = values[col];
    sets.push(`${col} = ?`);
    params.push(v !== null && typeof v === 'object' ? JSON.stringify(v) : (v as Param));
  }
  if (!sets.length) return null;
  sets.push(`updated_at = ?`);
  params.push(new Date().toISOString());
  params.push(whereVal);
  return { sql: `UPDATE ${table} SET ${sets.join(', ')} WHERE ${whereCol} = ?`, params };
}

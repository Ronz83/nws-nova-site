// api/crm/debug.ts  — TEMPORARY diagnostic, remove after fixing
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const url = process.env.NWS_BROKER_SUPABASE_URL;
  const key = process.env.NWS_BROKER_SUPABASE_SERVICE_KEY;

  const envCheck = {
    hasUrl:  !!url,
    urlHint: url ? url.slice(0, 40) + '…' : 'MISSING',
    hasKey:  !!key,
    keyHint: key ? key.slice(0, 20) + '…' : 'MISSING',
  };

  if (!url || !key) {
    return res.status(500).json({ envCheck, error: 'Missing env vars' });
  }

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error, count } = await supabase
      .from('nws_crm_tokens')
      .select('company_id, location_id, expires_at, updated_at', { count: 'exact' });

    return res.json({ envCheck, count, rows: data, supabaseError: error });
  } catch (err: any) {
    return res.status(500).json({ envCheck, error: err.message });
  }
}

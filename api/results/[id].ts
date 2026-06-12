// api/results/[id].ts
// Returns saved workbench results by UUID — used by the /results/:id page
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing result ID' });
  }

  const { data, error } = await supabase
    .from('workbench_results')
    .select('id, created_at, expires_at, first_name, business_name, domain, industry, challenge, team_size, assessment, agent_id, agent_public_key')
    .eq('id', id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Report not found' });
  }

  // Check expiry
  if (new Date(data.expires_at) < new Date()) {
    return res.status(410).json({ error: 'Report expired' });
  }

  return res.status(200).json({
    status: 'success',
    assessment: data.assessment,
    agent: {
      assistantId: data.agent_id,
      publicKey:   data.agent_public_key,
    },
    businessName: data.business_name || data.domain,
    firstName:    data.first_name,
    form: {
      domain:      data.domain,
      industry:    data.industry,
      teamSize:    data.team_size,
      challenges:  data.challenge ? [data.challenge] : [],
    },
    createdAt:  data.created_at,
    expiresAt:  data.expires_at,
  });
}

// api/results/[id].ts
// Returns saved workbench results by UUID — used by the /results/:id page
import type { Request, Response } from 'express';
import { d1First } from '../lib/d1.js';

function setCors(res: Response) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: Request, res: Response) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing result ID' });
  }

  let data: Record<string, any> | null = null;
  try {
    data = await d1First(
      'SELECT id, created_at, expires_at, first_name, business_name, domain, industry, challenge, team_size, assessment, agent_id, agent_public_key FROM workbench_results WHERE id = ?',
      [id]
    );
  } catch (e: any) {
    console.error('Results lookup failed:', e.message);
    return res.status(500).json({ error: 'Lookup failed' });
  }

  if (!data) {
    return res.status(404).json({ error: 'Report not found' });
  }

  // Check expiry
  if (new Date(data.expires_at) < new Date()) {
    return res.status(410).json({ error: 'Report expired' });
  }

  let assessment = data.assessment;
  if (typeof assessment === 'string') {
    try { assessment = JSON.parse(assessment); } catch { /* keep raw */ }
  }

  return res.status(200).json({
    status: 'success',
    assessment,
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

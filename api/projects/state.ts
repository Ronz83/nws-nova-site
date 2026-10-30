import { Request, Response } from 'express';
import { bos } from '../lib/bos.js';
import { getIdentity, isAdminRole } from '../lib/session.js';

/**
 * GET /api/projects/state?projectId=...   -> { state }
 * PUT /api/projects/state {projectId, state} -> upsert (stored in Business OS)
 * Requires a server session. A project is owned by the email that first saved it;
 * only the owner (matching session email) or an admin may read/write it.
 */
export default async function handler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (!id) return res.status(401).json({ error: 'Not authenticated' });

    const projectId = String((req.method === 'GET' ? req.query.projectId : req.body?.projectId) || '');
    if (!projectId) return res.status(400).json({ error: 'projectId required' });

    const row = await bos.projects.get(projectId);
    const owns = !row || isAdminRole(id.role) || (!!id.email && row.email?.toLowerCase() === id.email.toLowerCase());
    if (!owns) return res.status(403).json({ error: 'Forbidden' });

    if (req.method === 'GET') {
      return res.json({ state: row ? row.state : null });
    }
    if (req.method === 'PUT') {
      if (!id.email) return res.status(400).json({ error: 'Account has no email' });
      await bos.projects.put(projectId, row?.email || id.email, req.body?.state ?? {});
      return res.json({ success: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e: any) {
    console.error('Project state error:', e.message);
    return res.status(502).json({ error: 'Project state failed' });
  }
}

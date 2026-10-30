import { Request, Response } from 'express';
import { d1First, d1Query, fromJson } from '../lib/d1.js';
import { getIdentity, isAdminRole } from '../lib/session.js';

/**
 * GET /api/projects/state?projectId=...   -> { state }
 * PUT /api/projects/state {projectId, state} -> upsert
 * Requires a server session. A project is owned by the email that first saved it;
 * only the owner (matching session email) or an admin may read/write it.
 */
export default async function handler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (!id) return res.status(401).json({ error: 'Not authenticated' });

    const projectId = String((req.method === 'GET' ? req.query.projectId : req.body?.projectId) || '');
    if (!projectId) return res.status(400).json({ error: 'projectId required' });

    const row = await d1First('SELECT email, state FROM projects WHERE project_id = ?', [projectId]);
    const owns = !row || isAdminRole(id.role) || (!!id.email && row.email?.toLowerCase() === id.email.toLowerCase());
    if (!owns) return res.status(403).json({ error: 'Forbidden' });

    if (req.method === 'GET') {
      return res.json({ state: row ? fromJson(row.state, null) : null });
    }
    if (req.method === 'PUT') {
      if (!id.email) return res.status(400).json({ error: 'Account has no email' });
      await d1Query(
        `INSERT INTO projects (project_id, email, state, updated_at) VALUES (?,?,?,?)
         ON CONFLICT(project_id) DO UPDATE SET state = excluded.state, updated_at = excluded.updated_at`,
        [projectId, row?.email || id.email, JSON.stringify(req.body?.state ?? {}), new Date().toISOString()]
      );
      return res.json({ success: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e: any) {
    console.error('Project state error:', e.message);
    return res.status(500).json({ error: 'Project state failed' });
  }
}

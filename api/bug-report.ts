import type { Request, Response } from 'express';
import { bosRequest } from './lib/bos.js';

export default async function bugReportHandler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    appSource = 'nws-nova-site',
    pageUrl = '',
    reporterEmail = '',
    reporterName = '',
    category = 'bug',
    severity = 'medium',
    title = '',
    description = '',
    userAgent = '',
  } = req.body || {};

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const payload = {
      appSource,
      pageUrl,
      reporterEmail,
      reporterName,
      category,
      severity,
      title,
      description,
      userAgent: userAgent || req.headers['user-agent'] || '',
    };

    const result = await bosRequest('POST', '/api/bug-report', {
      body: payload,
      noAuth: true,
    });

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Bug report forward error:', err.message);
    return res.status(502).json({ error: err.message || 'Failed to submit bug report' });
  }
}

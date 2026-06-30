import { Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase.ts';

/**
 * GET /api/website/requests
 * 
 * Fetches all website intake submissions from Supabase.
 * Intended for Agency Admins.
 */
export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    // Fetch all intake requests, ordered by newest first
    const { data, error } = await supabaseAdmin
      .from('website_intake')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ success: false, message });
  }
}

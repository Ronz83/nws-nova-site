import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseAdmin
        .from('ai_routing_rules')
        .select('*');
      
      if (error) throw error;
      return res.status(200).json(data || []);
    } catch (error: any) {
      console.error('Error fetching routing rules:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const rules = req.body; // Expecting an array of rule objects
      
      if (!Array.isArray(rules)) {
        return res.status(400).json({ error: 'Body must be an array of rules' });
      }

      // Upsert rules based on event_type
      const { data, error } = await supabaseAdmin
        .from('ai_routing_rules')
        .upsert(rules, { onConflict: 'event_type' })
        .select();

      if (error) throw error;
      return res.status(200).json(data);
    } catch (error: any) {
      console.error('Error saving routing rules:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

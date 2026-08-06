import { Request, Response } from 'express';
import { supabase } from '../../src/lib/supabase.js';

/**
 * SSO Bridge for TicketFlows and other external NWS apps.
 * Expects: ?userId=user_id&token=secure_sso_token
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, token } = req.query;

  if (!userId || !token) {
    return res.status(400).json({ error: 'Missing userId or token' });
  }

  // TODO: Validate secure SSO token via shared secret
  // For now, we trust the userId parameter for the bridge prototype
  
  try {
    // 1. Fetch user permissions to get the location ID and check existence
    const { data: userRecord, error } = await supabase
      .from('user_permissions')
      .select('*')
      .eq('ghl_user_id', userId)
      .single();

    if (error || !userRecord) {
      return res.status(404).json({ error: 'User not found in Businesses OS' });
    }

    // 2. Generate a magic link or just redirect with a signed session token.
    // In a production environment, we would use Supabase Admin API to generate a session link.
    // For the bridge, we redirect them to the app with an auto-login token in the hash.
    // The frontend AuthContext would need to handle this token.
    
    // Simulating the SSO redirect
    const redirectUrl = `https://app.businessesos.com/dashboard?ssoToken=${token}&uid=${userId}`;
    
    return res.redirect(302, redirectUrl);

  } catch (error) {
    console.error('SSO Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

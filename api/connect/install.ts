import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GHL_APP_CLIENT_ID;
  if (!clientId) {
    return res.status(500).json({ error: 'Missing GHL_APP_CLIENT_ID in .env.local' });
  }
  
  // 25 OAuth scopes covering Tiers 1-3 (CRM + Voice AI + Growth + Finance)
  // See: ghl_scope_audit.md for full cross-reference
  const scopes = [
    'locations.readonly', 'locations.write', 
    'users.readonly', 'users.write',
    'contacts.readonly', 'contacts.write',
    'conversations.readonly', 'conversations.write',
    'opportunities.readonly', 'opportunities.write',
    'conversation-ai.readonly', 'conversation-ai.write',
    'voice-ai-agents.readonly', 'voice-ai-agents.write',
    'locations/customValues.readonly', 'locations/customValues.write',
    'snapshots.readonly',
    'calendars.readonly', 'calendars.write',
    'calendars/events.readonly', 'calendars/events.write',
    'workflows.readonly'
  ].join(' ');
  // Force the frontend URL (5173) since Vite's proxy rewrites the host header to 3001
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? `https://${req.headers.host}` 
    : 'http://localhost:5173';
  const redirectUri = `${baseUrl}/api/connect/callback`;
  
  const authUrl = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}`;
  
  res.redirect(authUrl);
}

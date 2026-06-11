// api/crm/install.ts
// Generates the GHL OAuth install URL and redirects the browser to it.
// Visit /api/crm/install to kick off the OAuth flow.

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId  = process.env.NWS_CRM_CLIENT_ID;
  const appId     = clientId?.split('-').slice(0, -1).join('-') ?? clientId; // version_id = everything before last dash segment
  const redirectUri = 'https://www.noveltywebsolutions.com/api/crm/callback';

  if (!clientId) {
    return res.status(500).json({ error: 'NWS_CRM_CLIENT_ID not configured' });
  }

  const params = new URLSearchParams({
    response_type: 'code',
    redirect_uri:  redirectUri,
    client_id:     clientId,
    scope:         'contacts.write contacts.readonly locations.readonly',
    version_id:    appId ?? clientId,
  });

  const installUrl = `https://marketplace.leadconnectorhq.com/v2/oauth/chooselocation?${params.toString()}`;
  return res.redirect(302, installUrl);
}

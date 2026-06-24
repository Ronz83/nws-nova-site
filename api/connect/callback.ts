import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  const clientId = process.env.GHL_APP_CLIENT_ID;
  const clientSecret = process.env.GHL_APP_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Missing GHL_APP_CLIENT_ID or GHL_APP_CLIENT_SECRET' });
  }

  // Force the frontend URL (5173) since Vite's proxy rewrites the host header to 3001
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? `https://${req.headers.host}` 
    : 'http://localhost:5173';
  const redirectUri = `${baseUrl}/api/connect/callback`;

  try {
    const data = new URLSearchParams();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    data.append('grant_type', 'authorization_code');
    data.append('code', code as string);
    data.append('redirect_uri', redirectUri);

    const tokenRes = await fetch('https://services.leadconnectorhq.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: data.toString()
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error('Failed to exchange code:', tokenRes.status, errorText);
      return res.status(502).json({ error: 'Failed to exchange token', details: errorText });
    }

    const tokenData = await tokenRes.json();
    
    // Save to local file for development / proof-of-concept
    const tokenPath = path.resolve(process.cwd(), 'ghl_token.json');
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2), 'utf-8');

    res.status(200).send(`
      <html>
        <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #f0f9ff; color: #0369a1;">
          <h2>✅ Connection Successful</h2>
          <p>NWS Connect is now authenticated. Tokens saved successfully.</p>
          <a href="/" style="padding: 10px 20px; background: #0ea5e9; color: white; text-decoration: none; border-radius: 8px; margin-top: 20px;">Return to Site</a>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error('OAuth Callback Error:', err);
    res.status(500).json({ error: err.message });
  }
}

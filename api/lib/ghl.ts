import fs from 'fs';
import path from 'path';

const TOKEN_FILE_PATH = path.resolve(process.cwd(), 'ghl_token.json');

export interface GHLTokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  userType: string;
  companyId: string;
  locationId?: string; // Standardize for our use
}

export async function getValidGHLToken(): Promise<GHLTokenData> {
  if (!fs.existsSync(TOKEN_FILE_PATH)) {
    throw new Error('ghl_token.json not found. Please re-authenticate.');
  }

  const tokenData: GHLTokenData = JSON.parse(fs.readFileSync(TOKEN_FILE_PATH, 'utf8'));
  
  // Try to use the token to fetch something lightweight to check validity
  // Or we can assume it's expired for the sake of robust refreshing if we get a 401.
  // We'll aggressively refresh if it fails.
  try {
    const res = await fetch(`https://services.leadconnectorhq.com/locations/search?companyId=${tokenData.companyId}`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });

    if (res.status === 401) {
      console.log('GHL Token expired, refreshing...');
      return await refreshGHLToken(tokenData.refresh_token);
    }
    
    // If it worked, we might want to attach a locationId to our token data for convenience
    if (res.ok && !tokenData.locationId) {
       const json = await res.json();
       if (json.locations && json.locations.length > 0) {
         tokenData.locationId = json.locations[0].id;
         fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokenData, null, 2));
       }
    }
    return tokenData;
  } catch (error) {
    console.error('Error validating GHL token:', error);
    throw error;
  }
}

export async function refreshGHLToken(refreshToken: string): Promise<GHLTokenData> {
  const clientId = process.env.GHL_APP_CLIENT_ID;
  const clientSecret = process.env.GHL_APP_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('GHL_APP_CLIENT_ID or GHL_APP_CLIENT_SECRET not configured in environment.');
  }

  const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const response = await fetch('https://services.leadconnectorhq.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('Failed to refresh GHL token:', text);
    throw new Error('Failed to refresh GHL token');
  }

  const newTokenData = await response.json();
  
  // Merge companyId back in as the refresh payload doesn't always return it
  const existingData = JSON.parse(fs.readFileSync(TOKEN_FILE_PATH, 'utf8'));
  const mergedData = { ...existingData, ...newTokenData };
  
  fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(mergedData, null, 2));
  console.log('GHL Token successfully refreshed and saved.');
  
  return mergedData;
}

import { d1First, d1Query } from './d1';

export interface GHLTokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  userType: string;
  companyId: string;
  locationId?: string;
}

export async function getValidGHLToken(): Promise<GHLTokenData> {
  // We assume a single master company ID for the agency for now. 
  // If multi-tenant, you'd pass companyId into this function.
  const data = await d1First('SELECT * FROM ghl_tokens LIMIT 1');

  if (!data) {
    throw new Error('GHL Token not found in database. Please re-authenticate.');
  }

  const tokenData: GHLTokenData = {
    access_token: data.access_token,
    token_type: data.token_type || 'Bearer',
    expires_in: data.expires_in,
    refresh_token: data.refresh_token,
    scope: data.scope,
    userType: data.user_type,
    companyId: data.company_id,
    locationId: data.location_id
  };
  
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
      return await refreshGHLToken(tokenData.refresh_token, tokenData.companyId);
    }
    
    if (res.ok && !tokenData.locationId) {
       const json = await res.json();
       if (json.locations && json.locations.length > 0) {
         tokenData.locationId = json.locations[0].id;
         await d1Query('UPDATE ghl_tokens SET location_id = ?, updated_at = ? WHERE company_id = ?', [tokenData.locationId, new Date().toISOString(), tokenData.companyId]);
       }
    }
    return tokenData;
  } catch (error) {
    console.error('Error validating GHL token:', error);
    throw error;
  }
}

export async function refreshGHLToken(refreshToken: string, companyId: string): Promise<GHLTokenData> {
  const clientId = process.env.GHL_APP_CLIENT_ID;
  const clientSecret = process.env.GHL_APP_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('GHL_APP_CLIENT_ID or GHL_APP_CLIENT_SECRET not configured in environment.');
  }
  
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
  
  await d1Query(
    'UPDATE ghl_tokens SET access_token = ?, refresh_token = ?, expires_in = ?, updated_at = ? WHERE company_id = ?',
    [newTokenData.access_token, newTokenData.refresh_token, newTokenData.expires_in, new Date().toISOString(), companyId]
  );
    
  console.log('GHL Token successfully refreshed and saved to D1.');
  
  return {
    ...newTokenData,
    companyId
  };
}

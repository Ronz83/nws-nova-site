import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { getValidGHLToken } from '../lib/ghl.js';

async function resolveAgencyToken(): Promise<{ access_token: string; companyId: string }> {
  try {
    const token = await getValidGHLToken();
    if (token?.access_token && token?.companyId) {
      return { access_token: token.access_token, companyId: token.companyId };
    }
  } catch {
    // Fallback to local file if BOS token not yet seeded in dev
  }

  const tokenPath = path.resolve(process.cwd(), 'ghl_token.json');
  if (!fs.existsSync(tokenPath)) {
    throw new Error('OAuth token not found. Please authorize the app first.');
  }

  const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
  const { access_token, companyId } = tokenData;

  if (!access_token || !companyId) {
    throw new Error('Invalid token structure. Missing access_token or companyId.');
  }

  return { access_token, companyId };
}

export async function provisionWorkspace(params: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName: string;
  planTier?: string;
}) {
  const { firstName, lastName, email, phone, businessName, planTier } = params;

  // 1. Load the OAuth token
  const { access_token, companyId } = await resolveAgencyToken();

  // 2. Create the Location (Sub-account)
  const locationPayload = {
    name: businessName,
    firstName,
    lastName,
    email,
    phone: phone || '',
    companyId: companyId,
    address: '123 Main St',
    city: 'Default City',
    state: 'FL',
    country: 'US',
    postalCode: '00000',
    ...(planTier === 'corporate' && process.env.VITE_GHL_CORPORATE_SNAPSHOT_ID
      ? { snapshotId: process.env.VITE_GHL_CORPORATE_SNAPSHOT_ID }
      : process.env.VITE_GHL_STARTER_SNAPSHOT_ID
        ? { snapshotId: process.env.VITE_GHL_STARTER_SNAPSHOT_ID }
        : {}),
  };

  console.log('Provisioning new workspace:', businessName);

  const locationRes = await fetch('https://services.leadconnectorhq.com/locations/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(locationPayload),
  });

  if (!locationRes.ok) {
    const errorText = await locationRes.text();
    console.error('Location creation failed:', errorText);
    throw new Error(`Failed to provision workspace: ${errorText}`);
  }

  const locationData: any = await locationRes.json();
  const locationId = locationData.location?.id || locationData.id;
  console.log('Workspace created successfully. ID:', locationId);

  // 3. Create the User & Assign to the Location
  const generatedPassword = crypto.randomBytes(16).toString('base64url') + '!A1a';
  const userPayload = {
    companyId: companyId,
    firstName,
    lastName,
    email,
    password: generatedPassword,
    type: 'account',
    role: 'admin',
    locationIds: [locationId],
  };

  console.log('Creating admin user:', email);

  const userRes = await fetch('https://services.leadconnectorhq.com/users/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userPayload),
  });

  if (!userRes.ok) {
    const userErrorText = await userRes.text();
    console.error('User creation failed:', userErrorText);
    return { success: true, locationId, userError: userErrorText };
  }

  const userData: any = await userRes.json();
  const userId = userData.user?.id || userData.id;

  console.log('User created and assigned successfully.');
  return { success: true, locationId, userId };
}

export async function provisionAIAgent(locationId: string, agentConfig: any) {
  const { access_token } = await resolveAgencyToken();

  const payload = {
    locationId,
    ...agentConfig,
  };

  console.log('Provisioning AI Agent for location:', locationId);

  const res = await fetch('https://services.leadconnectorhq.com/voice-ai/agents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('AI Agent creation failed:', errorText);
    throw new Error(`Failed to provision AI Agent: ${errorText}`);
  }

  const data = await res.json();
  console.log('AI Agent created successfully.');
  return { success: true, agent: data };
}

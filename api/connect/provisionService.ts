import fs from 'fs';
import path from 'path';

export async function provisionWorkspace(params: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName: string;
}) {
  const { firstName, lastName, email, phone, businessName } = params;

  // 1. Load the OAuth token
  const tokenPath = path.resolve(process.cwd(), 'ghl_token.json');
  if (!fs.existsSync(tokenPath)) {
    throw new Error('OAuth token not found. Please authorize the app first.');
  }

  const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
  const { access_token, companyId } = tokenData;

  if (!access_token || !companyId) {
    throw new Error('Invalid token structure. Missing access_token or companyId.');
  }

  // 2. Create the Location (Sub-account)
  const locationPayload = {
    name: businessName,
    firstName,
    lastName,
    email,
    phone: phone || '',
    companyId: companyId,
    // Minimal address data
    address: "123 Main St",
    city: "Default City",
    state: "FL",
    country: "US",
    postalCode: "00000",
    ...(process.env.VITE_GHL_STARTER_SNAPSHOT_ID ? { snapshotId: process.env.VITE_GHL_STARTER_SNAPSHOT_ID } : {})
  };

  console.log('Provisioning new workspace:', businessName);

  const locationRes = await fetch('https://services.leadconnectorhq.com/locations/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Version': '2021-07-28',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(locationPayload)
  });

  if (!locationRes.ok) {
    const errorText = await locationRes.text();
    console.error('Location creation failed:', errorText);
    throw new Error(`Failed to provision workspace: ${errorText}`);
  }

  const locationData = await locationRes.json();
  const locationId = locationData.location?.id || locationData.id;
  console.log('Workspace created successfully. ID:', locationId);

  // 3. Create the User & Assign to the Location
  const userPayload = {
    companyId: companyId,
    firstName,
    lastName,
    email,
    password: "TempPassword123!", // In production, send a reset link
    type: "account",
    role: "admin",
    locationIds: [locationId]
  };

  console.log('Creating admin user:', email);

  const userRes = await fetch('https://services.leadconnectorhq.com/users/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Version': '2021-07-28',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(userPayload)
  });

  if (!userRes.ok) {
    const userErrorText = await userRes.text();
    console.error('User creation failed:', userErrorText);
    return { success: true, locationId, userError: userErrorText };
  }

  console.log('User created and assigned successfully.');
  return { success: true, locationId };
}

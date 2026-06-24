import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, phone, businessName } = req.body;

  if (!firstName || !lastName || !email || !businessName) {
    return res.status(400).json({ error: 'Missing required fields (firstName, lastName, email, businessName)' });
  }

  try {
    // 1. Load the OAuth token
    const tokenPath = path.resolve(process.cwd(), 'ghl_token.json');
    if (!fs.existsSync(tokenPath)) {
      return res.status(500).json({ error: 'OAuth token not found. Please authorize the app first.' });
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
    const { access_token, companyId } = tokenData;

    if (!access_token || !companyId) {
      return res.status(500).json({ error: 'Invalid token structure. Missing access_token or companyId.' });
    }

    // 2. Create the Location (Sub-account)
    const locationPayload = {
      name: businessName,
      firstName,
      lastName,
      email,
      phone: phone || '',
      companyId: companyId,
      // Minimal address data (often required by GHL)
      address: "123 Main St",
      city: "Default City",
      state: "FL",
      country: "US",
      postalCode: "00000",
      // Optional: If we have a snapshot ID in env, apply it immediately
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
      return res.status(502).json({ error: 'Failed to provision workspace', details: errorText });
    }

    const locationData = await locationRes.json();
    console.log('Raw location data:', JSON.stringify(locationData));
    const locationId = locationData.location?.id || locationData.id;
    console.log('Workspace created successfully. ID:', locationId);

    // 3. Create the User & Assign to the Location
    const userPayload = {
      companyId: companyId,
      firstName,
      lastName,
      email,
      password: "TempPassword123!", // In production, we'd send a reset link
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
      // We don't fail the whole request because the location WAS created.
      return res.status(200).json({
        success: true,
        message: 'Workspace created, but user creation failed (check scopes).',
        locationId: locationId,
        userError: userErrorText
      });
    }

    console.log('User created and assigned successfully.');

    return res.status(200).json({
      success: true,
      message: 'Workspace provisioned and user assigned successfully.',
      locationId: locationId
    });

  } catch (err: any) {
    console.error('Provisioning error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}

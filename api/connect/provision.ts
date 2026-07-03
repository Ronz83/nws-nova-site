import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';
import { provisionWorkspace } from './provisionService.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, phone, businessName } = req.body;

  if (!firstName || !lastName || !email || !businessName) {
    return res.status(400).json({ error: 'Missing required fields (firstName, lastName, email, businessName)' });
  }

  try {
    const result = await provisionWorkspace({
      firstName,
      lastName,
      email,
      phone,
      businessName
    });

    if (result.userError) {
      return res.status(200).json({
        success: true,
        message: 'Workspace created, but user creation failed (check scopes).',
        locationId: result.locationId,
        userError: result.userError
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Workspace provisioned and user assigned successfully.',
      locationId: result.locationId
    });

  } catch (err: any) {
    console.error('Provisioning error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}

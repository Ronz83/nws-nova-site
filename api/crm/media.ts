import { Request, Response } from 'express';
import multer from 'multer';
import { getValidGHLToken } from '../lib/ghl.js';
import FormData from 'form-data';
import fetch from 'node-fetch';

// Configure multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Middleware wrapper for Vercel-like handler
const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the multipart form data using multer
    await runMiddleware(req, res, upload.single('file'));
    
    // @ts-ignore - Multer adds file to req
    const file = req.file;
    // @ts-ignore
    const body = req.body;
    
    const locationId = body.locationId || req.query.locationId;

    if (!locationId) {
      return res.status(400).json({ error: 'locationId is required' });
    }

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Get the valid OAuth token for this location
    const token = await getValidGHLToken(locationId as string);
    if (!token) {
      return res.status(401).json({ error: 'No valid token found for location' });
    }

    // Prepare FormData for GoHighLevel
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    
    // Send to GoHighLevel Media API (v2)
    // POST https://services.leadconnectorhq.com/medias/files
    const ghlRes = await fetch('https://services.leadconnectorhq.com/medias/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.access_token}`,
        'Version': '2021-07-28',
      },
      body: formData,
    });

    if (!ghlRes.ok) {
      const errorText = await ghlRes.text();
      console.error('GHL Media Upload Error:', errorText);
      return res.status(ghlRes.status).json({ error: 'Failed to upload to GHL', details: errorText });
    }

    const data = await ghlRes.json();
    return res.status(200).json({ success: true, url: data.url || data.fileUrl || data.file?.url });
  } catch (error) {
    console.error('Error in media proxy:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { forwardingNumber, calendarLink, personaName } = req.body || {};

  // Simulate pushing Custom Values to GoHighLevel since API keys aren't live yet
  await new Promise((resolve) => setTimeout(resolve, 800));

  return res.status(200).json({
    success: true,
    message: 'Custom Values updated successfully',
    data: {
      forwardingNumber,
      calendarLink,
      personaName,
    }
  });
}

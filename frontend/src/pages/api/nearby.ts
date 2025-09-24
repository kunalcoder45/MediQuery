import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng' });
  }

  try {
    const apiRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=pharmacy|hospital&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    const data = await apiRes.json();

    if (data.status !== "OK") {
      return res.status(500).json({ error: data.error_message || data.status });
    }

    res.status(200).json(data.results);
  } catch (err) {
    console.error('Google API error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

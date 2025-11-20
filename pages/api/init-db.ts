import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase } from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await initializeDatabase();
    return res.status(200).json({ 
      success: true, 
      message: 'Database tables initialized successfully' 
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return res.status(500).json({ 
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}


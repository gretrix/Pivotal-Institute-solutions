import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { sendContactConfirmation, sendNotificationToJT } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: ContactFormData = req.body;

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Save to database
    const result = await query(
      `INSERT INTO contact_submissions (name, email, phone, subject, message) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        formData.name,
        formData.email,
        formData.phone || null,
        formData.subject,
        formData.message,
      ]
    );

    console.log('Contact form saved to database:', result);

    // Send confirmation email to user
    try {
      await sendContactConfirmation(formData.email, formData.name);
      console.log('Confirmation email sent to user');
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    // Send notification email to JT
    try {
      await sendNotificationToJT(formData, 'Contact Form');
      console.log('Notification email sent to JT');
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // Don't fail the request if email fails
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been received. Thank you for contacting us!' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      error: 'An error occurred while processing your request. Please try again later.' 
    });
  }
}


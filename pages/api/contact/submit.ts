import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { sendContactConfirmation, sendNotificationToJT } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
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

    // Honeypot check - if 'website' field is filled, it's a bot
    if (req.body.website && req.body.website.trim() !== '') {
      console.log('Blocked: Honeypot field was filled (bot detected)');
      return res.status(400).json({ error: 'Invalid submission' });
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate reCAPTCHA
    if (!formData.recaptchaToken) {
      return res.status(400).json({ error: 'reCAPTCHA verification required' });
    }

    const isRecaptchaValid = await verifyRecaptcha(formData.recaptchaToken);
    if (!isRecaptchaValid) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed. Please try again.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Additional bot protection layers
    
    // 1. Check for suspicious patterns in name (random characters)
    const suspiciousNamePattern = /^[a-zA-Z]{20,}$/; // Long strings without spaces
    if (suspiciousNamePattern.test(formData.name)) {
      console.log('Blocked: Suspicious name pattern detected');
      return res.status(400).json({ error: 'Invalid name format' });
    }

    // 2. Check message length (bots often send very short messages)
    if (formData.message.length < 10) {
      return res.status(400).json({ error: 'Message is too short. Please provide more details.' });
    }

    // 3. Check for gibberish in message (no vowels or all consonants)
    const hasVowels = /[aeiouAEIOU]/.test(formData.message);
    if (!hasVowels && formData.message.length > 5) {
      console.log('Blocked: Message contains no vowels (likely gibberish)');
      return res.status(400).json({ error: 'Invalid message format' });
    }

    // 4. Rate limiting check - same email submitting too frequently
    const recentSubmissions = await query(
      `SELECT COUNT(*) as count FROM contact_submissions 
       WHERE email = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)`,
      [formData.email]
    ) as any[];
    
    if (recentSubmissions[0]?.count >= 3) {
      console.log('Blocked: Too many submissions from same email');
      return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
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


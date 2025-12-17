import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

let transporter: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  const transporter = getTransporter();
  
  try {
    const info = await transporter.sendMail({
      from: `"Pivotal Institute Solutions" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendContactConfirmation(userEmail: string, userName: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1e3a5f; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Pivotal Institute Solutions</h1>
        </div>
        <div class="content">
          <h2>Thank You for Contacting Us!</h2>
          <p>Dear ${userName},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>Our team typically responds within 24-48 business hours.</p>
          <p>If you have any urgent questions, please call us directly.</p>
          <p>Best regards,<br>The Pivotal Institute Solutions Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Pivotal Institute Solutions. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject: 'Thank You for Contacting Pivotal Institute Solutions',
    html,
  });
}

export async function sendNotificationToJT(formData: any, formType: string) {
  const jtEmail = process.env.JT_EMAIL || 'jt@pivotalinstitute.com';
  const siteName = process.env.SITE_NAME || 'Pivotal Institute Solutions';
  const siteUrl = process.env.SITE_URL || 'pivotalinstitute.solutions';
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1e3a5f; color: white; padding: 20px; }
        .site-badge { background-color: #f39c12; color: white; padding: 10px 15px; border-radius: 5px; display: inline-block; margin-bottom: 15px; font-size: 14px; font-weight: bold; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1e3a5f; }
        .value { margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New ${formType} Submission</h2>
        </div>
        <div class="content">
          <div class="site-badge">🌐 ${siteName} (${siteUrl})</div>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
  `;

  // Add form fields (exclude internal fields and tokens)
  for (const [key, value] of Object.entries(formData)) {
    if (key !== 'id' && key !== 'created_at' && key !== 'recaptchaToken') {
      html += `
        <div class="field">
          <div class="label">${key.charAt(0).toUpperCase() + key.slice(1)}:</div>
          <div class="value">${value || 'N/A'}</div>
        </div>
      `;
    }
  }

  html += `
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: jtEmail,
    subject: `[${siteName}] New ${formType}`,
    html,
  });
}


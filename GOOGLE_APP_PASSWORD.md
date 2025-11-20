# How to Set Up Google App Password

Google App Passwords allow applications to access your Gmail account securely without using your actual password. This is required for sending emails from the website.

---

## What You Need to Do at https://myaccount.google.com/apppasswords

### Prerequisites

**IMPORTANT:** You MUST have 2-Factor Authentication (2FA) enabled on your Google account before you can create App Passwords.

---

## Step-by-Step Guide

### Step 1: Enable 2-Factor Authentication (If Not Already Enabled)

1. Go to https://myaccount.google.com/security
2. Scroll down to "Signing in to Google"
3. Click on "2-Step Verification"
4. Follow the prompts to set up 2FA using your phone number

### Step 2: Create an App Password

1. **Go to:** https://myaccount.google.com/apppasswords

2. **Sign in** to your Google account if prompted

3. **You'll see the App Passwords page:**
   - If you see a message saying "App passwords are not available," it means 2FA is not enabled. Go back to Step 1.

4. **Create a new App Password:**
   - In the "Select app" dropdown, choose "Mail"
   - In the "Select device" dropdown, choose "Other (Custom name)"
   - Type a name like "Pivotal Institute Website"
   - Click "Generate"

5. **Copy the 16-character password:**
   - Google will display a 16-character password like: `abcd efgh ijkl mnop`
   - **IMPORTANT:** Copy this password immediately! You won't be able to see it again.
   - It will look something like: `abcdefghijklmnop` (without spaces)

6. **Add to your .env.local file:**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_APP_PASSWORD=abcdefghijklmnop
   ```
   **Note:** Remove any spaces when copying the password into the .env file.

---

## Example Configuration

If your email is `support@pivotalinstitute.com` and your app password is `abcd efgh ijkl mnop`, your `.env.local` should have:

```env
EMAIL_USER=support@pivotalinstitute.com
EMAIL_APP_PASSWORD=abcdefghijklmnop
JT_EMAIL=jt@pivotalinstitute.com
```

---

## Common Issues and Solutions

### Issue 1: "App passwords are not available"

**Solution:** Enable 2-Factor Authentication first at https://myaccount.google.com/security

### Issue 2: "Invalid credentials" error when sending emails

**Solutions:**
1. Make sure you copied the entire 16-character password
2. Remove any spaces from the password
3. Make sure you're using the App Password, not your regular Gmail password
4. Try generating a new App Password

### Issue 3: Emails not sending

**Solutions:**
1. Check your Gmail account hasn't blocked the sign-in attempt
2. Go to https://myaccount.google.com/notifications and check for security alerts
3. Verify the EMAIL_USER email address is correct
4. Make sure "Less secure app access" is OFF (you should be using App Passwords instead)

---

## Security Tips

✅ **DO:**
- Keep your App Password secure (treat it like a regular password)
- Use different App Passwords for different applications
- Revoke App Passwords you're no longer using

❌ **DON'T:**
- Share your App Password with anyone
- Commit your .env.local file to version control (it's in .gitignore for this reason)
- Use your regular Gmail password in the application

---

## Revoking an App Password

If you need to revoke an App Password:

1. Go to https://myaccount.google.com/apppasswords
2. Find the App Password you want to revoke
3. Click the trash/delete icon next to it
4. The App Password will stop working immediately

---

## Alternative: Using a Different Email Service

If you prefer not to use Gmail, you can modify the email configuration in `lib/email.ts` to use:
- **SendGrid** (recommended for production)
- **Amazon SES**
- **Mailgun**
- **Any SMTP service**

For production deployments, we recommend using a dedicated email service rather than Gmail.

---

## Next Steps

After setting up your App Password:

1. Add it to your `.env.local` file
2. Restart your development server
3. Test the contact form
4. Verify you receive the confirmation email

---

## Need Help?

If you're still having trouble:
1. Double-check your 2FA is enabled
2. Try generating a new App Password
3. Check the browser console for error messages
4. Review the server logs for email-related errors


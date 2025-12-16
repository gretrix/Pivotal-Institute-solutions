# reCAPTCHA Setup Guide

## 🛡️ Bot Protection Implementation

This guide will help you set up Google reCAPTCHA v2 to protect your contact forms from spam bots.

## Step 1: Get Your reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Sign in with your Google account
3. Fill out the registration form:
   - **Label**: Pivotal Institute Website (or any name you prefer)
   - **reCAPTCHA type**: Select **reCAPTCHA v2** → "I'm not a robot" Checkbox
   - **Domains**: Add your domains:
     - `pivotalinstitute.solutions`
     - `www.pivotalinstitute.solutions`
     - `localhost` (for testing)
   - Accept the reCAPTCHA Terms of Service
4. Click **Submit**
5. You'll receive two keys:
   - **Site Key** (public key - used in frontend)
   - **Secret Key** (private key - used in backend)

## Step 2: Add Keys to Your Environment

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your reCAPTCHA keys:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Important**: 
- Replace `your_site_key_here` and `your_secret_key_here` with your actual keys
- Never commit `.env.local` to git (it's already in `.gitignore`)
- The `NEXT_PUBLIC_` prefix makes the site key available to the browser

## Step 3: Deploy to Production

When deploying to your hosting platform, add these environment variables:

### For Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add both variables:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`

### For Other Platforms:
Add the same environment variables through your hosting platform's dashboard or deployment configuration.

## Step 4: Test It Out

1. Start your development server: `npm run dev`
2. Go to the contact page: `http://localhost:3000/contact`
3. Fill out the form
4. Check the "I'm not a robot" checkbox
5. Submit the form

## What Changed?

### Frontend (`pages/contact.tsx`):
- Added reCAPTCHA widget above the submit button
- Form validates reCAPTCHA before submission
- Token is sent with form data to backend

### Backend (`pages/api/contact/submit.ts`):
- Verifies reCAPTCHA token with Google's API
- Rejects submissions with invalid/missing tokens
- Prevents bot submissions from reaching your database

## How It Works

1. User fills out the contact form
2. User checks "I'm not a robot" box
3. Google verifies the user is human (may show image challenges)
4. Form submits with a unique token
5. Backend verifies token with Google
6. If valid, form is processed; if invalid, submission is rejected

## Troubleshooting

### "reCAPTCHA verification failed"
- Check that your secret key is correct in `.env.local`
- Verify your domain is registered in reCAPTCHA admin console
- Make sure you're using reCAPTCHA v2 (not v3)

### reCAPTCHA widget not showing
- Check that your site key is correct in `.env.local`
- Verify the `NEXT_PUBLIC_` prefix is present
- Restart your dev server after adding environment variables

### "localhost" not working
- Add `localhost` to your domains in reCAPTCHA admin console
- Use `127.0.0.1` if localhost doesn't work

## Apply to Other Sites

To add this same protection to your other websites:

1. **Option A - Same Domain**: Use the same reCAPTCHA keys if the sites are on the same domain
2. **Option B - Different Domains**: 
   - Add the new domain to your existing reCAPTCHA registration, OR
   - Create a new reCAPTCHA registration for the new domain

Then copy these files to your other projects:
- The reCAPTCHA implementation in `pages/contact.tsx`
- The verification logic in `pages/api/contact/submit.ts`
- Install the package: `npm install react-google-recaptcha @types/react-google-recaptcha`

## Security Notes

- ✅ reCAPTCHA blocks automated bot submissions
- ✅ Secret key is never exposed to the browser
- ✅ Each token can only be used once
- ✅ Tokens expire after a few minutes
- ⚠️ Keep your secret key private and secure
- ⚠️ Never commit `.env.local` to version control

## Need Help?

If you encounter any issues, check:
1. Environment variables are set correctly
2. Dev server was restarted after adding env vars
3. Domain is registered in reCAPTCHA admin console
4. Using reCAPTCHA v2 (not v3)

---

**That's it!** Your contact form is now protected from spam bots. 🎉

# 📋 Deployment Checklist

## Before Deploying to Production

### ✅ Local Testing
- [ ] Created `.env.local` with reCAPTCHA keys
- [ ] Tested contact form on localhost
- [ ] Verified "I'm not a robot" checkbox appears
- [ ] Confirmed form submission works
- [ ] Tested that form fails without checking reCAPTCHA

### ✅ reCAPTCHA Configuration
- [ ] Added production domain to reCAPTCHA admin console
  - Go to: https://www.google.com/recaptcha/admin
  - Add: `pivotalinstitute.solutions`
  - Add: `www.pivotalinstitute.solutions`

### ✅ Environment Variables (Production)
Add these to your hosting platform:

**Vercel / Netlify / Other:**
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

**Important:** Use the same keys from your reCAPTCHA registration

### ✅ Security Check
- [ ] `.env.local` is NOT committed to git
- [ ] `.gitignore` includes `.env*.local`
- [ ] Secret key is only in environment variables
- [ ] Site key starts with `6L` (public key)
- [ ] Secret key starts with `6L` (private key)

### ✅ Post-Deployment Testing
- [ ] Visit production contact page
- [ ] reCAPTCHA widget loads correctly
- [ ] Submit test form with reCAPTCHA checked
- [ ] Try submitting without checking (should fail)
- [ ] Verify email notifications work

## For Other Sites

When applying to your other websites:

### Same Process:
1. [ ] Add new domain to reCAPTCHA admin (or create new registration)
2. [ ] Copy implementation files
3. [ ] Install package: `npm install react-google-recaptcha @types/react-google-recaptcha`
4. [ ] Add environment variables
5. [ ] Test locally
6. [ ] Deploy with env vars
7. [ ] Test in production

### Sites to Update:
- [ ] pivotalinstitute.solutions ✅ (this one)
- [ ] [Add your other site domains here]
- [ ] [Add your other site domains here]
- [ ] [Add your other site domains here]

## Troubleshooting

**reCAPTCHA not showing?**
- Check site key is correct
- Verify domain is registered
- Clear browser cache

**Verification failing?**
- Check secret key is correct
- Verify server can reach Google's API
- Check server logs for errors

**Still getting spam?**
- Verify reCAPTCHA is required (not optional)
- Check backend validation is working
- Consider adding additional validation (honeypot, rate limiting)

---

**Need help?** Check `RECAPTCHA_SETUP.md` for detailed instructions.

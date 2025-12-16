# 🚀 Quick Start - reCAPTCHA Setup

## Get Up and Running in 5 Minutes

### 1️⃣ Get Your Keys (2 minutes)
Visit: https://www.google.com/recaptcha/admin/create
- Choose **reCAPTCHA v2** → "I'm not a robot" Checkbox
- Add domains: `pivotalinstitute.solutions`, `localhost`
- Copy your **Site Key** and **Secret Key**

### 2️⃣ Add to Environment (1 minute)
Create `.env.local` in your project root:
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=paste_your_site_key_here
RECAPTCHA_SECRET_KEY=paste_your_secret_key_here
```

### 3️⃣ Restart Server (1 minute)
```bash
# Stop your current server (Ctrl+C)
npm run dev
```

### 4️⃣ Test It (1 minute)
1. Go to: http://localhost:3000/contact
2. Fill out the form
3. Check "I'm not a robot"
4. Submit!

## ✅ Done!
Your contact form is now protected from bots. No more spam emails! 🎉

---

**For detailed instructions, see:** `RECAPTCHA_SETUP.md`

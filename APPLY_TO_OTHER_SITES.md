# 🔄 Apply reCAPTCHA to Your Other Sites

## Quick Copy-Paste Guide

Follow these steps to add the same bot protection to all your other websites.

---

## Step 1: Update reCAPTCHA Domains

1. Go to: https://www.google.com/recaptcha/admin
2. Click on your existing reCAPTCHA registration
3. Click "Settings" (gear icon)
4. Under "Domains", add your other site domains:
   ```
   site1.com
   www.site1.com
   site2.com
   www.site2.com
   localhost (for testing)
   ```
5. Save

**Note:** You can use the SAME keys for all your sites if you add all domains to one registration.

---

## Step 2: Install Package (Each Site)

In each project, run:
```bash
npm install react-google-recaptcha @types/react-google-recaptcha
```

---

## Step 3: Add Environment Variables (Each Site)

Create `.env.local` in each project:
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Use the SAME keys from Step 1**

---

## Step 4: Update Frontend (Each Site)

### If using React/Next.js:

**Add imports:**
```typescript
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
```

**Add ref:**
```typescript
const recaptchaRef = useRef<ReCAPTCHA>(null);
```

**Add widget before submit button:**
```tsx
<div className="mb-6">
  <ReCAPTCHA
    ref={recaptchaRef}
    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
  />
</div>
```

**Update submit handler:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Get reCAPTCHA token
  const recaptchaToken = recaptchaRef.current?.getValue();
  
  if (!recaptchaToken) {
    // Show error: "Please complete the reCAPTCHA verification."
    return;
  }

  // Send token with form data
  const response = await fetch('/api/contact/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formData,
      recaptchaToken,
    }),
  });

  // Reset reCAPTCHA after submission
  recaptchaRef.current?.reset();
};
```

---

## Step 5: Update Backend (Each Site)

### For Next.js API Routes:

**Add verification function:**
```typescript
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
```

**Add validation in your API handler:**
```typescript
export default async function handler(req, res) {
  // ... existing code ...

  const { recaptchaToken, ...formData } = req.body;

  // Validate reCAPTCHA
  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA verification required' });
  }

  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
    return res.status(400).json({ 
      error: 'reCAPTCHA verification failed. Please try again.' 
    });
  }

  // ... continue with form processing ...
}
```

### For Express.js:

```javascript
const fetch = require('node-fetch');

async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();
  return data.success === true;
}

app.post('/api/contact', async (req, res) => {
  const { recaptchaToken, ...formData } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA verification required' });
  }

  const isValid = await verifyRecaptcha(recaptchaToken);
  if (!isValid) {
    return res.status(400).json({ error: 'reCAPTCHA verification failed' });
  }

  // Process form...
});
```

### For PHP:

```php
<?php
function verifyRecaptcha($token) {
    $secretKey = getenv('RECAPTCHA_SECRET_KEY');
    
    $response = file_get_contents(
        'https://www.google.com/recaptcha/api/siteverify?' .
        http_build_query([
            'secret' => $secretKey,
            'response' => $token
        ])
    );
    
    $data = json_decode($response);
    return $data->success === true;
}

// In your form handler:
$recaptchaToken = $_POST['recaptchaToken'];

if (!$recaptchaToken || !verifyRecaptcha($recaptchaToken)) {
    die('reCAPTCHA verification failed');
}

// Process form...
?>
```

---

## Step 6: Test Each Site

1. Start dev server
2. Go to contact page
3. Fill out form
4. Check "I'm not a robot"
5. Submit and verify it works
6. Try submitting without checking (should fail)

---

## Step 7: Deploy Each Site

1. Add environment variables to hosting platform:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`
2. Deploy changes
3. Test on production site

---

## Checklist for Each Site

- [ ] Domain added to reCAPTCHA admin
- [ ] Package installed
- [ ] Environment variables added (local)
- [ ] Frontend updated with reCAPTCHA widget
- [ ] Backend updated with verification
- [ ] Tested locally
- [ ] Environment variables added (production)
- [ ] Deployed to production
- [ ] Tested on production

---

## Sites to Update

Track your progress:

### ✅ Completed
- [x] pivotalinstitute.solutions

### 📋 To Do
- [ ] ___________________________
- [ ] ___________________________
- [ ] ___________________________
- [ ] ___________________________
- [ ] ___________________________

---

## Tips

**Same Keys for All Sites:**
- ✅ Easier to manage
- ✅ One reCAPTCHA registration
- ✅ Add all domains to one registration

**Separate Keys per Site:**
- ✅ Better analytics per site
- ✅ Can disable one site without affecting others
- ❌ More keys to manage

**Recommendation:** Use same keys for all your sites unless you need separate analytics.

---

## Need Help?

- **This Site's Implementation:** Check `pages/contact.tsx` and `pages/api/contact/submit.ts`
- **Detailed Guide:** See `RECAPTCHA_SETUP.md`
- **Google Docs:** https://developers.google.com/recaptcha

---

**Remember:** Once you add a domain to your reCAPTCHA registration, you can use the same keys across all your sites! 🚀

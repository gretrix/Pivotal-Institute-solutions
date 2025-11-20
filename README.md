# Pivotal Institute Solutions Website

A modern, professional website for Pivotal Institute Solutions - a vocational training institution. Built with Next.js, TypeScript, Tailwind CSS, MySQL, and integrated email notifications.

![Pivotal Institute Solutions](./public/logo.png)

## Features

✅ **Fully Responsive Design** - Works perfectly on all devices  
✅ **WIOA Compliant** - Meets all WIOA first-approval requirements  
✅ **Complete Site Map:**
- Home page with school information
- About page with non-discrimination and ADA statements
- Programs landing page
- Individual program pages with full details
- Policies page (Refund & Grievance)
- Contact page with form

✅ **Database Integration** - All form submissions saved to MySQL  
✅ **Email Notifications:**
- Automatic confirmation emails to users
- Notification emails to JT with form details

✅ **Modern Tech Stack:**
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- MySQL database
- Nodemailer for emails
- PM2-ready for production deployment

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file with your configuration (see SETUP.md for details)

### 3. Set Up Database
Make sure MySQL is running and create the database

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Documentation

📖 **[SETUP.md](./SETUP.md)** - Complete local development setup guide  
🔐 **[GOOGLE_APP_PASSWORD.md](./GOOGLE_APP_PASSWORD.md)** - How to set up Gmail for sending emails  
☁️ **[AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md)** - Complete AWS EC2 deployment guide

---

## Project Structure

```
pivotal-institute/
├── components/          # React components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # Site header with navigation
│   └── Footer.tsx      # Site footer
├── pages/              # Next.js pages
│   ├── index.tsx       # Home page
│   ├── about.tsx       # About page
│   ├── contact.tsx     # Contact page with form
│   ├── policies.tsx    # Policies page
│   ├── programs/
│   │   ├── index.tsx   # Programs landing page
│   │   └── [slug].tsx  # Individual program pages
│   └── api/
│       ├── contact/
│       │   └── submit.ts   # Contact form API endpoint
│       └── init-db.ts      # Database initialization
├── lib/                # Utility libraries
│   ├── db.ts          # Database connection and queries
│   └── email.ts       # Email sending functions
├── utils/
│   └── constants.ts   # School info, programs, policies
├── styles/
│   └── globals.css    # Global styles with Tailwind
└── public/
    └── logo.png       # School logo
```

---

## Site Pages Overview

### 1. Home Page (`/`)
- School name, logo, contact info
- Mission statement
- Programs preview
- Call-to-action buttons

### 2. About Page (`/about`)
- School description and mission
- Open to public statement
- Non-discrimination statement
- ADA accessibility statement

### 3. Programs Page (`/programs`)
- List of all training programs
- Links to individual program pages

### 4. Individual Program Pages (`/programs/[slug]`)
Each program includes:
- Program name and description
- Total hours and weeks
- Credential awarded
- Complete tuition breakdown (tuition + fees + materials)
- Admission requirements

### 5. Policies Page (`/policies`)
- Refund policy (step-by-step)
- Grievance/complaint procedure

### 6. Contact Page (`/contact`)
- Contact information (phone, email, address)
- Contact form with validation
- Form submissions saved to database
- Email confirmations sent automatically

---

## Current Programs

1. **Healthcare Assistant Certification** - 240 hours / 12 weeks
2. **IT Support Specialist** - 320 hours / 16 weeks  
3. **Business Administration** - 280 hours / 14 weeks
4. **Welding Technology** - 400 hours / 20 weeks

*Programs can be easily added or modified in `utils/constants.ts`*

---

## Email Flow

When a user submits the contact form:

1. ✅ Form data is validated
2. ✅ Saved to MySQL database (`contact_submissions` table)
3. ✅ Confirmation email sent to the user
4. ✅ Notification email sent to JT with full form details
5. ✅ Success message displayed to user

---

## Environment Variables Required

```env
# Database
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=pivotal_institute

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password
JT_EMAIL=jt@pivotalinstitute.com

# Site
SITE_URL=http://localhost:3000
```

---

## Customization

### Update School Information
Edit `utils/constants.ts` to update:
- School name, address, phone, email
- School description and mission
- Programs (add, remove, or modify)
- Policies
- Statements

### Update Styling
- Colors are defined in `tailwind.config.js`
- Primary color: `#1e3a5f` (navy blue)
- Secondary color: `#4a90a4` (teal)
- Global styles in `styles/globals.css`

### Add New Pages
1. Create a new file in `pages/`
2. Use the `Layout` component
3. Add navigation link in `components/Header.tsx`

---

## Database Tables

### `contact_submissions`
Stores all contact form submissions:
- id (auto-increment)
- name
- email
- phone
- subject
- message
- created_at (timestamp)

### `program_inquiries`
Ready for future program-specific inquiry forms:
- id (auto-increment)
- name
- email
- phone
- program
- message
- created_at (timestamp)

---

## Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Linting
npm run lint        # Run ESLint
```

---

## Deployment

### Local Development
See [SETUP.md](./SETUP.md)

### AWS EC2 Deployment
See [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md)

### Other Hosting Options
This Next.js app can be deployed to:
- Vercel (easiest for Next.js)
- AWS EC2 (full control)
- DigitalOcean
- Heroku
- Any Node.js hosting

---

## Testing Checklist

Before going live:

- [ ] Test all navigation links
- [ ] Test contact form submission
- [ ] Verify confirmation email is received
- [ ] Verify JT receives notification email
- [ ] Check database for saved submission
- [ ] Test on mobile devices
- [ ] Test all program pages
- [ ] Verify all contact information is correct
- [ ] Check spelling and grammar
- [ ] Test with different browsers
- [ ] Verify SSL certificate (production)

---

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

---

## Security Features

- ✅ Form validation (client and server-side)
- ✅ SQL injection protection (parameterized queries)
- ✅ Environment variables for sensitive data
- ✅ Email validation
- ✅ Rate limiting recommended for production
- ✅ HTTPS/SSL recommended for production

---

## Future Enhancements (Optional)

- Online application system
- Student portal
- Payment processing integration
- Course scheduling
- Student testimonials section
- Photo gallery
- Blog/News section
- Live chat support
- Analytics integration

---

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MySQL
- **Email:** Nodemailer (Gmail)
- **Process Manager:** PM2 (production)
- **Web Server:** Nginx (production)
- **Hosting:** AWS EC2 Linux

---

## License

Proprietary - Pivotal Institute Solutions

---

## Support

For technical support:
- Check the documentation files in this repository
- Review error logs: `pm2 logs pivotal-institute`
- Contact your development team

---

## Contributors

Developed for Pivotal Institute Solutions

---

## Acknowledgments

Built with modern web technologies to meet WIOA compliance requirements and provide an excellent user experience for prospective students.

---

**Last Updated:** November 2025


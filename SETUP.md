# Pivotal Institute Solutions Website - Setup Guide

This guide will walk you through setting up the website locally and deploying it to AWS EC2.

## Prerequisites

- Node.js 18+ installed
- MySQL database (local or remote)
- Gmail account for sending emails
- AWS account (for deployment)

---

## Part 1: Local Development Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory with the following content:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=pivotal_institute

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-character-app-password
JT_EMAIL=jt@pivotalinstitute.com

# Site Configuration
SITE_URL=http://localhost:3000
```

### Step 3: Set Up MySQL Database

1. Log into your MySQL server:
   ```bash
   mysql -u root -p
   ```

2. Create the database:
   ```sql
   CREATE DATABASE pivotal_institute;
   ```

3. The tables will be created automatically when you initialize the database (see Step 5).

### Step 4: Set Up Google App Password

See the [GOOGLE_APP_PASSWORD.md](./GOOGLE_APP_PASSWORD.md) file for detailed instructions.

### Step 5: Initialize the Database

Start the development server:
```bash
npm run dev
```

Then make a POST request to initialize the database tables:
```bash
curl -X POST http://localhost:3000/api/init-db
```

Or visit http://localhost:3000/api/init-db in Postman with POST method.

### Step 6: Access the Website

Open your browser and navigate to:
```
http://localhost:3000
```

---

## Part 2: AWS EC2 Deployment

See the [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md) file for detailed deployment instructions.

---

## Troubleshooting

### Database Connection Issues

If you're having trouble connecting to MySQL:

1. Make sure MySQL is running:
   ```bash
   # On Windows
   net start MySQL80
   
   # On Linux
   sudo systemctl start mysql
   ```

2. Verify your credentials in `.env.local`

3. Check if the database exists:
   ```sql
   SHOW DATABASES;
   ```

### Email Issues

1. Make sure you're using an App Password, not your regular Gmail password
2. Verify 2-Factor Authentication is enabled on your Google account
3. Check that the EMAIL_USER and EMAIL_APP_PASSWORD are correct in `.env.local`

### Build Errors

If you encounter TypeScript errors during build:

```bash
npm run build
```

Check the error messages and ensure all dependencies are installed correctly.

---

## Testing the Contact Form

1. Navigate to http://localhost:3000/contact
2. Fill out and submit the form
3. You should receive:
   - A confirmation email at the email address you entered
   - JT should receive a notification email with the form details
4. Check the database to verify the submission was saved:
   ```sql
   USE pivotal_institute;
   SELECT * FROM contact_submissions;
   ```

---

## Next Steps

- Customize the content in `utils/constants.ts` to match your actual school information
- Update the programs list with your real programs
- Add your actual contact information
- Test all forms thoroughly before going live
- Set up SSL certificate for production (Let's Encrypt recommended)

---

## Support

For issues or questions, contact your development team.


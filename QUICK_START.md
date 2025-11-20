# Quick Start Guide - Pivotal Institute Website

This is the fastest way to get your website running. For detailed instructions, see the other documentation files.

---

## 🚀 What You Need to Do Right Now

### 1️⃣ Google App Password Setup

**Go to:** https://myaccount.google.com/apppasswords

**What to do there:**
1. Make sure you have 2-Factor Authentication enabled first
2. Click "Select app" → Choose "Mail"
3. Click "Select device" → Choose "Other" → Type "Pivotal Institute Website"
4. Click "Generate"
5. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)
6. Save it somewhere safe - you'll need it in Step 4 below

**Can't see App Passwords?**
- You need to enable 2-Factor Authentication first at: https://myaccount.google.com/security

📖 **Need more help?** See [GOOGLE_APP_PASSWORD.md](./GOOGLE_APP_PASSWORD.md)

---

## 2️⃣ Install Dependencies

Open PowerShell in the project folder and run:

```powershell
npm install
```

Wait for it to complete (this may take a few minutes).

---

## 3️⃣ Set Up MySQL Database

### If you have MySQL installed:

```powershell
# Open MySQL
mysql -u root -p

# In MySQL, run these commands:
CREATE DATABASE pivotal_institute;
EXIT;
```

### Don't have MySQL?
Download and install it from: https://dev.mysql.com/downloads/mysql/

---

## 4️⃣ Create Environment File

Create a file named `.env.local` in the project root folder with this content:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=pivotal_institute

# Email Configuration (Use the App Password from Step 1)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=paste-your-16-char-app-password-here
JT_EMAIL=jt@pivotalinstitute.com

# Site Configuration
SITE_URL=http://localhost:3000
```

**Replace:**
- `your_mysql_password` with your MySQL root password
- `your-email@gmail.com` with your Gmail address
- `paste-your-16-char-app-password-here` with the password from Step 1
- `jt@pivotalinstitute.com` with JT's actual email

---

## 5️⃣ Start the Website

```powershell
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## 6️⃣ Initialize the Database

Open a **new** PowerShell window and run:

```powershell
curl -X POST http://localhost:3000/api/init-db
```

You should see: `{"success":true,"message":"Database tables initialized successfully"}`

---

## 7️⃣ Test Your Website

Open your browser and go to: **http://localhost:3000**

### Test the contact form:
1. Click "Contact" in the menu
2. Fill out and submit the form
3. You should see a success message
4. Check your email for a confirmation
5. JT should receive a notification email

---

## ✅ That's It!

Your website is now running locally!

---

## 📱 What About AWS Deployment?

To deploy to AWS EC2, follow the detailed guide:
📖 **[AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md)**

**Basic AWS steps summary:**
1. Create an EC2 instance
2. Connect via SSH
3. Install Node.js, MySQL, Nginx
4. Upload your code
5. Set up environment variables
6. Run with PM2

---

## 🆘 Common Issues

### ❌ "Cannot connect to MySQL"
- Make sure MySQL is running
- Check your password in `.env.local`

### ❌ "Invalid email credentials"
- Make sure you're using the App Password, not your regular Gmail password
- Double-check the password has no spaces

### ❌ "Port 3000 is already in use"
- Close any other programs using port 3000
- Or stop the running server: Press `Ctrl+C` in the terminal

### ❌ Contact form not saving
- Make sure you ran the database initialization (Step 6)
- Check MySQL is running

---

## 📞 Need More Help?

- **Local setup:** See [SETUP.md](./SETUP.md)
- **Google App Password:** See [GOOGLE_APP_PASSWORD.md](./GOOGLE_APP_PASSWORD.md)  
- **AWS Deployment:** See [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md)
- **Full documentation:** See [README.md](./README.md)

---

## 🎯 Next Steps

1. ✅ Customize the content in `utils/constants.ts`
2. ✅ Update school information (address, phone, etc.)
3. ✅ Add or modify programs
4. ✅ Test everything thoroughly
5. ✅ Deploy to AWS when ready

---

**You're all set! Good luck with your website! 🎉**


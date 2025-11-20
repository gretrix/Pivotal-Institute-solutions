# AWS EC2 Deployment Commands - Copy & Paste Guide

This file contains all the commands you need to deploy to AWS EC2, organized step-by-step.

---

## 🔑 STEP 1: Connect to Your EC2 Instance

### From Windows PowerShell:
```powershell
# Navigate to your key file location
cd C:\path\to\your\key

# Fix permissions
icacls pivotal-institute-key.pem /inheritance:r
icacls pivotal-institute-key.pem /grant:r "$($env:USERNAME):(R)"

# Connect (replace YOUR_EC2_IP with your actual IP)
ssh -i pivotal-institute-key.pem ec2-user@YOUR_EC2_IP
```

---

## 📦 STEP 2: Initial Server Setup

```bash
# Update system
sudo yum update -y

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version
npm --version

# Install Git
sudo yum install git -y

# Install MySQL
sudo yum install mysql-server -y
sudo systemctl start mysqld
sudo systemctl enable mysqld

# Secure MySQL
sudo mysql_secure_installation
```

**MySQL secure installation answers:**
- Set root password? **YES** → Enter a strong password
- Remove anonymous users? **YES**
- Disallow root login remotely? **YES**
- Remove test database? **YES**
- Reload privilege tables? **YES**

---

## 🗄️ STEP 3: Create Database

```bash
# Login to MySQL
sudo mysql -u root -p
# Enter the password you just set
```

**In MySQL prompt, run these commands:**
```sql
CREATE DATABASE pivotal_institute;
CREATE USER 'pivotal_user'@'localhost' IDENTIFIED BY 'YourStrongPassword123!';
GRANT ALL PRIVILEGES ON pivotal_institute.* TO 'pivotal_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 📁 STEP 4: Upload Your Project

### Option A: From Windows PowerShell (On Your Local Computer)
```powershell
# Navigate to your project folder
cd C:\Users\Kiran\OneDrive\Documents\Pivotal-Institute-solutions

# Upload to EC2 (replace YOUR_EC2_IP and path to your key)
scp -i C:\path\to\pivotal-institute-key.pem -r * ec2-user@YOUR_EC2_IP:~/pivotal-institute/
```

### Option B: Using Git (On EC2 Server)
```bash
cd ~
git clone https://github.com/yourusername/pivotal-institute.git
cd pivotal-institute
```

---

## ⚙️ STEP 5: Configure the Application

```bash
# Navigate to project
cd ~/pivotal-institute

# Install dependencies
npm install

# Create environment file
nano .env.local
```

**Paste this content into nano:**
```env
DB_HOST=localhost
DB_USER=pivotal_user
DB_PASSWORD=YourStrongPassword123!
DB_NAME=pivotal_institute

EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password
JT_EMAIL=jt@pivotalinstitute.com

SITE_URL=http://YOUR_EC2_IP
```

**Press:** `Ctrl+X`, then `Y`, then `Enter` to save

```bash
# Build the application
npm run build

# Start temporarily to initialize database
npm start &

# Wait 10 seconds, then initialize database
sleep 10
curl -X POST http://localhost:3000/api/init-db

# Stop the temporary server
pkill node
```

---

## 🚀 STEP 6: Set Up PM2 (Keep App Running)

```bash
# Install PM2
sudo npm install -g pm2

# Start application with PM2
pm2 start npm --name "pivotal-institute" -- start

# Set PM2 to auto-start on reboot
pm2 startup
# ⚠️ IMPORTANT: Copy and run the command that PM2 outputs!

# Save the PM2 process list
pm2 save

# Check status
pm2 status
```

---

## 🌐 STEP 7: Install and Configure Nginx

```bash
# Install Nginx
sudo yum install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Create Nginx configuration
sudo nano /etc/nginx/conf.d/pivotal-institute.conf
```

**Paste this configuration (replace YOUR_EC2_IP with your actual IP or domain):**
```nginx
server {
    listen 80;
    server_name YOUR_EC2_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Press:** `Ctrl+X`, then `Y`, then `Enter` to save

```bash
# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 🎉 STEP 8: Access Your Website

Open browser and go to:
```
http://YOUR_EC2_IP
```

---

## 🔒 STEP 9: Set Up SSL (If You Have a Domain)

```bash
# Install Certbot
sudo yum install certbot python3-certbot-nginx -y

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts - Certbot will configure everything automatically!

---

## 📊 Useful Management Commands

### Check Application Status
```bash
pm2 status
pm2 logs pivotal-institute
```

### Restart Application
```bash
pm2 restart pivotal-institute
```

### Check Nginx Status
```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### View Database Records
```bash
mysql -u pivotal_user -p pivotal_institute
```
```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 10;
EXIT;
```

### Update Application (After Making Changes)
```bash
cd ~/pivotal-institute
git pull  # if using git
npm install
npm run build
pm2 restart pivotal-institute
```

---

## 🆘 Troubleshooting Commands

### Application won't start
```bash
pm2 logs pivotal-institute --lines 50
```

### Check if MySQL is running
```bash
sudo systemctl status mysqld
sudo systemctl restart mysqld
```

### Check if Nginx is running
```bash
sudo systemctl status nginx
sudo systemctl restart nginx
```

### Test database connection
```bash
mysql -u pivotal_user -p pivotal_institute
```

### View all running processes
```bash
pm2 list
netstat -tlnp | grep :3000
```

---

## 🔐 Security: Configure Firewall

```bash
# If using firewalld (Amazon Linux)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# If using ufw (Ubuntu)
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

---

## 💾 Backup Database (Recommended)

### Create backup
```bash
mysqldump -u pivotal_user -p pivotal_institute > backup_$(date +%Y%m%d).sql
```

### Restore backup
```bash
mysql -u pivotal_user -p pivotal_institute < backup_20251120.sql
```

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| View logs | `pm2 logs pivotal-institute` |
| Restart app | `pm2 restart pivotal-institute` |
| Stop app | `pm2 stop pivotal-institute` |
| Start app | `pm2 start pivotal-institute` |
| Restart Nginx | `sudo systemctl restart nginx` |
| View Nginx logs | `sudo tail -f /var/log/nginx/error.log` |
| View MySQL logs | `sudo tail -f /var/log/mysqld.log` |
| Connect to DB | `mysql -u pivotal_user -p pivotal_institute` |

---

**That's it! Your website should now be running on AWS EC2! 🚀**


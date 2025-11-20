# 🚀 Deploy to Your EC2 Instance RIGHT NOW

You're already connected! Follow these commands step by step.

---

## STEP 1: Install Node.js, MySQL, Git, and Nginx

Copy and paste these commands one by one:

```bash
# Update system
sudo yum update -y

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify Node.js installation
node --version
npm --version

# Install MySQL
sudo yum install mysql-server -y

# Start MySQL
sudo systemctl start mysqld
sudo systemctl enable mysqld

# Install Git
sudo yum install git -y

# Install Nginx
sudo yum install nginx -y

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## STEP 2: Secure MySQL and Create Database

```bash
# Run MySQL secure installation
sudo mysql_secure_installation
```

**Answer these prompts:**
- Set root password? **YES** → Enter: `PivotalInstitute2023!`
- Remove anonymous users? **YES**
- Disallow root login remotely? **YES**
- Remove test database? **YES**
- Reload privilege tables? **YES**

**Now create the database:**

```bash
# Login to MySQL
sudo mysql -u root -p
```

Enter password: `PivotalInstitute2023!`

**In MySQL, run these commands:**

```sql
CREATE DATABASE pivotal_institute;
CREATE USER 'pivotal_user'@'localhost' IDENTIFIED BY 'Pivotal2023Secure!';
GRANT ALL PRIVILEGES ON pivotal_institute.* TO 'pivotal_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## STEP 3: Create Project Directory

```bash
# Create directory
mkdir -p ~/pivotal-institute
cd ~/pivotal-institute
```

---

## STEP 4: Upload Your Code

**⚠️ IMPORTANT:** Open a **NEW** PowerShell window on your local computer (Windows), and run:

```powershell
# Navigate to your project
cd C:\Users\Kiran\OneDrive\Documents\Pivotal-Institute-solutions

# Upload to EC2 (replace YOUR_KEY_PATH and YOUR_EC2_IP)
scp -i "C:\path\to\your-key.pem" -r * ec2-user@YOUR_EC2_IP:~/pivotal-institute/
```

**What's YOUR_EC2_IP?** 
- Look at your EC2 terminal prompt: `[ec2-user@ip-172-31-70-56 ~]$`
- In AWS console, find your instance's **Public IPv4 address**

**After upload completes, go back to your EC2 terminal.**

---

## STEP 5: Install Dependencies and Configure

**Back in your EC2 terminal:**

```bash
# Make sure you're in the right directory
cd ~/pivotal-institute

# Install dependencies
npm install

# Create environment file
cat > .env.local << 'EOF'
DB_HOST=localhost
DB_USER=pivotal_user
DB_PASSWORD=Pivotal2023Secure!
DB_NAME=pivotal_institute

EMAIL_USER=jtremblay@jontremblay.com
EMAIL_APP_PASSWORD=yqvugliuhurghxvn
JT_EMAIL=jtremblay@jontremblay.com

SITE_URL=http://YOUR_EC2_PUBLIC_IP
EOF
```

**⚠️ IMPORTANT:** Replace `YOUR_EC2_PUBLIC_IP` in the file:

```bash
# Edit the file
nano .env.local
```

- Replace `YOUR_EC2_PUBLIC_IP` with your actual EC2 public IP address
- Press `Ctrl+X`, then `Y`, then `Enter` to save

---

## STEP 6: Build the Application

```bash
# Build for production
npm run build
```

Wait for the build to complete (may take 2-3 minutes).

---

## STEP 7: Initialize Database

```bash
# Start the app temporarily
npm start &

# Wait 10 seconds
sleep 10

# Initialize database
curl -X POST http://localhost:3000/api/init-db

# You should see: {"success":true,"message":"Database tables initialized successfully"}

# Stop the temporary server
pkill node
```

---

## STEP 8: Set Up PM2 (Keep App Running)

```bash
# Install PM2
sudo npm install -g pm2

# Start application with PM2
pm2 start npm --name "pivotal-institute" -- start

# Configure PM2 to start on reboot
pm2 startup

# ⚠️ COPY AND RUN THE COMMAND THAT PM2 OUTPUTS!
# It will look like: sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user

# Save PM2 configuration
pm2 save

# Check status
pm2 status
```

You should see your app running!

---

## STEP 9: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/conf.d/pivotal-institute.conf
```

**Paste this content** (replace YOUR_EC2_PUBLIC_IP with your actual IP):

```nginx
server {
    listen 80;
    server_name YOUR_EC2_PUBLIC_IP;

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

Press `Ctrl+X`, then `Y`, then `Enter` to save.

```bash
# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx
```

---

## STEP 10: Open Your Website! 🎉

**In your browser, go to:**
```
http://YOUR_EC2_PUBLIC_IP
```

**Replace YOUR_EC2_PUBLIC_IP with your actual EC2 public IP address!**

---

## ✅ Verify Everything Works

1. Open the website
2. Click "Contact" in the menu
3. Fill out and submit the contact form
4. You should receive a confirmation email at the address you entered
5. JT should receive a notification email at jtremblay@jontremblay.com

---

## 📊 Useful Commands

### Check application status:
```bash
pm2 status
pm2 logs pivotal-institute
```

### Restart application:
```bash
pm2 restart pivotal-institute
```

### Check database records:
```bash
mysql -u pivotal_user -p pivotal_institute
# Password: Pivotal2023Secure!
```

```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5;
EXIT;
```

### View logs:
```bash
# Application logs
pm2 logs pivotal-institute

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## 🆘 Troubleshooting

### If something doesn't work:

```bash
# Check if app is running
pm2 status

# Check logs for errors
pm2 logs pivotal-institute --lines 50

# Check if MySQL is running
sudo systemctl status mysqld

# Check if Nginx is running
sudo systemctl status nginx

# Restart everything
pm2 restart pivotal-institute
sudo systemctl restart nginx
```

---

## 🔐 Security Note

**IMPORTANT:** Make sure your EC2 Security Group allows:
- Port 80 (HTTP) from anywhere (0.0.0.0/0)
- Port 443 (HTTPS) from anywhere (0.0.0.0/0)
- Port 22 (SSH) from your IP only

Check this in AWS Console → EC2 → Security Groups

---

**You're all set! Your website is now live! 🚀**


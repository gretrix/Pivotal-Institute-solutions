# AWS EC2 Deployment Guide

This guide will walk you through deploying the Pivotal Institute website to an AWS EC2 Linux instance.

---

## Prerequisites

- AWS Account
- Basic knowledge of SSH and Linux commands
- Domain name (optional, but recommended)

---

## Part 1: Launch EC2 Instance

### Step 1: Log into AWS Console

1. Go to https://aws.amazon.com/console/
2. Sign in to your AWS account
3. Navigate to EC2 service

### Step 2: Launch Instance

1. Click **"Launch Instance"**

2. **Name your instance:**
   - Name: `pivotal-institute-web`

3. **Choose Amazon Machine Image (AMI):**
   - Select: **Amazon Linux 2023** or **Ubuntu Server 22.04 LTS**
   - Keep it on 64-bit (x86)

4. **Choose Instance Type:**
   - Select: **t2.micro** (Free tier eligible) or **t2.small** (recommended for better performance)

5. **Key pair (login):**
   - Click "Create new key pair"
   - Name: `pivotal-institute-key`
   - Key pair type: RSA
   - Private key file format: `.pem` (for SSH)
   - Click "Create key pair"
   - **IMPORTANT:** Save the `.pem` file securely - you'll need it to connect to your server

6. **Network settings:**
   - Create security group allowing:
     - ✅ SSH (port 22) - from your IP
     - ✅ HTTP (port 80) - from anywhere (0.0.0.0/0)
     - ✅ HTTPS (port 443) - from anywhere (0.0.0.0/0)
     - ✅ Custom TCP (port 3000) - from anywhere (for testing)

7. **Configure storage:**
   - 20 GB gp3 (recommended)

8. Click **"Launch Instance"**

9. Wait for the instance to start (Status: Running)

10. **Note your Public IP address** - you'll need this

---

## Part 2: Connect to Your EC2 Instance

### On Windows (Using PowerShell):

```powershell
# Navigate to where you saved your .pem file
cd C:\path\to\your\key

# Set permissions (if needed)
icacls pivotal-institute-key.pem /inheritance:r
icacls pivotal-institute-key.pem /grant:r "$($env:USERNAME):(R)"

# Connect to EC2 (replace with your IP)
ssh -i pivotal-institute-key.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

### On Mac/Linux:

```bash
# Set correct permissions
chmod 400 pivotal-institute-key.pem

# Connect to EC2 (replace with your IP)
ssh -i pivotal-institute-key.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

**Note:** 
- For Amazon Linux, use: `ec2-user@YOUR_IP`
- For Ubuntu, use: `ubuntu@YOUR_IP`

---

## Part 3: Set Up the Server

### Step 1: Update System

```bash
# Update package manager
sudo yum update -y  # For Amazon Linux
# OR
sudo apt update && sudo apt upgrade -y  # For Ubuntu
```

### Step 2: Install Node.js

```bash
# Install Node.js 18.x (Amazon Linux)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# OR for Ubuntu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 3: Install MySQL

```bash
# For Amazon Linux
sudo yum install mysql-server -y
sudo systemctl start mysqld
sudo systemctl enable mysqld

# OR for Ubuntu
sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure MySQL installation
sudo mysql_secure_installation
```

Follow the prompts:
- Set root password: **YES** (choose a strong password)
- Remove anonymous users: **YES**
- Disallow root login remotely: **YES**
- Remove test database: **YES**
- Reload privilege tables: **YES**

### Step 4: Create Database

```bash
# Log into MySQL
sudo mysql -u root -p

# In MySQL prompt, run:
CREATE DATABASE pivotal_institute;
CREATE USER 'pivotal_user'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON pivotal_institute.* TO 'pivotal_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 5: Install Git

```bash
sudo yum install git -y  # Amazon Linux
# OR
sudo apt install git -y  # Ubuntu
```

---

## Part 4: Deploy the Application

### Step 1: Clone or Upload Your Code

**Option A: Using Git (Recommended)**

```bash
# Navigate to home directory
cd ~

# Clone your repository (if you have one)
git clone https://github.com/yourusername/pivotal-institute.git
cd pivotal-institute
```

**Option B: Upload Files Manually**

From your local machine:
```bash
# Upload the entire project (Windows PowerShell or Mac/Linux terminal)
scp -i pivotal-institute-key.pem -r /path/to/your/project ec2-user@YOUR_EC2_IP:~/pivotal-institute
```

### Step 2: Install Dependencies

```bash
cd ~/pivotal-institute
npm install
```

### Step 3: Set Up Environment Variables

```bash
# Create .env.local file
nano .env.local
```

Add the following content (press Ctrl+X, then Y, then Enter to save):

```env
# Database Configuration
DB_HOST=localhost
DB_USER=pivotal_user
DB_PASSWORD=your_strong_password
DB_NAME=pivotal_institute

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password
JT_EMAIL=jt@pivotalinstitute.com

# Site Configuration
SITE_URL=http://YOUR_EC2_PUBLIC_IP:3000
```

### Step 4: Build the Application

```bash
npm run build
```

### Step 5: Initialize the Database

```bash
# Start the application temporarily
npm start &

# Wait a few seconds, then initialize database
curl -X POST http://localhost:3000/api/init-db

# Stop the temporary server
pkill node
```

---

## Part 5: Set Up PM2 (Process Manager)

PM2 keeps your application running even after you disconnect from SSH.

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start your application with PM2
pm2 start npm --name "pivotal-institute" -- start

# Set PM2 to start on system reboot
pm2 startup
# Copy and run the command that PM2 outputs

# Save the PM2 process list
pm2 save

# View application status
pm2 status

# View logs
pm2 logs pivotal-institute
```

---

## Part 6: Set Up Nginx (Recommended for Production)

Nginx acts as a reverse proxy and allows you to use port 80 (HTTP) and 443 (HTTPS).

```bash
# Install Nginx
sudo yum install nginx -y  # Amazon Linux
# OR
sudo apt install nginx -y  # Ubuntu

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/conf.d/pivotal-institute.conf
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name YOUR_EC2_PUBLIC_IP;  # or your domain name

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

Save and exit (Ctrl+X, Y, Enter)

```bash
# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Part 7: Access Your Website

Open your browser and navigate to:

```
http://YOUR_EC2_PUBLIC_IP
```

You should see your Pivotal Institute website!

---

## Part 8: Set Up SSL/HTTPS (Recommended)

### If You Have a Domain Name:

```bash
# Install Certbot
sudo yum install certbot python3-certbot-nginx -y  # Amazon Linux
# OR
sudo apt install certbot python3-certbot-nginx -y  # Ubuntu

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts - Certbot will automatically configure Nginx for HTTPS
```

Certbot will automatically renew your certificate before it expires.

---

## Useful Commands

### Managing PM2

```bash
# View status
pm2 status

# View logs
pm2 logs pivotal-institute

# Restart application
pm2 restart pivotal-institute

# Stop application
pm2 stop pivotal-institute

# Delete from PM2
pm2 delete pivotal-institute
```

### Managing Nginx

```bash
# Check status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Reload Nginx (without downtime)
sudo systemctl reload nginx

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### Managing MySQL

```bash
# Log into MySQL
mysql -u pivotal_user -p pivotal_institute

# View contact submissions
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 10;
```

### Updating Your Application

```bash
# Navigate to project directory
cd ~/pivotal-institute

# Pull latest changes (if using Git)
git pull

# Install any new dependencies
npm install

# Rebuild application
npm run build

# Restart with PM2
pm2 restart pivotal-institute
```

---

## Troubleshooting

### Can't Connect to EC2

1. Check security group allows SSH (port 22) from your IP
2. Verify you're using the correct key pair
3. Make sure instance is running

### Website Not Loading

1. Check PM2 status: `pm2 status`
2. Check application logs: `pm2 logs pivotal-institute`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
4. Verify security group allows HTTP (port 80)

### Database Connection Errors

1. Verify MySQL is running: `sudo systemctl status mysqld`
2. Check database credentials in `.env.local`
3. Test database connection: `mysql -u pivotal_user -p pivotal_institute`

### Email Not Sending

1. Verify App Password is correct
2. Check application logs: `pm2 logs pivotal-institute`
3. Test email settings locally first

---

## Security Recommendations

1. ✅ **Change default ports** - Don't expose port 3000 publicly
2. ✅ **Use SSL/HTTPS** - Especially if collecting user data
3. ✅ **Restrict SSH access** - Only allow from your IP in security group
4. ✅ **Regular updates** - Keep system and packages updated
5. ✅ **Strong passwords** - Use strong passwords for database and server
6. ✅ **Backup regularly** - Set up automated database backups
7. ✅ **Use environment variables** - Never commit .env files to Git

---

## Optional: Set Up Domain Name

1. Purchase a domain from Route 53, Namecheap, GoDaddy, etc.
2. In AWS Route 53 (or your DNS provider):
   - Create an A record pointing to your EC2 public IP
3. Update Nginx configuration with your domain name
4. Get SSL certificate using Certbot (see Part 8)

---

## Cost Estimation

- **EC2 t2.micro:** ~$8-10/month (Free tier eligible for first year)
- **EC2 t2.small:** ~$17/month
- **Domain name:** ~$12/year
- **SSL certificate:** Free (Let's Encrypt)

---

## Next Steps

1. Test all functionality thoroughly
2. Set up automated backups
3. Configure monitoring and alerts
4. Set up staging environment
5. Document any custom configurations

---

## Support

For AWS-specific issues, refer to:
- AWS Documentation: https://docs.aws.amazon.com/
- AWS Support: https://console.aws.amazon.com/support/

For application issues, contact your development team.

---

## Congratulations! 🎉

Your Pivotal Institute website is now live on AWS EC2!


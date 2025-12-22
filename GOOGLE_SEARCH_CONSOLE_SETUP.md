# Google Search Console Setup Guide

## What Was Created

1. **Sitemap** (`/public/sitemap.xml`)
   - Lists all pages on your website
   - Includes priority and update frequency
   - Accessible at: https://pivotalinstitute.solutions/sitemap.xml

2. **Robots.txt** (`/public/robots.txt`)
   - Tells search engines which pages to crawl
   - References your sitemap location
   - Accessible at: https://pivotalinstitute.solutions/robots.txt

## Pages Included in Sitemap

- Homepage (/)
- About (/about)
- Contact (/contact)
- Policies (/policies)
- Programs Index (/programs)
- Healthcare Assistant Program (/programs/healthcare-assistant)
- IT Support Specialist Program (/programs/it-support-specialist)
- Business Administration Program (/programs/business-administration)
- Welding Technology Program (/programs/welding-technology)

## How to Submit to Google Search Console

### Step 1: Access Google Search Console
1. Go to https://search.google.com/search-console
2. Sign in with your Google account (use the same account as your Google Workspace)

### Step 2: Add Your Property
1. Click "Add Property" in the top left
2. Choose "URL prefix" option
3. Enter: `https://pivotalinstitute.solutions`
4. Click "Continue"

### Step 3: Verify Ownership
You have several verification options:

**Option A: HTML File Upload (Easiest)**
1. Google will provide an HTML verification file
2. Download the file
3. Upload it to your `/public` folder on the server
4. Access it at: `https://pivotalinstitute.solutions/google[verification-code].html`
5. Click "Verify" in Search Console

**Option B: DNS Verification (Recommended)**
1. Google will provide a TXT record
2. Add this TXT record to your domain's DNS settings (where you manage pivotalinstitute.solutions)
3. Wait a few minutes for DNS propagation
4. Click "Verify" in Search Console

**Option C: Google Analytics**
If you have Google Analytics installed, you can verify through that.

### Step 4: Submit Your Sitemap
1. Once verified, go to "Sitemaps" in the left sidebar
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Google will start crawling your site

### Step 5: Monitor Your Site
After submission, you can:
- Check indexing status (how many pages are indexed)
- View search performance (clicks, impressions, rankings)
- Identify and fix any crawl errors
- See which keywords bring traffic

## Expected Timeline

- **Verification**: Immediate
- **Sitemap Processing**: 1-2 days
- **Initial Indexing**: 3-7 days
- **Full Indexing**: 1-2 weeks
- **Ranking Improvements**: 2-4 weeks

## Additional SEO Tips

### 1. Request Indexing for Important Pages
After verification, you can request immediate indexing:
1. Go to "URL Inspection" tool
2. Enter a page URL (e.g., https://pivotalinstitute.solutions/)
3. Click "Request Indexing"
4. Repeat for key pages (homepage, programs, contact)

### 2. Monitor Performance
Check Search Console weekly to:
- See which pages are getting traffic
- Identify technical issues
- Track keyword rankings
- Monitor mobile usability

### 3. Optimize Your Content
Based on Search Console data:
- Add more content to pages with low impressions
- Improve titles and descriptions for pages with low click-through rates
- Fix any mobile usability issues

## Troubleshooting

### Sitemap Not Found
If Google says sitemap not found:
1. Verify the file exists: https://pivotalinstitute.solutions/sitemap.xml
2. Check file permissions on server
3. Rebuild and redeploy your Next.js app

### Verification Failed
If verification fails:
1. Make sure the verification file is in the `/public` folder
2. Rebuild and restart your app: `npm run build && pm2 restart pivotal-institute`
3. Clear your browser cache and try again

### Pages Not Indexed
If pages aren't being indexed:
1. Check robots.txt isn't blocking them
2. Ensure pages return 200 status code
3. Use "Request Indexing" tool for important pages
4. Wait 1-2 weeks for natural crawling

## Contact Information

If you need help with verification:
- Email: jtremblay@pivotalinstitute.solutions
- Phone: (404) 374-9322

## Next Steps After Setup

1. ✅ Deploy sitemap to production server
2. ✅ Verify ownership in Google Search Console
3. ✅ Submit sitemap
4. ✅ Request indexing for key pages
5. ✅ Set up email notifications for issues
6. ✅ Check back weekly to monitor performance

---

**Note**: The sitemap will be automatically accessible once you deploy these changes to your production server. No additional configuration needed!

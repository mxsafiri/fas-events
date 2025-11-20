# 🔗 Connect GitHub to Vercel - Auto Deploy Setup

This guide shows you how to connect your GitHub repository to Vercel for automatic deployments.

## ✨ Benefits of GitHub Integration

- 🚀 **Auto deploy** on every push to `main`
- 🔍 **Preview deployments** for pull requests
- 📊 **Deployment history** tracking
- 🔄 **Rollback** to previous versions easily
- 💬 **GitHub comments** with preview URLs

## 📋 Step-by-Step Setup

### 1️⃣ Go to Vercel Dashboard

Visit: [https://vercel.com/new](https://vercel.com/new)

Or:
1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**

### 2️⃣ Import GitHub Repository

1. Click **"Import Git Repository"**
2. If GitHub isn't connected:
   - Click **"Connect GitHub Account"**
   - Authorize Vercel to access your GitHub
   - Select repositories to grant access to

3. Find your repository: **`mxsafiri/fas-events`**
4. Click **"Import"**

### 3️⃣ Configure Project Settings

Vercel will auto-detect Next.js. Verify these settings:

**Project Settings:**
- **Project Name:** `fas-events` (or your preference)
- **Framework Preset:** Next.js ✅ (auto-detected)
- **Root Directory:** `./` (leave default)
- **Build Command:** `next build` ✅
- **Output Directory:** `.next` ✅
- **Install Command:** `npm install` ✅

**Build & Development Settings:**
- **Node.js Version:** 20.x (recommended)

### 4️⃣ Add Environment Variables

**CRITICAL:** Before deploying, add your database connection:

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** 
3. Enter:
   - **Key:** `DATABASE_URL`
   - **Value:** Your Neon PostgreSQL connection string
   - **Environments:** ✅ Production ✅ Preview ✅ Development
4. Click **"Add"**

**Your DATABASE_URL should look like:**
```
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/database_name?sslmode=require
```

### 5️⃣ Deploy

1. Click **"Deploy"** button
2. Wait for build (~2-3 minutes)
3. 🎉 Your app will be live!

### 6️⃣ Run Database Migration

After first deployment:

**Visit this URL in your browser:**
```
https://your-project-name.vercel.app/api/migrate
```

Or use curl:
```bash
curl https://your-project-name.vercel.app/api/migrate
```

**Expected response:**
```json
{
  "success": true,
  "message": "✅ Database migration completed successfully! All new wizard fields have been added."
}
```

### 7️⃣ Test Your Application

Visit your deployment URL and test:

- ✅ Homepage loads
- ✅ Click "Build Your Event"
- ✅ Complete wizard (all 8 steps)
- ✅ Submit test event
- ✅ Visit `/admin` portal
- ✅ Verify event data displays correctly
- ✅ Check menu and décor sections
- ✅ Test on mobile

## 🔄 Automatic Deployments

From now on:

### Production Deployments
```bash
git add .
git commit -m "Your changes"
git push origin main
```
→ Vercel automatically deploys to production! 🚀

### Preview Deployments
```bash
git checkout -b feature-branch
git add .
git commit -m "New feature"
git push origin feature-branch
```
→ Vercel creates a preview deployment with unique URL! 🔍

### Pull Request Deployments
- Create PR on GitHub
- Vercel comments with preview URL
- Test changes before merging
- Merge to `main` → Auto-deploy to production!

## 🎯 Your Deployment URLs

After setup, you'll have:

- **Production:** `https://fas-events.vercel.app`
- **Custom Domain:** Add in Settings → Domains (optional)
- **Preview Deployments:** Unique URLs for each branch/PR

## 🔧 Managing Your Project

### Vercel Dashboard

Access at: [https://vercel.com/dashboard](https://vercel.com/dashboard)

**Key Features:**
- **Deployments:** View history, logs, rollback
- **Settings:** Update env vars, domains
- **Analytics:** Track performance
- **Logs:** Debug issues
- **Domains:** Add custom domain

### Update Environment Variables

1. Go to Project → Settings → Environment Variables
2. Click on variable to edit
3. Update value
4. **Important:** Redeploy for changes to take effect
   - Go to Deployments
   - Click "..." on latest deployment
   - Select "Redeploy"

### View Logs

1. Go to Deployments
2. Click on any deployment
3. View build logs or runtime logs
4. Check for errors

### Rollback Deployment

1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## 🎨 Custom Domain Setup (Optional)

### Add Custom Domain

1. Purchase domain (Namecheap, GoDaddy, etc.)
2. In Vercel Dashboard:
   - Go to Project → Settings → Domains
   - Click "Add"
   - Enter your domain: `fasevents.com`
3. Configure DNS records (Vercel provides instructions)
4. Wait for SSL certificate (automatic, ~1 minute)

**DNS Configuration:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 📊 Monitoring

### Enable Vercel Analytics

1. Go to Project → Analytics
2. Click "Enable"
3. View:
   - Real User Monitoring
   - Web Vitals
   - Page views
   - Unique visitors

### Runtime Logs

```bash
# Install Vercel CLI
npm i -g vercel

# View live logs
vercel logs --follow
```

## 🐛 Troubleshooting

### Build Fails

**Check build logs:**
1. Go to failing deployment
2. View "Building" tab
3. Look for error messages

**Common issues:**
- TypeScript errors → Fix in code
- Missing dependencies → Check package.json
- Env variables missing → Add in Settings

### Database Connection Error

**Verify:**
- `DATABASE_URL` is set in Vercel
- Connection string ends with `?sslmode=require`
- Neon database is active
- No IP restrictions in Neon

### Site Not Updating

**Force redeploy:**
1. Go to Deployments
2. Click "..." on latest
3. Select "Redeploy"
4. Check "Use existing Build Cache" is OFF

## ✅ Success Checklist

After GitHub integration:

- [ ] Repository connected to Vercel
- [ ] `DATABASE_URL` environment variable set
- [ ] First deployment successful
- [ ] Database migration run
- [ ] Test event submitted successfully
- [ ] Admin portal shows all data
- [ ] Auto-deploy working (test with small commit)

## 🎉 You're All Set!

Your workflow is now:
1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Vercel automatically deploys!
5. Check deployment URL

**No more manual deployments needed!** 🚀

---

## Quick Reference

**Your Repository:** `mxsafiri/fas-events`  
**Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)  
**Deploy Command (if needed):** `vercel --prod`  
**Migration URL:** `https://your-app.vercel.app/api/migrate`  

Happy deploying! 🎊

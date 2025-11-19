# Vercel Deployment Guide - FAS Events

Complete guide to deploying your event management platform to Vercel.

## 📋 Pre-Deployment Checklist

✅ Code committed and pushed to GitHub  
✅ Database migration tested locally  
✅ All environment variables documented  
✅ Build tested locally (`npm run build`)  

## 🚀 Deployment Steps

### 1. Connect to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd "/Users/victormuhagachi/CascadeProjects/FAS Events/fasexclusive"
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `mxsafiri/fas-events`
4. Select the repository

### 2. Configure Project Settings

**Framework Preset:** Next.js (auto-detected)  
**Root Directory:** `./` (default)  
**Build Command:** `next build` (default)  
**Output Directory:** `.next` (default)  
**Install Command:** `npm install` (default)

### 3. Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

#### Required Variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `DATABASE_URL` | Your Neon PostgreSQL connection string | Production, Preview, Development |

**Example DATABASE_URL format:**
```
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/database_name?sslmode=require
```

#### Where to find your Neon connection string:
1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Go to Dashboard
4. Copy the connection string
5. Make sure it includes `?sslmode=require` at the end

### 4. Deploy

Click **"Deploy"** button in Vercel dashboard

Or run:
```bash
vercel --prod
```

### 5. Post-Deployment Steps

#### A. Run Database Migration

After first deployment, your database will auto-migrate on the first API call. To manually trigger it:

```bash
# Visit the migration endpoint
curl https://your-app.vercel.app/api/migrate
```

Or open in browser:
```
https://your-app.vercel.app/api/migrate
```

You should see:
```json
{
  "success": true,
  "message": "✅ Database migration completed successfully! All new wizard fields have been added."
}
```

#### B. Verify Schema

Check that all columns exist:
```
https://your-app.vercel.app/api/verify-schema
```

#### C. Test the Application

1. **Homepage:** `https://your-app.vercel.app`
2. **Event Wizard:** Click "Build Your Event" button
3. **Admin Portal:** `https://your-app.vercel.app/admin`
4. **Submit Test Event:** Complete the full wizard flow
5. **Verify Admin View:** Check event details in admin portal

## 🔧 Configuration Files

### vercel.json
Already created with optimal settings:
- Framework: Next.js
- Region: iad1 (US East)
- Environment variables configured
- Build commands set

### next.config.js
Ensure it's configured for production:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
```

## 📊 Database Considerations

### Neon PostgreSQL Setup

**Current Setup:**
- Database provider: Neon
- Connection: PostgreSQL with SSL
- Schema auto-migration on deployment

**Production Database:**
- Already configured in your project
- Connection pooling enabled via `pg` Pool
- SSL enabled with `rejectUnauthorized: false`

**Important Notes:**
- Neon automatically handles connection pooling
- No additional setup needed for serverless
- Database scales automatically with traffic

## 🎯 Custom Domain (Optional)

### Add Custom Domain

1. Go to Vercel Dashboard → Your Project
2. Settings → Domains
3. Add your domain (e.g., `fasevents.com`)
4. Follow DNS configuration instructions
5. Vercel auto-provisions SSL certificate

**Recommended DNS Setup:**
- Type: `CNAME`
- Name: `@` or `www`
- Value: `cname.vercel-dns.com`

## 🔐 Security Checklist

✅ Environment variables stored in Vercel (not in code)  
✅ Database connection uses SSL  
✅ API routes protected (add authentication if needed)  
✅ CORS configured properly  
✅ Rate limiting on API endpoints (consider adding)  

## 📈 Monitoring & Analytics

### Built-in Vercel Analytics

1. Go to Project → Analytics
2. Enable Web Vitals
3. Monitor:
   - Page load times
   - API response times
   - Error rates
   - User traffic

### Custom Monitoring

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

## 🐛 Troubleshooting

### Build Fails

**Check:**
- TypeScript errors: `npm run lint`
- Missing dependencies: `npm install`
- Build locally: `npm run build`

**Common Issues:**
- Missing environment variables
- Type errors in code
- Import path issues

### Database Connection Issues

**Error: "Connection refused"**
- ✅ Check DATABASE_URL is set in Vercel
- ✅ Verify Neon database is active
- ✅ Confirm SSL mode is enabled

**Error: "Too many connections"**
- Neon handles this automatically
- Check connection pooling in `lib/db.ts`

### Migration Doesn't Run

**Manual trigger:**
```bash
curl https://your-app.vercel.app/api/migrate
```

**Check logs:**
1. Vercel Dashboard → Your Project
2. Deployments → Latest Deployment
3. View Function Logs
4. Look for migration errors

### Images Not Loading

**Check:**
- Image paths are correct
- Public folder files are deployed
- Image optimization settings in `next.config.js`

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployments with unique URLs

### Manual Deployment

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## 📝 Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string from Neon |

## 🎉 Success Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] Event wizard opens and all steps work
- [ ] Form submissions save to database
- [ ] Admin portal displays event data
- [ ] Menu selections appear correctly
- [ ] Décor section with colors and images works
- [ ] Success modal shows tracking code
- [ ] Mobile responsive design works
- [ ] All images and assets load
- [ ] API endpoints respond properly

## 🚀 Going Live

### Final Steps:

1. **Test thoroughly** on Vercel preview URL
2. **Add custom domain** (if applicable)
3. **Update any hardcoded URLs** to production URL
4. **Enable analytics** and monitoring
5. **Document admin credentials** securely
6. **Create backup of database** before launch
7. **Announce launch** 🎊

## 📞 Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Neon Docs:** https://neon.tech/docs
- **Project Repository:** https://github.com/mxsafiri/fas-events

## 🎯 Quick Deploy Command

```bash
# One command deployment
vercel --prod
```

Your app will be live at: `https://your-project-name.vercel.app`

---

**Need help?** Check Vercel deployment logs for detailed error messages.

# Environment Variables

## Required Variables

### DATABASE_URL
**Description:** PostgreSQL connection string from Neon  
**Format:** `postgresql://username:password@host/database?sslmode=require`  
**Example:** `postgresql://user:pass@ep-xxx-xxx.region.aws.neon.tech/fasevents?sslmode=require`  
**Where to set:** Vercel Dashboard → Settings → Environment Variables  
**Environments:** Production, Preview, Development  

## How to Get Your DATABASE_URL

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Navigate to Dashboard
4. Copy the connection string
5. Ensure it ends with `?sslmode=require`

## Local Development

Create a `.env.local` file in the project root:

```bash
DATABASE_URL=your_neon_connection_string_here
```

**Important:** Never commit `.env.local` to git. It's already in `.gitignore`.

## Production (Vercel)

Set environment variables in Vercel Dashboard:

1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add `DATABASE_URL` with your Neon connection string
4. Select all environments: Production, Preview, Development
5. Click "Save"

## Verification

After setting environment variables, verify they're working:

```bash
# Local
npm run dev

# Visit http://localhost:3000/api/verify-schema
# Should show all database columns
```

## Security Notes

- ✅ Never commit environment variables to git
- ✅ Use different databases for dev/staging/production
- ✅ Rotate credentials periodically
- ✅ Use read-only credentials where possible
- ✅ Enable IP allowlisting in Neon (optional)

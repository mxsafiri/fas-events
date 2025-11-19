# Database Migration Guide

## Adding New Wizard Fields to event_requests Table

### What This Migration Does

Adds support for complete wizard data including:
- Event category (social/corporate)
- Menu selections (category + detailed items)
- Décor information (theme, colors, vision, images)

### New Columns Added

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| `event_category` | VARCHAR(50) | Event category: social or corporate |
| `menu_category` | VARCHAR(50) | Cuisine: swahili, asian, mediterranean, bbq |
| `menu_sections` | JSONB | Menu selections per section (appetizers, soups, etc.) |
| `decor_theme` | VARCHAR(50) | Theme: elegant, modern, traditional, etc. |
| `decor_vision` | TEXT | Client's décor vision description |
| `decor_colors` | JSONB | Array of 3 hex color codes |
| `inspiration_images` | JSONB | Array of image objects (base64 encoded) |

### How to Run the Migration

#### Option 1: Direct SQL Execution

1. Connect to your database
2. Run the migration file:

```bash
psql -h your-database-host -U your-username -d your-database-name -f database-migration-add-wizard-fields.sql
```

#### Option 2: Database GUI (e.g., pgAdmin, TablePlus)

1. Open your database connection
2. Copy the contents of `database-migration-add-wizard-fields.sql`
3. Execute the SQL in a query window

#### Option 3: Using Neon Dashboard

1. Go to https://console.neon.tech
2. Select your project
3. Go to SQL Editor
4. Paste and run the migration SQL

### Verification

After running the migration, verify all columns exist:

```sql
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'event_requests'
ORDER BY ordinal_position;
```

You should see all 7 new columns listed.

### Data Structure Examples

#### menu_sections (JSONB)
```json
{
  "appetizers": ["Samosas", "Bhajia"],
  "soups": ["Supu ya Maharage"],
  "salads": ["Kachumbari"],
  "grill": ["Mishkaki", "Nyama Choma"],
  "pot": ["Pilau", "Biryani"],
  "desserts": ["Kashata"]
}
```

#### decor_colors (JSONB)
```json
["#FFD700", "#FFFFFF", "#F5F5DC"]
```

#### inspiration_images (JSONB)
```json
[
  {
    "name": "wedding-decor-1.jpg",
    "data": "data:image/jpeg;base64,...",
    "type": "image/jpeg"
  }
]
```

### Rollback (if needed)

If you need to remove these columns:

```sql
ALTER TABLE event_requests 
  DROP COLUMN IF EXISTS event_category,
  DROP COLUMN IF EXISTS menu_category,
  DROP COLUMN IF EXISTS menu_sections,
  DROP COLUMN IF EXISTS decor_theme,
  DROP COLUMN IF EXISTS decor_vision,
  DROP COLUMN IF EXISTS decor_colors,
  DROP COLUMN IF EXISTS inspiration_images;
```

### After Migration

1. Restart your Next.js server
2. Test the event wizard by submitting a complete request
3. Check the admin portal to verify all data displays correctly

### Troubleshooting

**Error: relation "event_requests" does not exist**
- The table hasn't been created yet
- Run the initial table creation script first

**Error: column "xxx" already exists**
- Safe to ignore - the migration uses `IF NOT EXISTS`
- The column was already added

**Data not showing in admin portal**
- Clear your browser cache
- Verify the API is returning the new fields
- Check browser console for errors

### Support

If you encounter issues:
1. Check the API logs: `/api/event-requests`
2. Verify database connection
3. Ensure all environment variables are set correctly

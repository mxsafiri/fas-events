import { Pool } from 'pg'

// Create a connection pool to Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

// Helper to execute queries
export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result.rows
  } finally {
    client.release()
  }
}

// Helper to execute single query and return first row
export async function queryOne<T = any>(text: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(text, params)
  return rows[0] || null
}

// Generate unique tracking code for event requests
export function generateTrackingCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Exclude similar chars (I, O, 0, 1)
  let code = 'EVT-'
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// Initialize database schema
export async function initializeSchema() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // Site settings table (single row for hero/CTA config)
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        hero_title TEXT DEFAULT 'Build Your Event',
        hero_subtitle TEXT DEFAULT 'Build with your theme & budget',
        hero_cta_label TEXT DEFAULT 'Build Your Event with us',
        hero_media_type VARCHAR(10) DEFAULT 'video',
        hero_media_path TEXT DEFAULT '/SaveInsta.me_AQMzJWxKXsJT2wZC85yyKnkdl_D8lmyzRp6McELR_bmt5GFNmVzUkLGXpEeY63eAFYeAyGCj1ie2NpXXiVCU9UuQmufSiWkx4as7Se0.mp4',
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Insert default settings if table is empty
    await client.query(`
      INSERT INTO site_settings (id)
      SELECT 1
      WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE id = 1)
    `)

    // Carousel items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS carousel_items (
        id SERIAL PRIMARY KEY,
        title TEXT,
        subtitle TEXT,
        image_path TEXT NOT NULL,
        position INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Portfolio items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio_items (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image_path TEXT NOT NULL,
        event_date DATE,
        location TEXT,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Event requests table (from Event Wizard)
    await client.query(`
      CREATE TABLE IF NOT EXISTS event_requests (
        id SERIAL PRIMARY KEY,
        tracking_code VARCHAR(12) UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        event_type TEXT,
        event_date DATE,
        guest_count INTEGER,
        budget_range TEXT,
        venue TEXT,
        message TEXT,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Create index on tracking_code for fast lookups
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_event_requests_tracking_code 
      ON event_requests(tracking_code)
    `)

    await client.query('COMMIT')
    console.log('✅ Database schema initialized successfully')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('❌ Error initializing schema:', error)
    throw error
  } finally {
    client.release()
  }
}

export default pool

import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Add tracking_code column if it doesn't exist
    await query(`
      ALTER TABLE event_requests 
      ADD COLUMN IF NOT EXISTS tracking_code VARCHAR(12)
    `)

    // Create index
    await query(`
      CREATE INDEX IF NOT EXISTS idx_event_requests_tracking_code 
      ON event_requests(tracking_code)
    `)

    // Update existing rows with unique tracking codes
    const existingRows = await query('SELECT id FROM event_requests WHERE tracking_code IS NULL')
    
    for (const row of existingRows) {
      const code = `EVT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      await query('UPDATE event_requests SET tracking_code = $1 WHERE id = $2', [code, row.id])
    }

    // Add NOT NULL constraint after populating existing rows
    await query(`
      ALTER TABLE event_requests 
      ALTER COLUMN tracking_code SET NOT NULL
    `)

    // Add unique constraint
    await query(`
      ALTER TABLE event_requests 
      ADD CONSTRAINT event_requests_tracking_code_unique UNIQUE (tracking_code)
    `)

    return NextResponse.json({ 
      success: true, 
      message: 'Migration completed successfully',
      rowsUpdated: existingRows.length
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Migration failed' 
      },
      { status: 500 }
    )
  }
}

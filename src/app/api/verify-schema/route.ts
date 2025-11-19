import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const columns = await query(`
      SELECT 
        column_name, 
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'event_requests'
      ORDER BY ordinal_position
    `)
    
    return NextResponse.json({ 
      success: true, 
      columns,
      message: `Found ${columns.length} columns in event_requests table`
    })
  } catch (error) {
    console.error('Error verifying schema:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to verify schema' 
      },
      { status: 500 }
    )
  }
}

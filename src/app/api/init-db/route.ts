import { NextResponse } from 'next/server'
import { initializeSchema } from '@/lib/db'

export async function GET() {
  try {
    await initializeSchema()
    return NextResponse.json({ 
      success: true, 
      message: 'Database schema initialized successfully' 
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

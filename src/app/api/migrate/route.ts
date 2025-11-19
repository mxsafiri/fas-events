import { NextResponse } from 'next/server'
import { initializeSchema } from '@/lib/db'

export async function GET() {
  try {
    console.log('🚀 Running database migration...')
    await initializeSchema()
    
    return NextResponse.json({ 
      success: true, 
      message: '✅ Database migration completed successfully! All new wizard fields have been added.' 
    })
  } catch (error) {
    console.error('❌ Migration failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Migration failed' 
      },
      { status: 500 }
    )
  }
}

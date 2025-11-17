import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'

// GET - Track event by code
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')?.toUpperCase()

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Tracking code is required' },
        { status: 400 }
      )
    }

    const event = await queryOne(
      'SELECT * FROM event_requests WHERE tracking_code = $1',
      [code]
    )

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found. Please check your tracking code.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: event 
    })
  } catch (error) {
    console.error('Error tracking event:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to track event' 
      },
      { status: 500 }
    )
  }
}

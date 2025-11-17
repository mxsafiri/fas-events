import { NextRequest, NextResponse } from 'next/server'
import { query, generateTrackingCode } from '@/lib/db'

// POST - Create new event request from Event Wizard
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      eventType, 
      eventDate, 
      guestCount, 
      budgetRange, 
      venue, 
      message 
    } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Generate unique tracking code
    const trackingCode = generateTrackingCode()

    // Insert into database (convert empty strings to null for optional fields)
    const result = await query(
      `INSERT INTO event_requests 
       (tracking_code, name, email, phone, event_type, event_date, guest_count, budget_range, venue, message, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'new')
       RETURNING *`,
      [
        trackingCode,
        name, 
        email, 
        phone || null, 
        eventType || null, 
        eventDate || null,  // Convert empty string to null
        guestCount || null, 
        budgetRange || null, 
        venue || null, 
        message || null
      ]
    )

    return NextResponse.json({ 
      success: true, 
      data: result[0],
      trackingCode: trackingCode,
      message: 'Event request submitted successfully' 
    })
  } catch (error) {
    console.error('Error creating event request:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit request' 
      },
      { status: 500 }
    )
  }
}

// GET - Retrieve all event requests (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let queryText = 'SELECT * FROM event_requests'
    const params: any[] = []

    if (status) {
      queryText += ' WHERE status = $1'
      params.push(status)
    }

    queryText += ' ORDER BY created_at DESC'

    const requests = await query(queryText, params)

    return NextResponse.json({ 
      success: true, 
      data: requests 
    })
  } catch (error) {
    console.error('Error fetching event requests:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch requests' 
      },
      { status: 500 }
    )
  }
}

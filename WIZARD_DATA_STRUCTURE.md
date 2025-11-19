# Event Wizard - Complete Data Structure

This document outlines all data collected by the Event Wizard and sent to the admin portal.

## API Endpoint
`POST /api/event-requests`

## Complete Data Payload

### 1. Contact Information
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (required)",
  "message": "string (optional)"
}
```

### 2. Event Details
```json
{
  "eventCategory": "social | corporate (required)",
  "eventType": "string (required)",
  "eventDate": "YYYY-MM-DD (required)",
  "guestCount": "number (10-500, required)",
  "venue": "string (optional)",
  "budgetRange": "string (required)"
}
```

**Event Categories:**
- **Social Events**: wedding, sendoff, kitchen-party, engagement, birthday, anniversary, baby-shower, bridal-shower, graduation, reunion, other
- **Corporate Events**: conference, workshop, product-launch, networking, award-ceremony, corporate-retreat, agm, other

**Budget Ranges:**
- under-1m: Under TZS 1,000,000
- 1m-3m: TZS 1,000,000 - 3,000,000
- 3m-5m: TZS 3,000,000 - 5,000,000
- 5m-10m: TZS 5,000,000 - 10,000,000
- above-10m: Above TZS 10,000,000

### 3. Menu Information
```json
{
  "menuCategory": "swahili | asian | mediterranean | bbq (required)",
  "menuSections": {
    "appetizers": ["string array"],
    "soups": ["string array"],
    "salads": ["string array"],
    "grill": ["string array"],
    "pot": ["string array"],
    "desserts": ["string array"]
  }
}
```

### 4. Décor & Styling
```json
{
  "decorTheme": "elegant | modern | traditional | beach | garden | luxury | rustic | minimalist | null (optional)",
  "decorVision": "string (optional - long text description)",
  "decorColors": ["array of 3 hex color codes or empty array"],
  "inspirationImages": [
    {
      "name": "filename.jpg",
      "data": "base64 encoded image data",
      "type": "image/jpeg"
    }
  ]
}
```

**Décor Themes:**
- elegant: Elegant Classic
- modern: Modern Contemporary
- traditional: Traditional Cultural
- beach: Beach Coastal
- garden: Garden Rustic
- luxury: Luxury Glamorous
- rustic: Rustic Vintage
- minimalist: Minimalist Clean

**Color Palettes (Pre-defined):**
1. Gold & White: ['#FFD700', '#FFFFFF', '#F5F5DC']
2. Navy & Blush: ['#000080', '#FFB6C1', '#FFFFFF']
3. Emerald & Gold: ['#50C878', '#FFD700', '#FFFFFF']
4. Burgundy & Ivory: ['#800020', '#FFFFF0', '#C4A484']
5. Teal & Coral: ['#008080', '#FF7F50', '#FFFFFF']
6. Custom Colors: User-selected 3 hex codes

**Inspiration Images:**
- Maximum: 5 images
- Format: Base64 encoded
- Supported types: image/jpeg, image/png, image/jpg
- Max size per image: 10MB

## Example Complete Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+255 712 345 678",
  "message": "Looking forward to planning our special day!",
  
  "eventCategory": "social",
  "eventType": "wedding",
  "eventDate": "2025-12-15",
  "guestCount": 200,
  "venue": "Serena Hotel, Dar es Salaam",
  "budgetRange": "5m-10m",
  
  "menuCategory": "swahili",
  "menuSections": {
    "appetizers": ["Samosas", "Bhajia"],
    "soups": ["Supu ya Maharage"],
    "salads": ["Kachumbari"],
    "grill": ["Mishkaki", "Nyama Choma"],
    "pot": ["Pilau", "Biryani"],
    "desserts": ["Kashata", "Mkate wa Ufuta"]
  },
  
  "decorTheme": "elegant",
  "decorVision": "We want a romantic, elegant atmosphere with lots of flowers and soft lighting. Gold accents throughout.",
  "decorColors": ["#FFD700", "#FFFFFF", "#F5F5DC"],
  "inspirationImages": [
    {
      "name": "wedding-inspiration-1.jpg",
      "data": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
      "type": "image/jpeg"
    }
  ]
}
```

## Data Storage Recommendations

### Database Schema Suggestion

```sql
CREATE TABLE event_requests (
  id SERIAL PRIMARY KEY,
  tracking_code VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Contact
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT,
  
  -- Event Details
  event_category VARCHAR(50) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  guest_count INTEGER NOT NULL,
  venue VARCHAR(500),
  budget_range VARCHAR(50) NOT NULL,
  
  -- Menu
  menu_category VARCHAR(50) NOT NULL,
  menu_sections JSONB,
  
  -- Décor
  decor_theme VARCHAR(50),
  decor_vision TEXT,
  decor_colors JSONB,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending',
  admin_notes TEXT
);

CREATE TABLE event_inspiration_images (
  id SERIAL PRIMARY KEY,
  event_request_id INTEGER REFERENCES event_requests(id),
  filename VARCHAR(255),
  file_data TEXT,
  file_type VARCHAR(100),
  uploaded_at TIMESTAMP DEFAULT NOW()
);
```

## Admin Portal Display

The admin portal should display all this information in organized sections:

1. **Overview Card**
   - Tracking Code
   - Status Badge
   - Event Type & Date
   - Guest Count

2. **Contact Details**
   - Name, Email, Phone
   - Client Message

3. **Event Configuration**
   - Category & Type
   - Date & Venue
   - Guest Count
   - Budget Range

4. **Menu Selections**
   - Cuisine Category
   - Selected Items by Section (collapsible)
   - Total Items Count

5. **Décor & Styling**
   - Theme Selection
   - Color Palette (visual swatches)
   - Décor Vision Text
   - Inspiration Images Gallery

6. **Actions**
   - Update Status
   - Add Admin Notes
   - Send Email to Client
   - Export as PDF
   - Print Quote

## Status Flow

- **pending**: Initial submission
- **reviewing**: Admin is reviewing
- **quoted**: Quote sent to client
- **confirmed**: Client confirmed
- **in-progress**: Event planning underway
- **completed**: Event finished
- **cancelled**: Cancelled by client

## Notifications

Send email notifications to admin when:
- New event request submitted
- All required fields filled
- Images uploaded
- Budget range selected

Send email to client with:
- Tracking code
- Confirmation of submission
- Next steps
- Admin contact info

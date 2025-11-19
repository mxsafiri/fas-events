-- Add new columns to event_requests table for complete wizard data
-- Run this migration to support menu and décor information

-- Add event category column
ALTER TABLE event_requests 
ADD COLUMN IF NOT EXISTS event_category VARCHAR(50);

-- Add menu columns
ALTER TABLE event_requests 
ADD COLUMN IF NOT EXISTS menu_category VARCHAR(50);

ALTER TABLE event_requests 
ADD COLUMN IF NOT EXISTS menu_sections JSONB;

-- Add décor columns
ALTER TABLE event_requests 
ADD COLUMN IF NOT EXISTS decor_theme VARCHAR(50);

ALTER TABLE event_requests 
ADD COLUMN IF NOT EXISTS decor_vision TEXT;

ALTER TABLE event_requests 
ADD COLUMN IF NOT EXISTS decor_colors JSONB;

ALTER TABLE event_requests 
ADD COLUMN IF NOT EXISTS inspiration_images JSONB;

-- Add comments for documentation
COMMENT ON COLUMN event_requests.event_category IS 'Event category: social or corporate';
COMMENT ON COLUMN event_requests.menu_category IS 'Cuisine category: swahili, asian, mediterranean, bbq';
COMMENT ON COLUMN event_requests.menu_sections IS 'JSON object with menu selections per section';
COMMENT ON COLUMN event_requests.decor_theme IS 'Décor theme: elegant, modern, traditional, etc.';
COMMENT ON COLUMN event_requests.decor_vision IS 'Client''s décor vision description';
COMMENT ON COLUMN event_requests.decor_colors IS 'JSON array of 3 hex color codes';
COMMENT ON COLUMN event_requests.inspiration_images IS 'JSON array of image objects with name, data, type';

-- Verify migration
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'event_requests'
ORDER BY ordinal_position;

export interface FormData {
  // Event Basics
  eventCategory: 'social' | 'corporate' | ''
  eventType: string
  eventDate: string
  guestCount: string
  venue: string
  needVenue: boolean
  
  // Contact
  name: string
  email: string
  phone: string
  
  // Menu
  menuCategory: string
  menuPreferences: string
  
  // Décor
  theme: string
  colorScheme: {
    primary: string
    secondary: string
    accent: string
  }
  inspirationImages: File[]
  vision: string
  
  specialRequests: string
}

export const socialEvents = [
  { name: 'Wedding', emoji: '💒' },
  { name: 'Sendoff', emoji: '✈️' },
  { name: 'Kitchen Party', emoji: '👰' },
  { name: 'Engagement', emoji: '💍' },
  { name: 'Birthday', emoji: '🎂' },
  { name: 'Anniversary', emoji: '🎊' },
  { name: 'Baby Shower', emoji: '👶' },
  { name: 'Bridal Shower', emoji: '💐' },
  { name: 'Graduation', emoji: '🎓' },
  { name: 'Reunion', emoji: '👨‍👩‍👧‍👦' },
]

export const corporateEvents = [
  { name: 'Conference', emoji: '🎤' },
  { name: 'Workshop', emoji: '📚' },
  { name: 'Product Launch', emoji: '🚀' },
  { name: 'Networking', emoji: '🤝' },
  { name: 'Award Ceremony', emoji: '🏆' },
  { name: 'Team Building', emoji: '🎯' },
  { name: 'AGM', emoji: '📊' },
  { name: 'Seminar', emoji: '💼' },
]

export const menuCategories = [
  { name: 'Swahili Cuisine', emoji: '🍛', description: 'East African Coastal flavors', popular: true },
  { name: 'Asian Cuisine', emoji: '🍜', description: 'Oriental delights' },
  { name: 'Mediterranean', emoji: '🥗', description: 'Fresh & healthy options' },
  { name: 'BBQ Menu', emoji: '🍖', description: 'Grilled perfection' },
]

export const themes = [
  { name: 'Floral Garden', emoji: '🌸', colors: ['#FFB6C1', '#FFF0F5', '#90EE90'] },
  { name: 'Elegant Classic', emoji: '⭐', colors: ['#FFD700', '#FFFFFF', '#000000'] },
  { name: 'Beach Tropical', emoji: '🌊', colors: ['#40E0D0', '#FF7F50', '#F0E68C'] },
  { name: 'Traditional', emoji: '🎭', colors: ['#8B4513', '#FFD700', '#006400'] },
  { name: 'Modern Minimalist', emoji: '🌙', colors: ['#F5F5F5', '#2C3E50', '#ECF0F1'] },
  { name: 'Custom', emoji: '✨', colors: [] },
]

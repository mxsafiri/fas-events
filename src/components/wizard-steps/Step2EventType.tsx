'use client'

import { motion } from 'framer-motion'
import { Heart, Plane, ChefHat, Gem, Cake, Gift, Baby, Crown, GraduationCap, Users, Mic, BookOpen, Rocket, Handshake, Trophy, Mountain, PieChart, MoreHorizontal } from 'lucide-react'
import { Card } from '@/components/ui/card'

type EventCategory = 'social' | 'corporate'
type SocialEventType = 'wedding' | 'sendoff' | 'kitchen-party' | 'engagement' | 'birthday' | 'anniversary' | 'baby-shower' | 'bridal-shower' | 'graduation' | 'reunion' | 'other'
type CorporateEventType = 'conference' | 'workshop' | 'product-launch' | 'networking' | 'award-ceremony' | 'corporate-retreat' | 'agm' | 'other'

interface Props {
  category: EventCategory | null
  selected: SocialEventType | CorporateEventType | null
  onSelect: (type: SocialEventType | CorporateEventType) => void
}

export default function Step2EventType({ category, selected, onSelect }: Props) {
  const socialEvents = [
    { id: 'wedding', name: 'Weddings', Icon: Heart },
    { id: 'sendoff', name: 'Sendoffs', Icon: Plane },
    { id: 'kitchen-party', name: 'Kitchen Party', Icon: ChefHat },
    { id: 'engagement', name: 'Engagement Parties', Icon: Gem },
    { id: 'birthday', name: 'Birthdays', Icon: Cake },
    { id: 'anniversary', name: 'Anniversaries', Icon: Gift },
    { id: 'baby-shower', name: 'Baby Showers / Gender Reveals', Icon: Baby },
    { id: 'bridal-shower', name: 'Bridal Shower', Icon: Crown },
    { id: 'graduation', name: 'Graduation Parties', Icon: GraduationCap },
    { id: 'reunion', name: 'Reunions', Icon: Users },
    { id: 'other', name: 'Other Social Event', Icon: MoreHorizontal },
  ]

  const corporateEvents = [
    { id: 'conference', name: 'Conferences and Seminars', Icon: Mic },
    { id: 'workshop', name: 'Workshops and Training', Icon: BookOpen },
    { id: 'product-launch', name: 'Product Launches', Icon: Rocket },
    { id: 'networking', name: 'Networking Events', Icon: Handshake },
    { id: 'award-ceremony', name: 'Award Ceremonies', Icon: Trophy },
    { id: 'corporate-retreat', name: 'Corporate Retreats', Icon: Mountain },
    { id: 'agm', name: 'Annual General Meetings', Icon: PieChart },
    { id: 'other', name: 'Other Corporate Event', Icon: MoreHorizontal },
  ]

  const events = category === 'social' ? socialEvents : corporateEvents

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {category === 'social' ? 'Choose Your Celebration' : 'Choose Your Event'}
        </h2>
        <p className="text-gray-600">What specific event are you planning?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
        {events.map((event) => {
          const isSelected = selected === event.id
          return (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                onClick={() => onSelect(event.id as any)}
                className={`p-4 cursor-pointer transition-all border-2 bg-white ${
                  isSelected
                    ? 'border-[var(--brand-green)] bg-[var(--brand-green)]/5 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[var(--brand-green)]' : 'bg-gray-100'
                    }`}
                  >
                    <event.Icon className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-tight">{event.name}</p>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

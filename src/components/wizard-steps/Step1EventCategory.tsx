'use client'

import { motion } from 'framer-motion'
import { PartyPopper, Briefcase } from 'lucide-react'
import { Card } from '@/components/ui/card'

type EventCategory = 'social' | 'corporate'

interface Props {
  selected: EventCategory | null
  onSelect: (category: EventCategory) => void
}

export default function Step1EventCategory({ selected, onSelect }: Props) {
  const categories = [
    {
      id: 'social' as EventCategory,
      name: 'Social Events',
      desc: 'Weddings, birthdays, celebrations',
      Icon: PartyPopper,
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      id: 'corporate' as EventCategory,
      name: 'Corporate Events',
      desc: 'Conferences, workshops, launches',
      Icon: Briefcase,
      gradient: 'from-blue-500 to-cyan-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">What type of event?</h2>
        <p className="text-gray-600">Choose your event category</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {categories.map((cat) => {
          const isSelected = selected === cat.id
          return (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                onClick={() => onSelect(cat.id)}
                className={`p-8 cursor-pointer transition-all border-2 bg-white ${
                  isSelected
                    ? 'border-[var(--brand-green)] bg-[var(--brand-green)]/5 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}
                  >
                    <cat.Icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{cat.name}</h3>
                    <p className="text-sm text-gray-600">{cat.desc}</p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 rounded-full bg-[var(--brand-green)] flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

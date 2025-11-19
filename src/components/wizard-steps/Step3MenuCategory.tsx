'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'

type MenuCategory = 'swahili' | 'asian' | 'mediterranean' | 'bbq'

interface Props {
  selected: MenuCategory | null
  onSelect: (category: MenuCategory) => void
}

export default function Step3MenuCategory({ selected, onSelect }: Props) {
  const categories = [
    {
      id: 'swahili' as MenuCategory,
      name: 'Swahili Cuisine',
      desc: 'East African Coastal Flavors',
      gradient: 'from-amber-500 to-orange-600',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    },
    {
      id: 'asian' as MenuCategory,
      name: 'Asian Cuisine',
      desc: 'Oriental Delights',
      gradient: 'from-red-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=80',
    },
    {
      id: 'mediterranean' as MenuCategory,
      name: 'Mediterranean',
      desc: 'Fresh & Healthy Options',
      gradient: 'from-blue-500 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    },
    {
      id: 'bbq' as MenuCategory,
      name: 'BBQ Menu',
      desc: 'Grilled Perfection',
      gradient: 'from-orange-600 to-red-700',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Menu Category</h2>
        <p className="text-gray-600">Select your preferred cuisine style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
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
                className={`relative overflow-hidden cursor-pointer transition-all border-2 ${
                  isSelected
                    ? 'border-[var(--brand-green)] shadow-xl ring-2 ring-[var(--brand-green)]/20'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                {/* Food Image Background */}
                <div className="h-48 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-80`} />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-black/30" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center px-4">
                      <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">{cat.name}</h3>
                      <p className="text-sm opacity-90 drop-shadow-md">{cat.desc}</p>
                    </div>
                  </div>
                  
                  {/* Checkmark */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                    >
                      <Check className="w-6 h-6 text-[var(--brand-green)]" />
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

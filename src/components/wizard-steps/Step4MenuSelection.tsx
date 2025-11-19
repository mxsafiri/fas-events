'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ChefHat, Soup, Salad, Flame, CookingPot, IceCream } from 'lucide-react'
import { menuData } from '@/data/menuData'

type MenuSection = 'appetizers' | 'soups' | 'salads' | 'grill' | 'pot' | 'desserts'

interface Props {
  menuSections: Record<MenuSection, string[]>
  onUpdate: (section: MenuSection, items: string[]) => void
}

export default function Step4MenuSelection({ menuSections, onUpdate }: Props) {
  const [activeSection, setActiveSection] = useState<MenuSection>('appetizers')

  const sections = [
    { id: 'appetizers' as MenuSection, name: 'Appetizers', Icon: ChefHat, emoji: '🥟' },
    { id: 'soups' as MenuSection, name: 'Soups', Icon: Soup, emoji: '🍲' },
    { id: 'salads' as MenuSection, name: 'Salads', Icon: Salad, emoji: '🥗' },
    { id: 'grill' as MenuSection, name: 'Live Grill', Icon: Flame, emoji: '🔥' },
    { id: 'pot' as MenuSection, name: 'From the Pot', Icon: CookingPot, emoji: '🍲' },
    { id: 'desserts' as MenuSection, name: 'Desserts', Icon: IceCream, emoji: '🍬' },
  ]

  const toggleItem = (section: MenuSection, item: string) => {
    const current = menuSections[section]
    if (current.includes(item)) {
      onUpdate(section, current.filter((i) => i !== item))
    } else {
      onUpdate(section, [...current, item])
    }
  }

  const totalSelected = Object.values(menuSections).reduce((sum, items) => sum + items.length, 0)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Customize Your Menu</h2>
        <p className="text-gray-600">Select items from each section</p>
        <Badge variant="secondary" className="mt-2">
          {totalSelected} items selected
        </Badge>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map((section) => {
          const count = menuSections[section.id].length
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? 'bg-[var(--brand-green)] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <section.Icon className="w-4 h-4" />
              {section.name}
              {count > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeSection === section.id ? 'bg-white/20' : 'bg-[var(--brand-green)] text-white'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Menu Items Grid */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto"
      >
        {menuData[activeSection].map((item) => {
          const isSelected = menuSections[activeSection].includes(item)
          return (
            <Card
              key={item}
              onClick={() => toggleItem(activeSection, item)}
              className={`p-4 cursor-pointer transition-all border-2 bg-white ${
                isSelected
                  ? 'border-[var(--brand-green)] bg-[var(--brand-green)]/5'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox checked={isSelected} onCheckedChange={() => {}} className="mt-1" />
                <p className="text-sm text-gray-900 leading-relaxed flex-1">{item}</p>
              </div>
            </Card>
          )
        })}
      </motion.div>

      {menuData[activeSection].length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No items available in this section</p>
        </div>
      )}
    </div>
  )
}

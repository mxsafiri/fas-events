'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Users, Mail, Phone, MapPin, DollarSign, Utensils } from 'lucide-react'

type MenuSection = 'appetizers' | 'soups' | 'salads' | 'grill' | 'pot' | 'desserts'

interface Props {
  data: {
    eventCategory: string | null
    eventType: string | null
    guestCount: number
    menuCategory: string | null
    menuSections: Record<MenuSection, string[]>
    date: string
    venue: string
    name: string
    email: string
    phone: string
    budget: string
  }
  onBudgetChange: (budget: string) => void
}

export default function Step7Review({ data, onBudgetChange }: Props) {
  const totalMenuItems = Object.values(data.menuSections).reduce((sum, items) => sum + items.length, 0)

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Event</h2>
        <p className="text-gray-600">Confirm your details before submitting</p>
      </div>

      {/* Budget Selection - Prominent Card */}
      <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[var(--brand-green)] flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <Label className="text-xl font-bold text-gray-900">
              Budget Range <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-gray-600">Select your estimated event budget</p>
          </div>
        </div>
        <Select value={data.budget} onValueChange={onBudgetChange}>
          <SelectTrigger className="h-14 text-base font-medium border-2 border-gray-300 bg-white hover:border-[var(--brand-green)] transition-colors">
            <SelectValue placeholder="Click to select your budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-1m" className="text-base py-3">
              Under TZS 1,000,000
            </SelectItem>
            <SelectItem value="1m-3m" className="text-base py-3">
              TZS 1,000,000 - 3,000,000
            </SelectItem>
            <SelectItem value="3m-5m" className="text-base py-3">
              TZS 3,000,000 - 5,000,000
            </SelectItem>
            <SelectItem value="5m-10m" className="text-base py-3">
              TZS 5,000,000 - 10,000,000
            </SelectItem>
            <SelectItem value="above-10m" className="text-base py-3">
              Above TZS 10,000,000
            </SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Event Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span>Event Details</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 capitalize">
              {data.eventType?.replace('-', ' ')}
            </p>
            <p className="text-sm text-gray-600">
              {data.date ? new Date(data.date).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              }) : 'Date not set'}
            </p>
          </div>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Users className="w-4 h-4" />
            <span>Guests & Location</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{data.guestCount} Guests</p>
            <p className="text-sm text-gray-600">{data.venue || 'Venue TBD'}</p>
          </div>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Utensils className="w-4 h-4" />
            <span>Menu Selection</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 capitalize">
              {data.menuCategory} Cuisine
            </p>
            <p className="text-sm text-gray-600">{totalMenuItems} items selected</p>
          </div>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{data.name}</p>
            <p className="text-sm text-gray-600">{data.email}</p>
            <p className="text-sm text-gray-600">{data.phone}</p>
          </div>
        </Card>
      </div>

      {/* Menu Sections Summary */}
      {totalMenuItems > 0 && (
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-[var(--brand-green)]" />
            Selected Menu Items
          </h3>
          <div className="space-y-3">
            {Object.entries(data.menuSections).map(([section, items]) => {
              if (items.length === 0) return null
              return (
                <div key={section} className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 capitalize">{section}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Badge key={item} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}

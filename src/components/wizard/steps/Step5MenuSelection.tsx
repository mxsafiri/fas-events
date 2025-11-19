'use client'

import type { FormData as EventFormData } from '../types'

interface Step5Props {
  formData: EventFormData
  updateFormData: (data: Partial<EventFormData>) => void
}

export default function Step5MenuSelection({ formData, updateFormData }: Step5Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Customize Your Menu</h2>
        <p className="text-gray-600">{formData.menuCategory} selections</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          💭 Tell us about your menu preferences
        </label>
        <textarea
          value={formData.menuPreferences}
          onChange={(e) => updateFormData({ menuPreferences: e.target.value })}
          placeholder="Share your menu preferences, dietary restrictions, favorite dishes, and special requests...

Examples:
• We'd like appetizers, main course, and dessert for 100 guests
• Vegetarian options needed for 20 guests
• Prefer grilled chicken and pilau rice
• No seafood please
• Traditional Swahili dishes preferred"
          rows={10}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all resize-none"
        />
        <p className="text-sm text-gray-500 mt-2">
          ℹ️ Our culinary team will contact you to finalize your detailed menu selections
        </p>
      </div>
    </div>
  )
}

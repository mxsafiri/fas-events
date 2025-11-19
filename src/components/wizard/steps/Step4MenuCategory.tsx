'use client'

import type { FormData as EventFormData } from '../types'
import { menuCategories } from '../types'

interface Step4Props {
  formData: EventFormData
  updateFormData: (data: Partial<EventFormData>) => void
}

export default function Step4MenuCategory({ formData, updateFormData }: Step4Props) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Menu Style 🍽️</h2>
        <p className="text-gray-600">Select the cuisine that matches your event</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {menuCategories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => updateFormData({ menuCategory: category.name })}
            className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              formData.menuCategory === category.name
                ? 'border-emerald-500 bg-emerald-50 shadow-xl'
                : 'border-gray-200 hover:border-emerald-300 bg-white'
            }`}
          >
            {category.popular && (
              <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                ⭐ Popular
              </span>
            )}
            <div className="text-6xl mb-4">{category.emoji}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-gray-600">{category.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

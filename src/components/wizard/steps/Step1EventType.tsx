'use client'

import type { FormData as EventFormData, socialEvents as socialEventsType, corporateEvents as corporateEventsType } from '../types'
import { socialEvents, corporateEvents } from '../types'

interface Step1Props {
  formData: EventFormData
  updateFormData: (data: Partial<EventFormData>) => void
}

export default function Step1EventType({ formData, updateFormData }: Step1Props) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">What type of event are you planning?</h2>
        <p className="text-gray-600">Choose the category that best fits your occasion</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => updateFormData({ eventCategory: 'social', eventType: '' })}
          className={`group p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
            formData.eventCategory === 'social'
              ? 'border-emerald-500 bg-emerald-50 shadow-xl'
              : 'border-gray-200 hover:border-emerald-300 bg-white'
          }`}
        >
          <div className="text-6xl mb-4">🎊</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Social Events</h3>
          <p className="text-gray-600 text-sm">Weddings, birthdays, celebrations</p>
        </button>
        
        <button
          type="button"
          onClick={() => updateFormData({ eventCategory: 'corporate', eventType: '' })}
          className={`group p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
            formData.eventCategory === 'corporate'
              ? 'border-emerald-500 bg-emerald-50 shadow-xl'
              : 'border-gray-200 hover:border-emerald-300 bg-white'
          }`}
        >
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Corporate Events</h3>
          <p className="text-gray-600 text-sm">Conferences, workshops, launches</p>
        </button>
      </div>

      {/* Specific Event Type Selection */}
      {formData.eventCategory && (
        <div className="mt-8 animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Your Event Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {(formData.eventCategory === 'social' ? socialEvents : corporateEvents).map((event) => (
              <button
                key={event.name}
                type="button"
                onClick={() => updateFormData({ eventType: event.name })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  formData.eventType === event.name
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : 'border-gray-200 hover:border-emerald-300 bg-white'
                }`}
              >
                <div className="text-3xl mb-2">{event.emoji}</div>
                <span className="text-sm font-semibold text-gray-900">{event.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

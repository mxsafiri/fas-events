'use client'

import type { FormData as EventFormData } from '../types'

interface Step2Props {
  formData: EventFormData
  updateFormData: (data: Partial<EventFormData>) => void
}

export default function Step2EventDetails({ formData, updateFormData }: Step2Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Event Details</h2>
        <p className="text-gray-600">Tell us more about your {formData.eventType}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Event Date</label>
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) => updateFormData({ eventDate: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">👥 Expected Guests</label>
          <select
            value={formData.guestCount}
            onChange={(e) => updateFormData({ guestCount: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
            required
          >
            <option value="">Select guest count</option>
            <option value="1-50">1-50 guests</option>
            <option value="50-100">50-100 guests</option>
            <option value="100-200">100-200 guests</option>
            <option value="200-300">200-300 guests</option>
            <option value="300+">300+ guests</option>
          </select>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <label className="block text-sm font-semibold text-gray-700 mb-2">📍 Venue</label>
        <div className="space-y-3">
          <label className="flex items-center p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-emerald-300 transition-all">
            <input
              type="radio"
              name="venue"
              checked={!formData.needVenue}
              onChange={() => updateFormData({ needVenue: false })}
              className="w-5 h-5 text-emerald-600"
            />
            <span className="ml-3 font-medium text-gray-900">I have a venue</span>
          </label>
          <label className="flex items-center p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-emerald-300 transition-all">
            <input
              type="radio"
              name="venue"
              checked={formData.needVenue}
              onChange={() => updateFormData({ needVenue: true })}
              className="w-5 h-5 text-emerald-600"
            />
            <span className="ml-3 font-medium text-gray-900">I need venue assistance</span>
          </label>
        </div>
        {!formData.needVenue && (
          <input
            type="text"
            value={formData.venue}
            onChange={(e) => updateFormData({ venue: e.target.value })}
            placeholder="Enter venue address or name"
            className="w-full mt-3 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
          />
        )}
      </div>
    </div>
  )
}

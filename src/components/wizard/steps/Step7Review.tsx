'use client'

import type { FormData as EventFormData } from '../types'
import { CheckCircle } from 'lucide-react'

interface Step7Props {
  formData: EventFormData
}

export default function Step7Review({ formData }: Step7Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Review Your Event Request</h2>
        <p className="text-gray-600">Please review your information before submitting</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Event Details */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            🎉 Event Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Category:</span>
              <p className="font-semibold text-gray-900 capitalize">{formData.eventCategory} Event</p>
            </div>
            <div>
              <span className="text-gray-600">Type:</span>
              <p className="font-semibold text-gray-900">{formData.eventType}</p>
            </div>
            <div>
              <span className="text-gray-600">Date:</span>
              <p className="font-semibold text-gray-900">{formData.eventDate}</p>
            </div>
            <div>
              <span className="text-gray-600">Guests:</span>
              <p className="font-semibold text-gray-900">{formData.guestCount}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Venue:</span>
              <p className="font-semibold text-gray-900">
                {formData.needVenue ? 'Need venue assistance' : formData.venue}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            👤 Contact Information
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-600">Name:</span> <span className="font-semibold text-gray-900">{formData.name}</span></p>
            <p><span className="text-gray-600">Email:</span> <span className="font-semibold text-gray-900">{formData.email}</span></p>
            <p><span className="text-gray-600">Phone:</span> <span className="font-semibold text-gray-900">{formData.phone}</span></p>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            🍽️ Menu Selection
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-600">Cuisine:</span> <span className="font-semibold text-gray-900">{formData.menuCategory}</span></p>
            {formData.menuPreferences && (
              <div>
                <span className="text-gray-600">Preferences:</span>
                <p className="font-medium text-gray-900 mt-1 whitespace-pre-wrap">{formData.menuPreferences}</p>
              </div>
            )}
          </div>
        </div>

        {/* Décor */}
        {formData.theme && (
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              🎨 Décor & Styling
            </h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-600">Theme:</span> <span className="font-semibold text-gray-900">{formData.theme}</span></p>
              {formData.inspirationImages.length > 0 && (
                <p><span className="text-gray-600">Inspiration Images:</span> <span className="font-semibold text-gray-900">{formData.inspirationImages.length} uploaded</span></p>
              )}
              {formData.vision && (
                <div>
                  <span className="text-gray-600">Vision:</span>
                  <p className="font-medium text-gray-900 mt-1 whitespace-pre-wrap">{formData.vision}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Special Requests */}
        {formData.specialRequests && (
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Special Requests</h3>
            <p className="text-sm font-medium text-gray-900 whitespace-pre-wrap">{formData.specialRequests}</p>
          </div>
        )}

        {/* Confirmation Note */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <p className="text-sm text-emerald-800">
            ✨ By submitting this request, our team will review your requirements and contact you within 24 hours with a detailed proposal and quote.
          </p>
        </div>
      </div>
    </div>
  )
}

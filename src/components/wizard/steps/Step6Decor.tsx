'use client'

import type { FormData as EventFormData } from '../types'
import { themes } from '../types'
import { Upload, X } from 'lucide-react'

interface Step6Props {
  formData: EventFormData
  updateFormData: (data: Partial<EventFormData>) => void
}

export default function Step6Decor({ formData, updateFormData }: Step6Props) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (formData.inspirationImages.length + files.length <= 5) {
      updateFormData({ inspirationImages: [...formData.inspirationImages, ...files] })
    } else {
      alert('Maximum 5 images allowed')
    }
  }

  const removeImage = (index: number) => {
    const newImages = formData.inspirationImages.filter((_, i) => i !== index)
    updateFormData({ inspirationImages: newImages })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Décor & Event Styling 🎨</h2>
        <p className="text-gray-600">Bring your vision to life</p>
      </div>

      {/* Theme Selection */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Select a Theme</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.name}
              type="button"
              onClick={() => updateFormData({ theme: theme.name })}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                formData.theme === theme.name
                  ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                  : 'border-gray-200 hover:border-emerald-300 bg-white'
              }`}
            >
              <div className="text-4xl mb-2">{theme.emoji}</div>
              <span className="text-sm font-semibold text-gray-900">{theme.name}</span>
              {theme.colors.length > 0 && (
                <div className="flex justify-center gap-1 mt-2">
                  {theme.colors.map((color, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }} />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">📸 Inspiration Images (Optional)</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-all">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500 mt-2">Max 5 images, 10MB each • PNG, JPG</p>
          </label>
        </div>

        {/* Image Preview */}
        {formData.inspirationImages.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
            {formData.inspirationImages.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vision & Ideas */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          💭 Describe Your Vision
        </label>
        <textarea
          value={formData.vision}
          onChange={(e) => updateFormData({ vision: e.target.value })}
          placeholder="Share your ideas, preferences, and inspiration...

Examples:
• I want a fairytale wedding with lots of flowers and fairy lights
• Elegant corporate dinner with modern centerpieces
• Traditional Swahili coastal theme with palm leaves and turquoise colors
• Beach vibe with white draping and tropical flowers"
          rows={6}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all resize-none"
        />
      </div>
    </div>
  )
}

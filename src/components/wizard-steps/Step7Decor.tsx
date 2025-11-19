'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Palette, Upload, X, Sparkles } from 'lucide-react'

type DecorTheme = 'elegant' | 'modern' | 'traditional' | 'beach' | 'garden' | 'luxury' | 'rustic' | 'minimalist'

interface Props {
  decorTheme: DecorTheme | null
  decorVision: string
  decorColors: string[]
  onUpdate: (field: string, value: any) => void
  onFileUpload: (files: File[]) => void
  uploadedFiles: File[]
}

export default function Step7Decor({ 
  decorTheme, 
  decorVision, 
  decorColors,
  onUpdate, 
  onFileUpload,
  uploadedFiles 
}: Props) {
  const themes = [
    { id: 'elegant' as DecorTheme, name: 'Elegant Classic', gradient: 'from-purple-500 to-pink-500' },
    { id: 'modern' as DecorTheme, name: 'Modern Contemporary', gradient: 'from-gray-700 to-gray-900' },
    { id: 'traditional' as DecorTheme, name: 'Traditional Cultural', gradient: 'from-red-600 to-orange-600' },
    { id: 'beach' as DecorTheme, name: 'Beach Coastal', gradient: 'from-blue-400 to-cyan-400' },
    { id: 'garden' as DecorTheme, name: 'Garden Rustic', gradient: 'from-green-500 to-emerald-600' },
    { id: 'luxury' as DecorTheme, name: 'Luxury Glamorous', gradient: 'from-amber-500 to-yellow-600' },
    { id: 'rustic' as DecorTheme, name: 'Rustic Vintage', gradient: 'from-amber-700 to-orange-800' },
    { id: 'minimalist' as DecorTheme, name: 'Minimalist Clean', gradient: 'from-slate-400 to-slate-600' },
  ]

  const colorPalettes = [
    { name: 'Gold & White', colors: ['#FFD700', '#FFFFFF', '#F5F5DC'] },
    { name: 'Navy & Blush', colors: ['#000080', '#FFB6C1', '#FFFFFF'] },
    { name: 'Emerald & Gold', colors: ['#50C878', '#FFD700', '#FFFFFF'] },
    { name: 'Burgundy & Ivory', colors: ['#800020', '#FFFFF0', '#C4A484'] },
    { name: 'Teal & Coral', colors: ['#008080', '#FF7F50', '#FFFFFF'] },
    { name: 'Custom Colors', colors: ['custom'] },
  ]

  const [customColors, setCustomColors] = useState<string[]>(['#3E5E4E', '#FFFFFF', '#F5F5DC'])
  const isCustomSelected = decorColors.length > 0 && decorColors[0] !== '#FFD700' && decorColors[0] !== '#000080' && decorColors[0] !== '#50C878' && decorColors[0] !== '#800020' && decorColors[0] !== '#008080'

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      onFileUpload([...uploadedFiles, ...filesArray].slice(0, 5)) // Max 5 files
    }
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    onFileUpload(newFiles)
  }

  const toggleColor = (palette: string[]) => {
    onUpdate('decorColors', palette)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Décor & Styling</h2>
        <p className="text-gray-600">Share your vision for the event aesthetic</p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--brand-green)]" />
          Choose Your Theme (Optional)
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {themes.map((theme) => {
            const isSelected = decorTheme === theme.id
            return (
              <motion.div
                key={theme.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  onClick={() => onUpdate('decorTheme', theme.id)}
                  className={`cursor-pointer transition-all border-2 overflow-hidden ${
                    isSelected
                      ? 'border-[var(--brand-green)] ring-2 ring-[var(--brand-green)]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`h-20 bg-gradient-to-br ${theme.gradient}`} />
                  <div className="p-3">
                    <p className="text-xs font-medium text-gray-900 text-center leading-tight">
                      {theme.name}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Color Palette Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Palette className="w-5 h-5 text-[var(--brand-green)]" />
          Color Palette (Optional)
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {colorPalettes.map((palette) => {
            const isSelected = palette.name === 'Custom Colors' 
              ? isCustomSelected 
              : JSON.stringify(decorColors) === JSON.stringify(palette.colors)
            
            return (
              <Card
                key={palette.name}
                onClick={() => {
                  if (palette.name === 'Custom Colors') {
                    toggleColor(customColors)
                  } else {
                    toggleColor(palette.colors)
                  }
                }}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  isSelected
                    ? 'border-[var(--brand-green)] ring-2 ring-[var(--brand-green)]/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="text-xs font-medium text-gray-900 mb-2">{palette.name}</p>
                <div className="flex gap-2">
                  {palette.colors[0] === 'custom' ? (
                    <div className="w-full h-8 rounded border-2 border-dashed border-gray-400 flex items-center justify-center bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500">
                      <Palette className="w-4 h-4 text-white drop-shadow" />
                    </div>
                  ) : (
                    palette.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-full h-8 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Custom Color Pickers */}
        {isCustomSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white p-6 rounded-2xl border-2 border-[var(--brand-green)]/30"
          >
            <p className="text-sm font-medium text-gray-900 mb-4">Select Your Custom Colors</p>
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-xs text-gray-600">Color {index + 1}</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={customColors[index] || '#FFFFFF'}
                      onChange={(e) => {
                        const newColors = [...customColors]
                        newColors[index] = e.target.value
                        setCustomColors(newColors)
                        onUpdate('decorColors', newColors)
                      }}
                      className="w-full h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-gray-500 font-mono">{customColors[index]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Upload */}
      <Card className="p-6 border-2 border-dashed border-gray-300 bg-gray-50">
        <Label className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-3">
          <Upload className="w-5 h-5 text-[var(--brand-green)]" />
          Upload Inspiration Images (Optional)
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          Share images that inspire your event décor (max 5 images)
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="decor-upload"
          disabled={uploadedFiles.length >= 5}
        />
        <label
          htmlFor="decor-upload"
          className={`block w-full p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${
            uploadedFiles.length >= 5
              ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
              : 'border-[var(--brand-green)] bg-white hover:bg-[var(--brand-green)]/5'
          }`}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-[var(--brand-green)]" />
          <p className="text-sm font-medium text-gray-900">
            {uploadedFiles.length >= 5 ? 'Maximum 5 images reached' : 'Click to upload images'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG up to 10MB ({uploadedFiles.length}/5)
          </p>
        </label>

        {/* Uploaded Files Preview */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 border-2 border-gray-300">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Décor Vision */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
        <Label htmlFor="decorVision" className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[var(--brand-green)]" />
          Your Décor Vision (Optional)
        </Label>
        <Textarea
          id="decorVision"
          placeholder="Describe your ideal event look and feel, color preferences, special décor elements, or any specific ideas you have in mind..."
          value={decorVision}
          onChange={(e) => onUpdate('decorVision', e.target.value)}
          rows={5}
          className="resize-none text-base border-2 focus:border-[var(--brand-green)]"
        />
      </div>
    </div>
  )
}

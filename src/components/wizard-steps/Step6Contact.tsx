'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { User, Mail, Phone, MessageSquare } from 'lucide-react'

interface Props {
  name: string
  email: string
  phone: string
  message: string
  onUpdate: (field: string, value: string) => void
}

export default function Step6Contact({ name, email, phone, message, onUpdate }: Props) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Information</h2>
        <p className="text-gray-600">How can we reach you?</p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div className="bg-white p-5 rounded-2xl border-2 border-gray-200">
          <Label htmlFor="name" className="flex items-center gap-2 text-base font-semibold mb-3 text-gray-900">
            <User className="w-5 h-5 text-[var(--brand-green)]" />
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="h-12 text-base border-2 focus:border-[var(--brand-green)]"
            required
          />
        </div>

        {/* Email */}
        <div className="bg-white p-5 rounded-2xl border-2 border-gray-200">
          <Label htmlFor="email" className="flex items-center gap-2 text-base font-semibold mb-3 text-gray-900">
            <Mail className="w-5 h-5 text-[var(--brand-green)]" />
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => onUpdate('email', e.target.value)}
            className="h-12 text-base border-2 focus:border-[var(--brand-green)]"
            required
          />
        </div>

        {/* Phone */}
        <div className="bg-white p-5 rounded-2xl border-2 border-gray-200">
          <Label htmlFor="phone" className="flex items-center gap-2 text-base font-semibold mb-3 text-gray-900">
            <Phone className="w-5 h-5 text-[var(--brand-green)]" />
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+255 XXX XXX XXX"
            value={phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            className="h-12 text-base border-2 focus:border-[var(--brand-green)]"
            required
          />
        </div>

        {/* Additional Information */}
        <div className="bg-white p-5 rounded-2xl border-2 border-gray-200">
          <Label htmlFor="message" className="flex items-center gap-2 text-base font-semibold mb-3 text-gray-900">
            <MessageSquare className="w-5 h-5 text-[var(--brand-green)]" />
            Additional Information
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us more about your event vision, special requirements, or any questions you have..."
            value={message}
            onChange={(e) => onUpdate('message', e.target.value)}
            rows={4}
            className="resize-none text-base border-2 focus:border-[var(--brand-green)]"
          />
        </div>
      </div>
    </div>
  )
}

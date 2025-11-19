'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  guestCount: number
  date: string
  venue: string
  onUpdate: (field: string, value: string | number) => void
}

export default function Step5GuestDate({ guestCount, date, venue, onUpdate }: Props) {
  const selectedDate = date ? new Date(date) : undefined

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Event Details</h2>
        <p className="text-gray-600">Tell us when and where</p>
      </div>

      {/* Guest Count Card */}
      <div className="bg-gradient-to-br from-[var(--brand-green)]/5 to-[var(--brand-green)]/10 p-6 rounded-2xl border-2 border-[var(--brand-green)]/20">
        <Label className="text-base font-semibold flex items-center gap-2 mb-4 text-gray-900">
          <Users className="w-5 h-5 text-[var(--brand-green)]" />
          Number of Guests
        </Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-[var(--brand-green)]">{guestCount}</span>
            <span className="text-sm font-medium text-gray-600">guests</span>
          </div>
          <Slider
            value={[guestCount]}
            onValueChange={(value) => onUpdate('guestCount', value[0])}
            min={10}
            max={500}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs font-medium text-gray-500">
            <span>10 guests</span>
            <span>500+ guests</span>
          </div>
        </div>
      </div>

      {/* Event Date Card */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
        <Label className="text-base font-semibold flex items-center gap-2 mb-4 text-gray-900">
          <CalendarIcon className="w-5 h-5 text-[var(--brand-green)]" />
          Event Date <span className="text-red-500">*</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal h-14 border-2 hover:border-[var(--brand-green)] transition-colors bg-white ${
                !selectedDate ? 'text-gray-500' : 'text-gray-900'
              }`}
            >
              <CalendarIcon className="mr-3 h-5 w-5 text-[var(--brand-green)]" />
              {selectedDate ? (
                <span className="font-medium text-gray-900">{format(selectedDate, 'PPPP')}</span>
              ) : (
                <span className="text-gray-500">Select your event date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onUpdate('date', date.toISOString().split('T')[0])}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Venue Card */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
        <Label htmlFor="venue" className="text-base font-semibold flex items-center gap-2 mb-4 text-gray-900">
          <svg className="w-5 h-5 text-[var(--brand-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Venue / Location
        </Label>
        <Input
          id="venue"
          placeholder="e.g., Serena Hotel, Dar es Salaam"
          value={venue}
          onChange={(e) => onUpdate('venue', e.target.value)}
          className="h-14 text-base border-2 focus:border-[var(--brand-green)]"
        />
        <p className="text-sm text-gray-500 mt-3">Leave blank if you need venue recommendations</p>
      </div>
    </div>
  )
}

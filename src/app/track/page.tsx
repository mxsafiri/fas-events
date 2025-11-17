'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, Mail, Phone, MapPin, Users, DollarSign, Clock, CheckCircle, AlertCircle, XCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface EventData {
  id: number
  tracking_code: string
  name: string
  email: string
  phone: string | null
  event_type: string | null
  event_date: string | null
  guest_count: number | null
  budget_range: string | null
  venue: string | null
  message: string | null
  status: string
  created_at: string
  updated_at: string
}

export default function TrackEventPage() {
  const [trackingCode, setTrackingCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [eventData, setEventData] = useState<EventData | null>(null)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!trackingCode.trim()) {
      setError('Please enter your tracking code')
      return
    }

    setLoading(true)
    setError(null)
    setEventData(null)

    try {
      const response = await fetch(`/api/track-event?code=${encodeURIComponent(trackingCode.trim())}`)
      const data = await response.json()

      if (data.success) {
        setEventData(data.data)
      } else {
        setError(data.error || 'Event not found')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Tracking error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'new':
        return {
          label: 'New Request',
          icon: AlertCircle,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          description: 'We\'ve received your request and will review it soon!'
        }
      case 'in_review':
        return {
          label: 'Under Review',
          icon: Loader2,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          description: 'Our team is reviewing your event details.'
        }
      case 'converted':
        return {
          label: 'Confirmed',
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          description: 'Great news! Your event has been confirmed. Check your email for details.'
        }
      case 'rejected':
        return {
          label: 'Unable to Proceed',
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          description: 'Unfortunately, we cannot proceed with this request at this time.'
        }
      default:
        return {
          label: status,
          icon: AlertCircle,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          description: 'Status information unavailable.'
        }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-[#F3EEE6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4 text-[var(--brand-green)] hover:underline">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-[#1F1F1F] mb-2">Track Your Event</h1>
          <p className="text-[#1F1F1F]/70">Enter your tracking code to check your event request status</p>
        </div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#E0D9CF] p-6 shadow-sm mb-6"
        >
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#1F1F1F]">
                Tracking Code
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  placeholder="EVT-XXXXXX"
                  className="flex-1 px-4 py-3 border-2 border-[#E0D9CF] rounded-xl focus:border-[var(--brand-green)] focus:outline-none bg-white font-mono text-lg"
                  maxLength={10}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-[var(--brand-green)] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Track
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#1F1F1F]/60 mt-2">
                Your tracking code was provided when you submitted your event request
              </p>
            </div>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2"
            >
              <XCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Event Details */}
        {eventData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Status Card */}
            {(() => {
              const statusInfo = getStatusInfo(eventData.status)
              const StatusIcon = statusInfo.icon
              return (
                <div className={`${statusInfo.bg} border-2 ${statusInfo.border} rounded-2xl p-6`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${statusInfo.bg} border ${statusInfo.border}`}>
                      <StatusIcon className={`w-6 h-6 ${statusInfo.color} ${statusInfo.icon === Loader2 ? 'animate-spin' : ''}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${statusInfo.color} mb-1`}>
                        {statusInfo.label}
                      </h3>
                      <p className="text-sm text-[#1F1F1F]/70">{statusInfo.description}</p>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Event Details Card */}
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1F1F1F] mb-4">Event Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[var(--brand-green)] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#1F1F1F]/60">Contact</div>
                    <div className="font-medium text-[#1F1F1F]">{eventData.name}</div>
                    <div className="text-sm text-[#1F1F1F]/70">{eventData.email}</div>
                    {eventData.phone && (
                      <div className="text-sm text-[#1F1F1F]/70">{eventData.phone}</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {eventData.event_type && (
                    <div className="bg-[#F8F4EE] rounded-lg p-3 border border-[#EDE7DE]">
                      <div className="text-xs text-[#1F1F1F]/60 mb-1">Event Type</div>
                      <div className="font-medium text-[#1F1F1F] capitalize">{eventData.event_type}</div>
                    </div>
                  )}
                  {eventData.event_date && (
                    <div className="bg-[#F8F4EE] rounded-lg p-3 border border-[#EDE7DE]">
                      <div className="text-xs text-[#1F1F1F]/60 mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Event Date
                      </div>
                      <div className="font-medium text-[#1F1F1F]">{formatDate(eventData.event_date)}</div>
                    </div>
                  )}
                  {eventData.guest_count && (
                    <div className="bg-[#F8F4EE] rounded-lg p-3 border border-[#EDE7DE]">
                      <div className="text-xs text-[#1F1F1F]/60 mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Guests
                      </div>
                      <div className="font-medium text-[#1F1F1F]">{eventData.guest_count}</div>
                    </div>
                  )}
                  {eventData.budget_range && (
                    <div className="bg-[#F8F4EE] rounded-lg p-3 border border-[#EDE7DE]">
                      <div className="text-xs text-[#1F1F1F]/60 mb-1 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Budget
                      </div>
                      <div className="font-medium text-[#1F1F1F]">{eventData.budget_range}</div>
                    </div>
                  )}
                </div>

                {eventData.venue && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[var(--brand-green)] mt-0.5" />
                    <div>
                      <div className="text-sm text-[#1F1F1F]/60">Venue / Location</div>
                      <div className="font-medium text-[#1F1F1F]">{eventData.venue}</div>
                    </div>
                  </div>
                )}

                {eventData.message && (
                  <div className="bg-[#FDFBF8] rounded-lg p-4 border border-[#EDE7DE]">
                    <div className="text-sm text-[#1F1F1F]/60 mb-2">Additional Details</div>
                    <p className="text-sm text-[#1F1F1F]">{eventData.message}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-[#E0D9CF] flex items-center justify-between text-xs text-[#1F1F1F]/50">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Submitted {formatDate(eventData.created_at)}
                  </div>
                  <div className="font-mono text-[#1F1F1F]/70">
                    {eventData.tracking_code}
                  </div>
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-[#1F1F1F]/60">
              Questions about your event? Contact us at{' '}
              <a href="mailto:info@fasexclusive.com" className="text-[var(--brand-green)] hover:underline">
                info@fasexclusive.com
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

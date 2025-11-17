'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Mail, Phone, MapPin, Users, DollarSign, Clock, Eye, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface EventRequest {
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
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<EventRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [stats, setStats] = useState({ total: 0, new: 0, in_review: 0, converted: 0 })

  useEffect(() => {
    fetchRequests()
  }, [filter])

  useEffect(() => {
    if (requests.length > 0) {
      setStats({
        total: requests.length,
        new: requests.filter(r => r.status === 'new').length,
        in_review: requests.filter(r => r.status === 'in_review').length,
        converted: requests.filter(r => r.status === 'converted').length,
      })
    }
  }, [requests])

  const fetchRequests = async () => {
    try {
      const url = filter === 'all' ? '/api/event-requests' : `/api/event-requests?status=${filter}`
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.success) {
        setRequests(data.data)
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'in_review': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'converted': return 'bg-green-100 text-green-700 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1F1F1F] mb-2">Event Requests</h1>
        <p className="text-[#1F1F1F]/70">Manage incoming event inquiries from your website</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-[#1F1F1F]/60">Total Requests</div>
            <TrendingUp className="w-5 h-5 text-[var(--brand-green)]" />
          </div>
          <div className="text-3xl font-bold text-[#1F1F1F]">{stats.total}</div>
        </div>
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <div className="text-sm text-blue-600 mb-2">New</div>
          <div className="text-3xl font-bold text-blue-700">{stats.new}</div>
        </div>
        <div className="bg-yellow-50 rounded-2xl border border-yellow-200 p-6">
          <div className="text-sm text-yellow-600 mb-2">In Review</div>
          <div className="text-3xl font-bold text-yellow-700">{stats.in_review}</div>
        </div>
        <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
          <div className="text-sm text-green-600 mb-2">Converted</div>
          <div className="text-3xl font-bold text-green-700">{stats.converted}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] p-2">
        <div className="flex gap-2 flex-wrap">
          {['all', 'new', 'in_review', 'converted', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
                filter === status
                  ? 'bg-[var(--brand-green)] text-white shadow-md'
                  : 'text-[#1F1F1F] hover:bg-[#F3EEE6]'
              }`}
            >
              {status === 'all' ? 'All Requests' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      {loading ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#E0D9CF]">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--brand-green)] border-t-transparent"></div>
          <p className="mt-4 text-[#1F1F1F]/70">Loading requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#E0D9CF]">
          <p className="text-[#1F1F1F]/70">No requests found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-[#E0D9CF] p-6 hover:shadow-xl hover:border-[var(--brand-green)] transition-all cursor-pointer group"
            >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-[#1F1F1F]">{request.name}</h3>
                          <span className="px-2 py-0.5 bg-[#F3EEE6] border border-[#E0D9CF] rounded text-xs font-mono text-[#1F1F1F]/70">
                            {request.tracking_code}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-[#1F1F1F]/70">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {request.email}
                          </span>
                          {request.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {request.phone}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(request.status)}`}>
                        {request.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {request.event_type && (
                        <div className="bg-[#F8F4EE] rounded-lg p-3 border border-[#EDE7DE]">
                          <div className="text-xs text-[#1F1F1F]/60 mb-1">Event Type</div>
                          <div className="font-medium text-[#1F1F1F] capitalize">{request.event_type}</div>
                        </div>
                      )}
                      {request.event_date && (
                        <div className="bg-[#F8F4EE] rounded-lg p-3 border border-[#EDE7DE]">
                          <div className="text-xs text-[#1F1F1F]/60 mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Event Date
                          </div>
                          <div className="font-medium text-[#1F1F1F]">{new Date(request.event_date).toLocaleDateString()}</div>
                        </div>
                      )}
                      {request.guest_count && (
                        <div className="bg-[#F8F4EE] rounded-lg p-3 border border-[#EDE7DE]">
                          <div className="text-xs text-[#1F1F1F]/60 mb-1 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Guests
                          </div>
                          <div className="font-medium text-[#1F1F1F]">{request.guest_count}</div>
                        </div>
                      )}
                      {request.budget_range && (
                        <div className="bg-[#F8F4EE] rounded-lg p-3 border border-[#EDE7DE]">
                          <div className="text-xs text-[#1F1F1F]/60 mb-1 flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            Budget
                          </div>
                          <div className="font-medium text-[#1F1F1F]">{request.budget_range}</div>
                        </div>
                      )}
                    </div>

                    {request.venue && (
                      <div className="mb-3 flex items-center gap-2 text-sm text-[#1F1F1F]/70">
                        <MapPin className="w-4 h-4" />
                        <span>{request.venue}</span>
                      </div>
                    )}

                    {request.message && (
                      <div className="bg-[#FDFBF8] rounded-lg p-3 border border-[#EDE7DE]">
                        <div className="text-xs text-[#1F1F1F]/60 mb-1">Message</div>
                        <p className="text-sm text-[#1F1F1F]">{request.message}</p>
                      </div>
                    )}

                    <div className="mt-3 flex items-center gap-2 text-xs text-[#1F1F1F]/50">
                      <Clock className="w-3 h-3" />
                      Submitted {formatDate(request.created_at)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <Link
                      href={`/admin/requests/${request.id}`}
                      className="px-6 py-3 bg-[var(--brand-green)] text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold flex items-center gap-2 group-hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

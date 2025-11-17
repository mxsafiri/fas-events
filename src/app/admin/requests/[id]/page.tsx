'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Calendar, Mail, Phone, MapPin, Users, DollarSign, 
  Clock, CheckCircle, XCircle, AlertCircle, Plus, Trash2, Save,
  Calculator, FileText, Edit2
} from 'lucide-react'
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

interface BudgetCategory {
  id: string
  name: string
  items: BudgetItem[]
  total: number
}

interface BudgetItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export default function EventRequestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<EventRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'details' | 'budget' | 'notes'>('details')
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([])
  const [notes, setNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  useEffect(() => {
    fetchEventDetails()
    loadBudgetData()
  }, [params.id])

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`/api/event-requests`)
      const data = await response.json()
      if (data.success) {
        const foundEvent = data.data.find((e: EventRequest) => e.id === parseInt(params.id as string))
        setEvent(foundEvent || null)
      }
    } catch (error) {
      console.error('Error fetching event:', error)
    } finally {
      setLoading(false)
    }
  }

  // Budget templates for different event types
  const budgetTemplates = {
    generic: [
      { id: '1', name: 'Venue & Space', items: [], total: 0 },
      { id: '2', name: 'Décor & Styling', items: [], total: 0 },
      { id: '3', name: 'Furniture & Seating', items: [], total: 0 },
      { id: '4', name: 'Catering & Beverages', items: [], total: 0 },
      { id: '5', name: 'Entertainment & Audio/Visual', items: [], total: 0 },
      { id: '6', name: 'Photography & Videography', items: [], total: 0 },
      { id: '7', name: 'Staffing & Services', items: [], total: 0 },
      { id: '8', name: 'Miscellaneous', items: [], total: 0 },
    ],
    wedding: [
      { id: '1', name: 'Venue & Space', items: [], total: 0 },
      { id: '2', name: 'Bride & Groom Stage Décor', items: [], total: 0 },
      { id: '3', name: 'Ceremony Setup', items: [], total: 0 },
      { id: '4', name: 'Reception Décor', items: [], total: 0 },
      { id: '5', name: 'Table Setup & Centerpieces', items: [], total: 0 },
      { id: '6', name: 'Catering & Bar', items: [], total: 0 },
      { id: '7', name: 'Entertainment & DJ', items: [], total: 0 },
      { id: '8', name: 'Photography & Videography', items: [], total: 0 },
      { id: '9', name: 'Flowers & Bouquets', items: [], total: 0 },
      { id: '10', name: 'Transportation', items: [], total: 0 },
      { id: '11', name: 'Miscellaneous', items: [], total: 0 },
    ],
    corporate: [
      { id: '1', name: 'Venue Rental', items: [], total: 0 },
      { id: '2', name: 'Audio/Visual Equipment', items: [], total: 0 },
      { id: '3', name: 'Stage & Branding', items: [], total: 0 },
      { id: '4', name: 'Seating & Furniture', items: [], total: 0 },
      { id: '5', name: 'Catering & Refreshments', items: [], total: 0 },
      { id: '6', name: 'Registration & Check-in', items: [], total: 0 },
      { id: '7', name: 'Speakers & Entertainment', items: [], total: 0 },
      { id: '8', name: 'Marketing Materials', items: [], total: 0 },
      { id: '9', name: 'Staffing', items: [], total: 0 },
      { id: '10', name: 'Technology & IT Support', items: [], total: 0 },
      { id: '11', name: 'Miscellaneous', items: [], total: 0 },
    ],
    birthday: [
      { id: '1', name: 'Venue & Space', items: [], total: 0 },
      { id: '2', name: 'Theme Décor', items: [], total: 0 },
      { id: '3', name: 'Cake & Desserts', items: [], total: 0 },
      { id: '4', name: 'Catering & Food', items: [], total: 0 },
      { id: '5', name: 'Entertainment & Activities', items: [], total: 0 },
      { id: '6', name: 'Party Favors & Gifts', items: [], total: 0 },
      { id: '7', name: 'Photography', items: [], total: 0 },
      { id: '8', name: 'Balloons & Flowers', items: [], total: 0 },
      { id: '9', name: 'Miscellaneous', items: [], total: 0 },
    ],
    decor_only: [
      { id: '1', name: 'Main Stage/Backdrop', items: [], total: 0 },
      { id: '2', name: 'Entrance Décor', items: [], total: 0 },
      { id: '3', name: 'Table Centerpieces', items: [], total: 0 },
      { id: '4', name: 'Ceiling & Draping', items: [], total: 0 },
      { id: '5', name: 'Lighting', items: [], total: 0 },
      { id: '6', name: 'Flowers & Greenery', items: [], total: 0 },
      { id: '7', name: 'Signage & Props', items: [], total: 0 },
      { id: '8', name: 'Furniture Rental', items: [], total: 0 },
      { id: '9', name: 'Setup & Breakdown', items: [], total: 0 },
      { id: '10', name: 'Miscellaneous', items: [], total: 0 },
    ],
  }

  const loadBudgetData = () => {
    // Load from localStorage or initialize with generic categories
    const saved = localStorage.getItem(`budget-${params.id}`)
    if (saved) {
      setBudgetCategories(JSON.parse(saved))
    } else {
      // Initialize with universal categories
      setBudgetCategories(budgetTemplates.generic)
    }
  }

  const loadTemplate = (templateName: keyof typeof budgetTemplates) => {
    if (confirm('This will replace your current budget. Continue?')) {
      setBudgetCategories(JSON.parse(JSON.stringify(budgetTemplates[templateName])))
      setShowTemplates(false)
    }
  }

  const saveBudget = () => {
    localStorage.setItem(`budget-${params.id}`, JSON.stringify(budgetCategories))
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  const addCategory = () => {
    const newCategory: BudgetCategory = {
      id: Date.now().toString(),
      name: 'New Category',
      items: [],
      total: 0
    }
    setBudgetCategories([...budgetCategories, newCategory])
  }

  const updateCategoryName = (categoryId: string, name: string) => {
    setBudgetCategories(categories =>
      categories.map(cat =>
        cat.id === categoryId ? { ...cat, name } : cat
      )
    )
  }

  const deleteCategory = (categoryId: string) => {
    setBudgetCategories(categories => categories.filter(cat => cat.id !== categoryId))
  }

  const addItem = (categoryId: string) => {
    setBudgetCategories(categories =>
      categories.map(cat => {
        if (cat.id === categoryId) {
          const newItem: BudgetItem = {
            id: Date.now().toString(),
            description: '',
            quantity: 1,
            unitPrice: 0,
            total: 0
          }
          return { ...cat, items: [...cat.items, newItem] }
        }
        return cat
      })
    )
  }

  const updateItem = (categoryId: string, itemId: string, field: keyof BudgetItem, value: any) => {
    setBudgetCategories(categories =>
      categories.map(cat => {
        if (cat.id === categoryId) {
          const updatedItems = cat.items.map(item => {
            if (item.id === itemId) {
              const updated = { ...item, [field]: value }
              if (field === 'quantity' || field === 'unitPrice') {
                updated.total = updated.quantity * updated.unitPrice
              }
              return updated
            }
            return item
          })
          const categoryTotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
          return { ...cat, items: updatedItems, total: categoryTotal }
        }
        return cat
      })
    )
  }

  const deleteItem = (categoryId: string, itemId: string) => {
    setBudgetCategories(categories =>
      categories.map(cat => {
        if (cat.id === categoryId) {
          const updatedItems = cat.items.filter(item => item.id !== itemId)
          const categoryTotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
          return { ...cat, items: updatedItems, total: categoryTotal }
        }
        return cat
      })
    )
  }

  const grandTotal = budgetCategories.reduce((sum, cat) => sum + cat.total, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const updateStatus = async (newStatus: string) => {
    // TODO: Implement API call to update status
    if (event) {
      setEvent({ ...event, status: newStatus })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--brand-green)] border-t-transparent"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-[#1F1F1F]/70">Event not found</p>
        <Link href="/admin/requests" className="text-[var(--brand-green)] hover:underline mt-4 inline-block">
          ← Back to Requests
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/requests"
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#1F1F1F]">{event.name}</h1>
            <p className="text-sm text-[#1F1F1F]/60 font-mono">{event.tracking_code}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={event.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="px-4 py-2 border-2 border-[#E0D9CF] rounded-xl focus:border-[var(--brand-green)] focus:outline-none bg-white"
          >
            <option value="new">New</option>
            <option value="in_review">In Review</option>
            <option value="converted">Converted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] p-2">
        <div className="flex gap-2">
          {[
            { id: 'details', label: 'Event Details', icon: FileText },
            { id: 'budget', label: 'Budget Builder', icon: Calculator },
            { id: 'notes', label: 'Notes', icon: Edit2 },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--brand-green)] text-white'
                    : 'text-[#1F1F1F] hover:bg-[#F3EEE6]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'details' && (
          <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
            <h2 className="text-xl font-bold text-[#1F1F1F] mb-6">Event Information</h2>
            
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[var(--brand-green)] mt-1" />
                  <div>
                    <div className="text-sm text-[#1F1F1F]/60">Email</div>
                    <div className="font-medium text-[#1F1F1F]">{event.email}</div>
                  </div>
                </div>
                {event.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[var(--brand-green)] mt-1" />
                    <div>
                      <div className="text-sm text-[#1F1F1F]/60">Phone</div>
                      <div className="font-medium text-[#1F1F1F]">{event.phone}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {event.event_type && (
                  <div className="bg-[#F8F4EE] rounded-xl p-4 border border-[#EDE7DE]">
                    <div className="text-xs text-[#1F1F1F]/60 mb-1">Event Type</div>
                    <div className="font-semibold text-[#1F1F1F] capitalize">{event.event_type}</div>
                  </div>
                )}
                {event.event_date && (
                  <div className="bg-[#F8F4EE] rounded-xl p-4 border border-[#EDE7DE]">
                    <div className="text-xs text-[#1F1F1F]/60 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Event Date
                    </div>
                    <div className="font-semibold text-[#1F1F1F]">{formatDate(event.event_date)}</div>
                  </div>
                )}
                {event.guest_count && (
                  <div className="bg-[#F8F4EE] rounded-xl p-4 border border-[#EDE7DE]">
                    <div className="text-xs text-[#1F1F1F]/60 mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Guests
                    </div>
                    <div className="font-semibold text-[#1F1F1F]">{event.guest_count}</div>
                  </div>
                )}
                {event.budget_range && (
                  <div className="bg-[#F8F4EE] rounded-xl p-4 border border-[#EDE7DE]">
                    <div className="text-xs text-[#1F1F1F]/60 mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      Budget Range
                    </div>
                    <div className="font-semibold text-[#1F1F1F]">{event.budget_range}</div>
                  </div>
                )}
              </div>

              {event.venue && (
                <div className="flex items-start gap-3 bg-[#FDFBF8] rounded-xl p-4 border border-[#EDE7DE]">
                  <MapPin className="w-5 h-5 text-[var(--brand-green)] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#1F1F1F]/60">Venue / Location</div>
                    <div className="font-medium text-[#1F1F1F]">{event.venue}</div>
                  </div>
                </div>
              )}

              {event.message && (
                <div className="bg-[#FDFBF8] rounded-xl p-4 border border-[#EDE7DE]">
                  <div className="text-sm text-[#1F1F1F]/60 mb-2">Additional Details</div>
                  <p className="text-[#1F1F1F]">{event.message}</p>
                </div>
              )}

              <div className="pt-4 border-t border-[#E0D9CF] flex items-center gap-2 text-sm text-[#1F1F1F]/50">
                <Clock className="w-4 h-4" />
                Submitted {formatDate(event.created_at)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-4">
            {/* Budget Summary */}
            <div className="bg-gradient-to-br from-[var(--brand-green)] to-[#2D5F3F] rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-90 mb-1">Total Event Budget</div>
                  <div className="text-4xl font-bold">{formatCurrency(grandTotal)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Templates
                  </button>
                  <button
                    onClick={saveBudget}
                    disabled={isSaving}
                    className="px-6 py-3 bg-white text-[var(--brand-green)] rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    {isSaving ? 'Saved!' : 'Save Budget'}
                  </button>
                </div>
              </div>
            </div>

            {/* Template Selector */}
            {showTemplates && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border-2 border-[var(--brand-green)] p-6"
              >
                <h3 className="text-lg font-bold text-[#1F1F1F] mb-4">Load Budget Template</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => loadTemplate('generic')}
                    className="p-4 border-2 border-[#E0D9CF] rounded-xl hover:border-[var(--brand-green)] hover:bg-[var(--brand-green)]/5 transition-all text-left"
                  >
                    <div className="font-semibold text-[#1F1F1F] mb-1">Generic Event</div>
                    <div className="text-sm text-[#1F1F1F]/60">8 universal categories</div>
                  </button>
                  <button
                    onClick={() => loadTemplate('wedding')}
                    className="p-4 border-2 border-[#E0D9CF] rounded-xl hover:border-[var(--brand-green)] hover:bg-[var(--brand-green)]/5 transition-all text-left"
                  >
                    <div className="font-semibold text-[#1F1F1F] mb-1">Wedding</div>
                    <div className="text-sm text-[#1F1F1F]/60">11 wedding-specific categories</div>
                  </button>
                  <button
                    onClick={() => loadTemplate('corporate')}
                    className="p-4 border-2 border-[#E0D9CF] rounded-xl hover:border-[var(--brand-green)] hover:bg-[var(--brand-green)]/5 transition-all text-left"
                  >
                    <div className="font-semibold text-[#1F1F1F] mb-1">Corporate Event</div>
                    <div className="text-sm text-[#1F1F1F]/60">11 business event categories</div>
                  </button>
                  <button
                    onClick={() => loadTemplate('birthday')}
                    className="p-4 border-2 border-[#E0D9CF] rounded-xl hover:border-[var(--brand-green)] hover:bg-[var(--brand-green)]/5 transition-all text-left"
                  >
                    <div className="font-semibold text-[#1F1F1F] mb-1">Birthday Party</div>
                    <div className="text-sm text-[#1F1F1F]/60">9 party-focused categories</div>
                  </button>
                  <button
                    onClick={() => loadTemplate('decor_only')}
                    className="p-4 border-2 border-[#E0D9CF] rounded-xl hover:border-[var(--brand-green)] hover:bg-[var(--brand-green)]/5 transition-all text-left"
                  >
                    <div className="font-semibold text-[#1F1F1F] mb-1">Décor Only</div>
                    <div className="text-sm text-[#1F1F1F]/60">10 décor & styling categories</div>
                  </button>
                  <button
                    onClick={() => setShowTemplates(false)}
                    className="p-4 border-2 border-[#E0D9CF] rounded-xl hover:border-red-500 hover:bg-red-50 transition-all text-left"
                  >
                    <div className="font-semibold text-[#1F1F1F] mb-1">Cancel</div>
                    <div className="text-sm text-[#1F1F1F]/60">Keep current budget</div>
                  </button>
                </div>
                <p className="text-xs text-[#1F1F1F]/60 mt-4">
                  💡 Tip: You can always add, remove, or rename categories after loading a template
                </p>
              </motion.div>
            )}

            {/* Budget Categories */}
            <div className="space-y-4">
              {budgetCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-[#F8F4EE] px-6 py-4 border-b border-[#EDE7DE] flex items-center justify-between">
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) => updateCategoryName(category.id, e.target.value)}
                      className="text-lg font-bold text-[#1F1F1F] bg-transparent border-none focus:outline-none flex-1"
                    />
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-bold text-[var(--brand-green)]">
                        {formatCurrency(category.total)}
                      </div>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="p-6">
                    {category.items.length > 0 && (
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#E0D9CF]">
                              <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F1F1F]/60">Item</th>
                              <th className="text-center py-3 px-4 text-sm font-semibold text-[#1F1F1F]/60 w-24">Qty</th>
                              <th className="text-right py-3 px-4 text-sm font-semibold text-[#1F1F1F]/60 w-32">Unit Price</th>
                              <th className="text-right py-3 px-4 text-sm font-semibold text-[#1F1F1F]/60 w-32">Total</th>
                              <th className="w-12"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.items.map((item) => (
                              <tr key={item.id} className="border-b border-[#E0D9CF]/50">
                                <td className="py-3 px-4">
                                  <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => updateItem(category.id, item.id, 'description', e.target.value)}
                                    placeholder="Item description"
                                    className="w-full px-3 py-2 border border-[#E0D9CF] rounded-lg focus:border-[var(--brand-green)] focus:outline-none"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(category.id, item.id, 'quantity', parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-[#E0D9CF] rounded-lg focus:border-[var(--brand-green)] focus:outline-none text-center"
                                    min="0"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <input
                                    type="number"
                                    value={item.unitPrice}
                                    onChange={(e) => updateItem(category.id, item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-[#E0D9CF] rounded-lg focus:border-[var(--brand-green)] focus:outline-none text-right"
                                    min="0"
                                    step="1000"
                                  />
                                </td>
                                <td className="py-3 px-4 text-right font-semibold text-[#1F1F1F]">
                                  {formatCurrency(item.total)}
                                </td>
                                <td className="py-3 px-4">
                                  <button
                                    onClick={() => deleteItem(category.id, item.id)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <button
                      onClick={() => addItem(category.id)}
                      className="w-full py-3 border-2 border-dashed border-[#E0D9CF] rounded-xl text-[#1F1F1F]/60 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add Item
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addCategory}
                className="w-full py-4 border-2 border-dashed border-[#E0D9CF] rounded-2xl text-[#1F1F1F] hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] hover:bg-[var(--brand-green)]/5 transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <Plus className="w-5 h-5" />
                Add Category
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
            <h2 className="text-xl font-bold text-[#1F1F1F] mb-4">Internal Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this event, client preferences, special requirements, etc..."
              rows={12}
              className="w-full px-4 py-3 border-2 border-[#E0D9CF] rounded-xl focus:border-[var(--brand-green)] focus:outline-none resize-none"
            />
            <div className="mt-4 flex justify-end">
              <button className="px-6 py-3 bg-[var(--brand-green)] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <Save className="w-5 h-5" />
                Save Notes
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Sparkles, Users, Calendar, Utensils, Heart, Briefcase, Cake, Wrench } from 'lucide-react'

type EventType = 'wedding' | 'corporate' | 'birthday' | 'other'
type ServiceType = 'planning' | 'catering' | 'decor' | 'full'

interface WizardData {
  eventType: EventType | null
  guestCount: number
  services: ServiceType[]
  date: string
  budget: string
  name: string
  email: string
  phone: string
  venue: string
  message: string
}

export default function EventWizard() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [wizardData, setWizardData] = useState<WizardData>({
    eventType: null,
    guestCount: 50,
    services: [],
    date: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    venue: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const eventTypes = [
    { id: 'wedding' as EventType, name: 'Wedding', Icon: Heart },
    { id: 'corporate' as EventType, name: 'Corporate', Icon: Briefcase },
    { id: 'birthday' as EventType, name: 'Birthday', Icon: Cake },
    { id: 'other' as EventType, name: 'Other', Icon: Sparkles },
  ]

  const services = [
    { id: 'planning' as ServiceType, name: 'Event Planning', icon: Calendar, desc: 'Full coordination' },
    { id: 'catering' as ServiceType, name: 'Catering', icon: Utensils, desc: 'Delicious menus' },
    { id: 'decor' as ServiceType, name: 'Décor & Styling', icon: Sparkles, desc: 'Beautiful setups' },
    { id: 'full' as ServiceType, name: 'Complete Package', icon: Check, desc: 'Everything included' },
  ]

  const toggleService = (serviceId: ServiceType) => {
    if (serviceId === 'full') {
      setWizardData({ ...wizardData, services: ['full'] })
    } else {
      const filtered = wizardData.services.filter(s => s !== 'full')
      if (filtered.includes(serviceId)) {
        setWizardData({ ...wizardData, services: filtered.filter(s => s !== serviceId) })
      } else {
        setWizardData({ ...wizardData, services: [...filtered, serviceId] })
      }
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/event-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: wizardData.name,
          email: wizardData.email,
          phone: wizardData.phone,
          eventType: wizardData.eventType,
          eventDate: wizardData.date,
          guestCount: wizardData.guestCount,
          budgetRange: wizardData.budget,
          venue: wizardData.venue,
          message: `Services: ${wizardData.services.join(', ')}. ${wizardData.message}`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Success - show tracking code and reset
        const trackingCode = data.trackingCode
        alert(
          `🎉 Event Request Submitted!\n\n` +
          `Your Tracking Code: ${trackingCode}\n\n` +
          `Save this code to track your event status anytime.\n` +
          `We'll contact you at ${wizardData.email} soon!`
        )
        
        setIsOpen(false)
        setStep(1)
        setWizardData({
          eventType: null,
          guestCount: 50,
          services: [],
          date: '',
          budget: '',
          name: '',
          email: '',
          phone: '',
          venue: '',
          message: '',
        })
      } else {
        setSubmitError(data.error || 'Failed to submit request')
      }
    } catch (error) {
      setSubmitError('Network error. Please try again.')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mx-auto block px-8 py-4 bg-[var(--brand-green)] text-white rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
      >
        <Wrench className="w-5 h-5" />
        Build Your Event
      </motion.button>

      {/* Wizard Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FDFBF8] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E7E1D8]"
            >
              {/* Header */}
              <div className="bg-[var(--brand-green)] p-6 rounded-t-3xl">
                <h2 className="text-3xl font-bold text-white text-center font-display">Build Your Perfect Event</h2>
                <div className="flex justify-center mt-4 gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className={`h-[6px] rounded-full transition-all ${
                        s <= step ? 'w-12 bg-white' : 'w-8 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Event Type */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <h3 className="text-2xl font-bold mb-6 text-gray-800">What type of event?</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {eventTypes.map((type) => (
                          <motion.button
                            key={type.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setWizardData({ ...wizardData, eventType: type.id })}
                            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center ${
                              wizardData.eventType === type.id
                                ? 'border-[var(--brand-green)] bg-[var(--brand-green)] text-white'
                                : 'border-[#E0D9CF] hover:border-[var(--brand-green)]'
                            }`}
                          >
                            <type.Icon className={`w-7 h-7 mb-2 ${wizardData.eventType === type.id ? 'text-white' : 'text-[var(--brand-green)]'}`} />
                            <div className="font-semibold">{type.name}</div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Services */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <h3 className="text-2xl font-bold mb-6 text-[#1F1F1F]">What services do you need?</h3>
                      <div className="space-y-3">
                        {services.map((service) => {
                          const Icon = service.icon
                          const isSelected = wizardData.services.includes(service.id)
                          return (
                            <motion.button
                              key={service.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleService(service.id)}
                              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                                isSelected
                                  ? 'border-[var(--brand-green)] bg-[#EAF0EC]'
                                  : 'border-[#E0D9CF] hover:border-[var(--brand-green)]'
                              }`}
                            >
                              <div className={`p-3 rounded-lg ${isSelected ? 'bg-[var(--brand-green)]' : 'bg-[#F3EEE6]'}`}>
                                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[var(--brand-green)]'}`} />
                              </div>
                              <div className="flex-1 text-left">
                                <div className="font-semibold text-[#1F1F1F]">{service.name}</div>
                                <div className="text-sm text-[#1F1F1F]/60">{service.desc}</div>
                              </div>
                              {isSelected && <Check className="w-6 h-6 text-[var(--brand-green)]" />}
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Guest Count & Date */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-lg font-semibold mb-3 text-[#1F1F1F]">
                          Number of Guests: {wizardData.guestCount}
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="500"
                          step="10"
                          value={wizardData.guestCount}
                          onChange={(e) => setWizardData({ ...wizardData, guestCount: parseInt(e.target.value) })}
                          className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-[#E0D9CF]"
                        />
                        <div className="flex justify-between text-sm text-[#1F1F1F]/60 mt-2">
                          <span>10</span>
                          <span>500+</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-semibold mb-3 text-[#1F1F1F]">Event Date</label>
                        <input
                          type="date"
                          value={wizardData.date}
                          onChange={(e) => setWizardData({ ...wizardData, date: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-[#E0D9CF] rounded-xl focus:border-[var(--brand-green)] focus:outline-none bg-white"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Contact Info */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-bold mb-6 text-[#1F1F1F]">Your Contact Information</h3>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#1F1F1F]">Full Name *</label>
                        <input
                          type="text"
                          value={wizardData.name}
                          onChange={(e) => setWizardData({ ...wizardData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border-2 border-[#E0D9CF] rounded-xl focus:border-[var(--brand-green)] focus:outline-none bg-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#1F1F1F]">Email Address *</label>
                        <input
                          type="email"
                          value={wizardData.email}
                          onChange={(e) => setWizardData({ ...wizardData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 border-2 border-[#E0D9CF] rounded-xl focus:border-[var(--brand-green)] focus:outline-none bg-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#1F1F1F]">Phone Number</label>
                        <input
                          type="tel"
                          value={wizardData.phone}
                          onChange={(e) => setWizardData({ ...wizardData, phone: e.target.value })}
                          placeholder="+255 XXX XXX XXX"
                          className="w-full px-4 py-3 border-2 border-[#E0D9CF] rounded-xl focus:border-[var(--brand-green)] focus:outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#1F1F1F]">Venue / Location</label>
                        <input
                          type="text"
                          value={wizardData.venue}
                          onChange={(e) => setWizardData({ ...wizardData, venue: e.target.value })}
                          placeholder="e.g., Dar es Salaam, Hyatt Regency"
                          className="w-full px-4 py-3 border-2 border-[#E0D9CF] rounded-xl focus:border-[var(--brand-green)] focus:outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#1F1F1F]">Additional Details</label>
                        <textarea
                          value={wizardData.message}
                          onChange={(e) => setWizardData({ ...wizardData, message: e.target.value })}
                          placeholder="Any special requests or details about your event..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-[#E0D9CF] rounded-xl focus:border-[var(--brand-green)] focus:outline-none bg-white resize-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Budget & Submit */}
                  {step === 5 && (
                    <motion.div
                      key="step4"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-lg font-semibold mb-3 text-[#1F1F1F]">Budget Range (TZS)</label>
                        <select
                          value={wizardData.budget}
                          onChange={(e) => setWizardData({ ...wizardData, budget: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-[#E0D9CF] rounded-xl focus:border-[var(--brand-green)] focus:outline-none bg-white"
                        >
                          <option value="">Select budget range</option>
                          <option value="1-3M">1M - 3M TZS</option>
                          <option value="3-5M">3M - 5M TZS</option>
                          <option value="5-10M">5M - 10M TZS</option>
                          <option value="10M+">10M+ TZS</option>
                        </select>
                      </div>

                      <div className="bg-[#FDFBF8] p-6 rounded-2xl border border-[#E0D9CF] shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-[var(--brand-green)]/10 text-[var(--brand-green)] flex items-center justify-center">
                            {(() => {
                              const t = eventTypes.find(e => e.id === wizardData.eventType)
                              const TI = t ? t.Icon : Sparkles
                              return <TI className="w-5 h-5" />
                            })()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#1F1F1F] leading-tight">Your Event Summary</h4>
                            <p className="text-xs text-[#1F1F1F]/60">Review details before sending your request</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="rounded-xl border border-[#EDE7DE] p-4 bg-[#F8F4EE]">
                            <div className="text-xs text-[#1F1F1F]/60">Event Type</div>
                            <div className="font-medium text-[#1F1F1F] capitalize">{wizardData.eventType || 'Not set'}</div>
                          </div>
                          <div className="rounded-xl border border-[#EDE7DE] p-4 bg-[#F8F4EE]">
                            <div className="text-xs text-[#1F1F1F]/60">Guests</div>
                            <div className="font-medium text-[#1F1F1F]">{wizardData.guestCount}</div>
                          </div>
                          <div className="rounded-xl border border-[#EDE7DE] p-4 bg-[#F8F4EE]">
                            <div className="text-xs text-[#1F1F1F]/60">Date</div>
                            <div className="font-medium text-[#1F1F1F]">{wizardData.date || 'Not set'}</div>
                          </div>
                          <div className="rounded-xl border border-[#EDE7DE] p-4 bg-[#F8F4EE]">
                            <div className="text-xs text-[#1F1F1F]/60">Budget</div>
                            <div className="font-medium text-[#1F1F1F]">{wizardData.budget || 'Not set'}</div>
                          </div>
                          <div className="sm:col-span-2 rounded-xl border border-[#EDE7DE] p-4 bg-[#F8F4EE]">
                            <div className="text-xs text-[#1F1F1F]/60 mb-2">Selected Services</div>
                            <div className="flex flex-wrap gap-2">
                              {wizardData.services.length ? (
                                wizardData.services.map((s) => (
                                  <span key={s} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[var(--brand-green)]/10 text-[var(--brand-green)] border border-[var(--brand-green)]/20 capitalize">
                                    {s}
                                  </span>
                                ))
                              ) : (
                                <span className="text-sm text-[#1F1F1F]/60">No services selected</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-6 border-t flex flex-col gap-3">
                {submitError && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {submitError}
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      disabled={isSubmitting}
                      className="px-6 py-3 border-2 border-[#E0D9CF] rounded-full font-semibold hover:bg-[#F6F1E9] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  )}
                  {step < 5 ? (
                    <button
                      onClick={() => setStep(step + 1)}
                      disabled={
                        (step === 1 && !wizardData.eventType) ||
                        (step === 4 && (!wizardData.name || !wizardData.email))
                      }
                      className="ml-auto px-6 py-3 bg-[var(--brand-green)] text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="ml-auto px-6 py-3 bg-[var(--brand-green)] text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Send Request'}
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

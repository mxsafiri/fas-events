'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Sparkles, Wrench, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Import step components
import Step1EventCategory from './wizard-steps/Step1EventCategory'
import Step2EventType from './wizard-steps/Step2EventType'
import Step3MenuCategory from './wizard-steps/Step3MenuCategory'
import Step4MenuSelection from './wizard-steps/Step4MenuSelection'
import Step5GuestDate from './wizard-steps/Step5GuestDate'
import Step6Contact from './wizard-steps/Step6Contact'
import Step7Decor from './wizard-steps/Step7Decor'
import Step7Review from './wizard-steps/Step7Review'
import SubmissionSuccessModal from './SubmissionSuccessModal'

type EventCategory = 'social' | 'corporate'
type SocialEventType = 'wedding' | 'sendoff' | 'kitchen-party' | 'engagement' | 'birthday' | 'anniversary' | 'baby-shower' | 'bridal-shower' | 'graduation' | 'reunion' | 'other'
type CorporateEventType = 'conference' | 'workshop' | 'product-launch' | 'networking' | 'award-ceremony' | 'corporate-retreat' | 'agm' | 'other'
type MenuCategory = 'swahili' | 'asian' | 'mediterranean' | 'bbq'
type MenuSection = 'appetizers' | 'soups' | 'salads' | 'grill' | 'pot' | 'desserts'
type DecorTheme = 'elegant' | 'modern' | 'traditional' | 'beach' | 'garden' | 'luxury' | 'rustic' | 'minimalist'

interface WizardData {
  eventCategory: EventCategory | null
  eventType: SocialEventType | CorporateEventType | null
  guestCount: number
  menuCategory: MenuCategory | null
  menuSections: Record<MenuSection, string[]>
  date: string
  venue: string
  name: string
  email: string
  phone: string
  message: string
  decorTheme: DecorTheme | null
  decorVision: string
  decorColors: string[]
  inspirationImages: File[]
  budget: string
}

export default function EventWizard() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [trackingCode, setTrackingCode] = useState('')
  
  const [wizardData, setWizardData] = useState<WizardData>({
    eventCategory: null,
    eventType: null,
    guestCount: 50,
    menuCategory: null,
    menuSections: {
      appetizers: [],
      soups: [],
      salads: [],
      grill: [],
      pot: [],
      desserts: [],
    },
    date: '',
    venue: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    decorTheme: null,
    decorVision: '',
    decorColors: [],
    inspirationImages: [],
    budget: '',
  })

  const updateField = (field: string, value: any) => {
    setWizardData({ ...wizardData, [field]: value })
  }

  const updateMenuSection = (section: MenuSection, items: string[]) => {
    setWizardData({
      ...wizardData,
      menuSections: {
        ...wizardData.menuSections,
        [section]: items,
      },
    })
  }

  const canGoNext = (): boolean => {
    switch (step) {
      case 1:
        return !!wizardData.eventCategory
      case 2:
        return !!wizardData.eventType
      case 3:
        return !!wizardData.menuCategory
      case 4:
        return true // Menu selection is optional
      case 5:
        return !!wizardData.date
      case 6:
        return !!(wizardData.name && wizardData.email && wizardData.phone)
      case 7:
        return true // Décor is optional
      case 8:
        return !!wizardData.budget
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Convert image files to base64 for JSON transmission
      const imagePromises = wizardData.inspirationImages.map(file => {
        return new Promise<{name: string, data: string, type: string}>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve({
              name: file.name,
              data: reader.result as string,
              type: file.type
            })
          }
          reader.readAsDataURL(file)
        })
      })
      
      const inspirationImagesData = await Promise.all(imagePromises)

      const response = await fetch('/api/event-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Contact Information
          name: wizardData.name,
          email: wizardData.email,
          phone: wizardData.phone,
          message: wizardData.message,
          
          // Event Details
          eventCategory: wizardData.eventCategory,
          eventType: wizardData.eventType,
          eventDate: wizardData.date,
          guestCount: wizardData.guestCount,
          venue: wizardData.venue,
          budgetRange: wizardData.budget,
          
          // Menu Information
          menuCategory: wizardData.menuCategory,
          menuSections: wizardData.menuSections,
          
          // Décor & Styling
          decorTheme: wizardData.decorTheme,
          decorVision: wizardData.decorVision,
          decorColors: wizardData.decorColors,
          inspirationImages: inspirationImagesData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setTrackingCode(data.trackingCode)
        setShowSuccessModal(true)
        setIsOpen(false)
        setStep(1)
        setWizardData({
          eventCategory: null,
          eventType: null,
          guestCount: 50,
          menuCategory: null,
          menuSections: {
            appetizers: [],
            soups: [],
            salads: [],
            grill: [],
            pot: [],
            desserts: [],
          },
          date: '',
          venue: '',
          name: '',
          email: '',
          phone: '',
          message: '',
          decorTheme: null,
          decorVision: '',
          decorColors: [],
          inspirationImages: [],
          budget: '',
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

  const steps = [
    { num: 1, label: 'Category' },
    { num: 2, label: 'Event Type' },
    { num: 3, label: 'Menu' },
    { num: 4, label: 'Items' },
    { num: 5, label: 'Details' },
    { num: 6, label: 'Contact' },
    { num: 7, label: 'Décor' },
    { num: 8, label: 'Review' },
  ]

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:flex md:items-center md:justify-center md:p-4"
            onClick={(e) => {
              // Only allow close on desktop when clicking backdrop
              if (window.innerWidth >= 768 && e.target === e.currentTarget) {
                setIsOpen(false)
              }
            }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-0 md:relative md:inset-auto md:rounded-3xl bg-white shadow-2xl w-full md:max-w-5xl min-h-screen md:min-h-0 md:max-h-[90vh] overflow-hidden flex flex-col z-[60]"
            >
              {/* Header with Progress Stepper */}
              <div className="bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green-2)] p-4 md:p-6 relative">
                {/* Close button for mobile */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="md:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Close wizard"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-4 md:mb-6 pr-8 md:pr-0">
                  Build Your Perfect Event
                </h2>
                <div className="flex items-center justify-between max-w-4xl mx-auto overflow-x-auto pb-2">
                  {steps.map((s, idx) => (
                    <div key={s.num} className="flex items-center flex-shrink-0">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all ${
                            s.num < step
                              ? 'bg-white text-[var(--brand-green)]'
                              : s.num === step
                              ? 'bg-white text-[var(--brand-green)] ring-4 ring-white/30'
                              : 'bg-white/20 text-white/60'
                          }`}
                        >
                          {s.num < step ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : s.num}
                        </div>
                        <span
                          className={`text-[10px] md:text-xs mt-1 font-medium hidden md:block ${
                            s.num <= step ? 'text-white' : 'text-white/50'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {idx < steps.length - 1 && (
                        <div
                          className={`w-4 md:w-8 lg:w-16 h-[2px] mx-1 lg:mx-2 transition-all ${
                            s.num < step ? 'bg-white' : 'bg-white/20'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <Step1EventCategory
                        selected={wizardData.eventCategory}
                        onSelect={(category) => updateField('eventCategory', category)}
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <Step2EventType
                        category={wizardData.eventCategory}
                        selected={wizardData.eventType}
                        onSelect={(type) => updateField('eventType', type)}
                      />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <Step3MenuCategory
                        selected={wizardData.menuCategory}
                        onSelect={(category) => updateField('menuCategory', category)}
                      />
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <Step4MenuSelection
                        menuSections={wizardData.menuSections}
                        onUpdate={updateMenuSection}
                      />
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <Step5GuestDate
                        guestCount={wizardData.guestCount}
                        date={wizardData.date}
                        venue={wizardData.venue}
                        onUpdate={updateField}
                      />
                    </motion.div>
                  )}

                  {step === 6 && (
                    <motion.div
                      key="step6"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <Step6Contact
                        name={wizardData.name}
                        email={wizardData.email}
                        phone={wizardData.phone}
                        message={wizardData.message}
                        onUpdate={updateField}
                      />
                    </motion.div>
                  )}

                  {step === 7 && (
                    <motion.div
                      key="step7"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <Step7Decor
                        decorTheme={wizardData.decorTheme}
                        decorVision={wizardData.decorVision}
                        decorColors={wizardData.decorColors}
                        onUpdate={updateField}
                        onFileUpload={(files) => updateField('inspirationImages', files)}
                        uploadedFiles={wizardData.inspirationImages}
                      />
                    </motion.div>
                  )}

                  {step === 8 && (
                    <motion.div
                      key="step8"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <Step7Review
                        data={wizardData}
                        onBudgetChange={(budget) => updateField('budget', budget)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100">
                {submitError && (
                  <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 text-xs font-bold">!</span>
                    </div>
                    {submitError}
                  </div>
                )}
                <div className="flex justify-between gap-3">
                  {step > 1 && (
                    <Button
                      onClick={() => setStep(step - 1)}
                      disabled={isSubmitting}
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  )}
                  {step < 8 ? (
                    <Button
                      onClick={() => setStep(step + 1)}
                      disabled={!canGoNext()}
                      size="lg"
                      className="ml-auto gap-2 bg-[var(--brand-green)] hover:bg-[var(--brand-green-2)]"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !canGoNext()}
                      size="lg"
                      className="ml-auto gap-2 bg-[var(--brand-green)] hover:bg-[var(--brand-green-2)]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Send Request
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <SubmissionSuccessModal
        isOpen={showSuccessModal}
        trackingCode={trackingCode}
        email={wizardData.email}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  )
}

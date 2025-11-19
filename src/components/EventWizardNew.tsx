'use client'

import { useState } from 'react'
import { Calendar, Users, MapPin, Utensils, Palette, CheckCircle, Sparkles } from 'lucide-react'
import WizardLayout from './wizard/WizardLayout'
import Step1EventType from './wizard/steps/Step1EventType'
import Step2EventDetails from './wizard/steps/Step2EventDetails'
import Step3Contact from './wizard/steps/Step3Contact'
import Step4MenuCategory from './wizard/steps/Step4MenuCategory'
import Step5MenuSelection from './wizard/steps/Step5MenuSelection'
import Step6Decor from './wizard/steps/Step6Decor'
import Step7Review from './wizard/steps/Step7Review'
import type { FormData as EventFormData } from './wizard/types'

const steps = [
  { id: 1, name: 'Event Type', icon: Sparkles },
  { id: 2, name: 'Details', icon: Calendar },
  { id: 3, name: 'Contact', icon: Users },
  { id: 4, name: 'Menu Style', icon: Utensils },
  { id: 5, name: 'Menu Items', icon: Utensils },
  { id: 6, name: 'Décor', icon: Palette },
  { id: 7, name: 'Review', icon: CheckCircle },
]

export default function EventWizardNew() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<EventFormData>({
    eventCategory: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    venue: '',
    needVenue: false,
    name: '',
    email: '',
    phone: '',
    menuCategory: '',
    menuPreferences: '',
    theme: '',
    colorScheme: { primary: '', secondary: '', accent: '' },
    inspirationImages: [],
    vision: '',
    specialRequests: '',
  })

  const updateFormData = (data: Partial<EventFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (canGoNext() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.eventCategory && formData.eventType)
      case 2:
        return !!(formData.eventDate && formData.guestCount && (formData.needVenue || formData.venue))
      case 3:
        return !!(formData.name && formData.email && formData.phone)
      case 4:
        return !!formData.menuCategory
      case 5:
        return true // Menu preferences are optional
      case 6:
        return true // Décor is optional
      case 7:
        return true
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    try {
      // Create FormData object for file upload
      const submitData = new FormData()
      
      // Add all form fields
      submitData.append('eventCategory', formData.eventCategory)
      submitData.append('eventType', formData.eventType)
      submitData.append('eventDate', formData.eventDate)
      submitData.append('guestCount', formData.guestCount)
      submitData.append('venue', formData.venue)
      submitData.append('needVenue', String(formData.needVenue))
      submitData.append('name', formData.name)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      submitData.append('menuCategory', formData.menuCategory)
      submitData.append('menuPreferences', formData.menuPreferences)
      submitData.append('theme', formData.theme)
      submitData.append('vision', formData.vision)
      submitData.append('specialRequests', formData.specialRequests)
      
      // Add images
      formData.inspirationImages.forEach((file, index) => {
        submitData.append(`inspirationImage${index}`, file)
      })

      const response = await fetch('/api/event-requests', {
        method: 'POST',
        body: submitData,
      })

      if (response.ok) {
        alert('🎉 Your event request has been submitted successfully! We\'ll contact you within 24 hours.')
        // Reset form or redirect
        window.location.href = '/'
      } else {
        alert('There was an error submitting your request. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your request. Please try again.')
    }
  }

  return (
    <WizardLayout
      steps={steps}
      currentStep={currentStep}
      onNext={currentStep === 7 ? handleSubmit : handleNext}
      onPrevious={handlePrevious}
      canGoNext={canGoNext()}
      isLastStep={currentStep === 7}
    >
      {currentStep === 1 && <Step1EventType formData={formData} updateFormData={updateFormData} />}
      {currentStep === 2 && <Step2EventDetails formData={formData} updateFormData={updateFormData} />}
      {currentStep === 3 && <Step3Contact formData={formData} updateFormData={updateFormData} />}
      {currentStep === 4 && <Step4MenuCategory formData={formData} updateFormData={updateFormData} />}
      {currentStep === 5 && <Step5MenuSelection formData={formData} updateFormData={updateFormData} />}
      {currentStep === 6 && <Step6Decor formData={formData} updateFormData={updateFormData} />}
      {currentStep === 7 && <Step7Review formData={formData} />}
    </WizardLayout>
  )
}

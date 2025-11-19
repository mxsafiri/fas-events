'use client'

import { ReactNode } from 'react'
import { CheckCircle, LucideIcon } from 'lucide-react'

interface Step {
  id: number
  name: string
  icon: LucideIcon
}

interface WizardLayoutProps {
  steps: Step[]
  currentStep: number
  children: ReactNode
  onNext: () => void
  onPrevious: () => void
  canGoNext: boolean
  isLastStep: boolean
}

export default function WizardLayout({
  steps,
  currentStep,
  children,
  onNext,
  onPrevious,
  canGoNext,
  isLastStep,
}: WizardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-white text-emerald-600 shadow-lg scale-110'
                        : 'bg-white/20 text-white/60'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs mt-2 font-medium text-white hidden md:block">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${
                      currentStep > step.id ? 'bg-white' : 'bg-white/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card with Glossy Effect */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          {children}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={onPrevious}
              disabled={currentStep === 1}
              className="px-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg"
            >
              {isLastStep ? 'Submit Request' : 'Next'} →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

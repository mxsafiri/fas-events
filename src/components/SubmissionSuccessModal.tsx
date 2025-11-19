'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Copy, Check, X } from 'lucide-react'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  trackingCode: string
  email: string
  onClose: () => void
}

export default function SubmissionSuccessModal({ isOpen, trackingCode, email, onClose }: Props) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header with Success Animation */}
            <div className="relative bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-green-2)] p-8 text-center">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Success icon with animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-[var(--brand-green)]" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Request Submitted!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-sm"
              >
                We've received your event details
              </motion.p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Tracking Code */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  Your Tracking Code
                </label>
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-5 flex items-center justify-between group hover:border-[var(--brand-green)] transition-colors">
                    <div className="font-mono text-2xl font-bold text-gray-900 tracking-wider">
                      {trackingCode}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="ml-4 p-3 rounded-xl bg-[var(--brand-green)] text-white hover:bg-[var(--brand-green-2)] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span className="text-sm font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          <span className="text-sm font-medium">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Information Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-900 leading-relaxed">
                      <strong className="font-semibold">Save this tracking code!</strong> You can use it to check your event status anytime.
                    </p>
                  </div>
                </div>
                <div className="pl-9">
                  <p className="text-sm text-blue-800">
                    We'll contact you at{' '}
                    <span className="font-semibold text-blue-900">{email}</span>{' '}
                    within 24 hours with your personalized quote.
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">What's Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      1
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Our team reviews your event details
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      2
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      We prepare a customized quote for you
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      3
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      You receive your quote via email within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="w-full py-4 bg-[var(--brand-green)] text-white rounded-2xl font-semibold text-lg hover:bg-[var(--brand-green-2)] transition-all shadow-md hover:shadow-lg"
              >
                Got It!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

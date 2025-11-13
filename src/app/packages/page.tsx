'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const packages = [
  {
    name: 'Essential',
    price: 'From 1.5M TZS',
    features: ['Event coordination', 'Basic décor', 'Vendor liaison'],
  },
  {
    name: 'Luxury',
    price: 'From 3.5M TZS',
    features: ['Full planning', 'Signature décor', 'Catering management', 'On‑site team'],
  },
  {
    name: 'Grand Gala',
    price: 'From 6M TZS',
    features: ['End‑to‑end planning', 'Premium décor & florals', 'Entertainment & media', 'Concierge support'],
  },
]

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE6] pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-[var(--brand-green)]"
        >
          Packages
        </motion.h1>
        <p className="text-[#1F1F1F]/70 max-w-2xl mb-12">Transparent tiers tailored to your celebration.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-[#E0D9CF] bg-[#FDFBF8] p-6 flex flex-col"
            >
              <h3 className="text-2xl font-semibold mb-2">{p.name}</h3>
              <div className="text-[var(--brand-green)] font-semibold mb-4">{p.price}</div>
              <ul className="space-y-2 mb-6 text-sm text-[#1F1F1F]/80">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--brand-green)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-auto px-5 py-3 rounded-full bg-[var(--brand-green)] text-white hover:opacity-95 transition">Select</button>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}

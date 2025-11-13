'use client'

import { motion } from 'framer-motion'
import { Calendar, Utensils, Sparkles, Camera, Music } from 'lucide-react'

const services = [
  { icon: Calendar, title: 'Planning & Coordination', desc: 'Concept, timeline, vendor management and on‑site execution.' },
  { icon: Utensils, title: 'Catering', desc: 'Curated menus, tastings and professional service teams.' },
  { icon: Sparkles, title: 'Décor & Styling', desc: 'Florals, tablescapes, lighting and ambience design.' },
  { icon: Camera, title: 'Photography & Videography', desc: 'Story‑driven coverage for your day.' },
  { icon: Music, title: 'Entertainment', desc: 'DJs, live bands and MCs tailored to the event.' },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE6] pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-[var(--brand-green)]"
        >
          Services
        </motion.h1>
        <p className="text-[#1F1F1F]/70 max-w-2xl mb-12">
          Full‑service planning, refined styling and seamless execution for weddings, corporate and private events.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-[#E0D9CF] bg-[#FDFBF8] p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-green)]/90 text-white flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-[#1F1F1F]/70 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

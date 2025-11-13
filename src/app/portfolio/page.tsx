'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const items = [
  { src: '/[image] - 6098959.jpeg', title: 'Serenity Wedding' },
  { src: '/[image] - 9806688.jpeg', title: 'Garden Reception' },
  { src: '/[image] - 8557707.jpeg', title: 'Classic Décor' },
  { src: '/[image] - 8048739.jpeg', title: 'Table Styling' },
  { src: '/[image] - 4082100.jpeg', title: 'Ceremony Aisle' },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE6] pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-[var(--brand-green)]"
        >
          Portfolio
        </motion.h1>
        <p className="text-[#1F1F1F]/70 max-w-2xl mb-12">A selection of recent celebrations and styling work.</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.src}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E0D9CF] bg-[#FDFBF8]"
            >
              <Image src={it.src} alt={it.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white font-medium">{it.title}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}

'use client'

import { motion } from 'framer-motion'

const services = [
  {
    key: 'catering',
    title: 'Catering',
    desc: 'Delicious menus crafted for you',
    img: '/[image] - 8048739.jpeg',
  },
  {
    key: 'decor',
    title: 'Décor',
    desc: 'Stunning setups that wow',
    img: '/[image] - 8557707.jpeg',
  },
  {
    key: 'planning',
    title: 'Planning',
    desc: 'We design your perfect day',
    img: '/[image] - 6098959.jpeg',
  },
  {
    key: 'execution',
    title: 'Execution',
    desc: 'Flawless delivery on your day',
    img: '/[image] - 9806688.jpeg',
  },
]

export default function ServicesShowcase() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {services.map((s, i) => (
        <motion.a
          href="#wizard"
          key={s.key}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="group relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/30 aspect-[4/5] min-h-[300px]"
        >
          {/* Image */}
          <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />

          {/* Darkening gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Gloss highlight */}
          <div className="pointer-events-none absolute -top-10 -left-10 w-56 h-56 rounded-full opacity-30 blur-2xl"
               style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.35), rgba(255,255,255,0.05), transparent 70%)' }}
          />

          {/* Glass bottom card */}
          <div className="absolute bottom-0 left-0 right-0 m-4 rounded-2xl glass-card p-5 backdrop-saturate-150">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
              <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-white/10 border border-white/15">Explore</span>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">{s.desc}</p>
            <div className="mt-4 flex gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[var(--accent)] text-black font-medium shadow-sm">Book now</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs glass-card">See samples</span>
            </div>
          </div>

          {/* Hover overlay and scale */}
          <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110" />
        </motion.a>
      ))}
    </div>
  )
}

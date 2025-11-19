'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Calendar, Utensils, Palette, ArrowDown } from 'lucide-react'
import EventWizard from '@/components/EventWizard'
import EventCarousel from '@/components/EventCarousel'
import ServicesShowcase from '@/components/ServicesShowcase'
import Typewriter from '@/components/Typewriter'
import { useRef } from 'react'

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const steps = [
    {
      icon: Calendar,
      title: 'Planning',
      desc: 'We design your perfect day',
      color: 'from-[#F59E0B] to-[#d97706]',
    },
    {
      icon: Utensils,
      title: 'Catering',
      desc: 'Delicious menus crafted for you',
      color: 'from-[#F59E0B] to-[#d97706]',
    },
    {
      icon: Palette,
      title: 'Décor',
      desc: 'Stunning setups that wow',
      color: 'from-[#F59E0B] to-[#d97706]',
    },
    {
      icon: Sparkles,
      title: 'Execution',
      desc: 'Flawless delivery on your day',
      color: 'from-[#F59E0B] to-[#d97706]',
    },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <section id="hero" className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Background video or image */}
        <div className="absolute inset-0">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline poster="/[image] - 6098959.jpeg">
            <source src="/SaveInsta.me_AQMzJWxKXsJT2wZC85yyKnkdl_D8lmyzRp6McELR_bmt5GFNmVzUkLGXpEeY63eAFYeAyGCj1ie2NpXXiVCU9UuQmufSiWkx4as7Se0.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-center md:text-left text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Typewriter
                texts={[
                  'Build Your Event',
                  'Build with your theme & budget',
                  'Build with FAS',
                ]}
                highlightWords={[
                  { word: 'Event', className: 'text-[var(--accent)]' },
                  { word: 'budget', className: 'text-[var(--accent)]' },
                  { word: 'FAS', className: 'text-[var(--accent)]' },
                ]}
                hold={1500}
                loop
              />
            </motion.h1>

            <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-6 items-center md:justify-start justify-center z-10 relative">
              <motion.a
                href="#wizard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full font-semibold text-lg bg-[var(--accent)] text-black shadow-lg shadow-black/30"
              >
                Build Your Event with us
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full font-semibold text-lg glass-card text-white"
              >
                Explore Services
              </motion.a>
            </div>

            {/* Floating chips inspiration */}
            <div className="hidden md:block mt-10 relative">
              <div className="absolute -top-8 left-0 glass-card px-4 py-2 rounded-full text-sm">Premium Décor</div>
              <div className="absolute -top-16 right-20 glass-card px-4 py-2 rounded-full text-sm">Signature Catering</div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pointer-events-none z-0 absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2"
          >
            <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-white animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* Event Journey (minimal) */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Catering & Décor Services
          </motion.h2>

          <ServicesShowcase />
        </div>
      </section>

      {/* Past Events Carousel */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Our Events</h2>
            <p className="text-base text-white/70">A showcase of unforgettable moments</p>
          </motion.div>

          <EventCarousel />
        </div>
      </section>

      {/* Wizard Anchor */}
      <section id="wizard" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-10">Build Your Event with us</motion.h2>
          <div className="glass-card rounded-3xl p-6">
            <EventWizard />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 spotlight" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-16 h-16 text-[var(--accent)] mx-auto mb-6" />
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Let's Create Something Unforgettable</h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">From intimate gatherings to grand celebrations, we bring your vision to life</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#wizard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[var(--accent)] text-black rounded-full font-semibold text-lg shadow-2xl"
              >
                Build Your Event with us
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-card text-white rounded-full font-semibold text-lg border border-white/10"
              >
                Explore Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky FAB to wizard */}
      <a href="#wizard" className="fixed bottom-6 right-6 z-40 px-5 py-4 rounded-full bg-[var(--accent)] text-black font-semibold shadow-xl">Build Your Event with us</a>
    </div>
  )
}

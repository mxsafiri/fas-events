'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Modern Serenity Wedding',
    type: 'Wedding',
    location: 'Kunduchi Beach',
    image: '/images/6098959.jpeg',
  },
  {
    id: 2,
    title: 'Garden Reception',
    type: 'Wedding',
    location: 'Msasani',
    image: '/images/9806688.jpeg',
  },
  {
    id: 3,
    title: 'Classic Décor Showcase',
    type: 'Décor',
    location: 'Dar es Salaam',
    image: '/images/8557707.jpeg',
  },
  {
    id: 4,
    title: 'Elegant Table Setup',
    type: 'Catering & Styling',
    location: 'City Center',
    image: '/images/8048739.jpeg',
  },
  {
    id: 5,
    title: 'Ceremony Aisle',
    type: 'Wedding',
    location: 'Serenity Gardens',
    image: '/images/4082100.jpeg',
  },
]

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % events.length
      }
      return prev === 0 ? events.length - 1 : prev - 1
    })
  }

  return (
    <div className="relative w-full h-[560px] overflow-hidden rounded-3xl bg-black/40 glass-card">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className="absolute w-full h-full"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={events[currentIndex].image}
              alt={events[currentIndex].title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={currentIndex === 0}
            />
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex items-end p-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white"
            >
              <div className="inline-block px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-xs tracking-wide uppercase mb-3 border border-white/20">
                {events[currentIndex].type}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2 font-display">{events[currentIndex].title}</h3>
              <p className="text-base md:text-lg text-white/80 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {events[currentIndex].location}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`transition-all rounded-full ${index === currentIndex ? 'w-8 h-[6px] bg-white' : 'w-3 h-[6px] bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

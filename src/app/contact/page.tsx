'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendWhatsapp = () => {
    const text = `New enquiry\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    window.open(`https://wa.me/255XXXXXXXXX?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-[#F3EEE6] pt-28 pb-20">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-[var(--brand-green)]"
        >
          Contact
        </motion.h1>
        <p className="text-[#1F1F1F]/70 max-w-2xl mb-10">Tell us about your event and we’ll get back to you.</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[#E0D9CF] bg-[#FDFBF8] p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input className="px-4 py-3 rounded-xl border border-[#E0D9CF] bg-white" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
              <input className="px-4 py-3 rounded-xl border border-[#E0D9CF] bg-white" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <textarea className="mt-4 w-full px-4 py-3 rounded-xl border border-[#E0D9CF] bg-white min-h-[140px]" placeholder="Tell us about your event..." value={message} onChange={e=>setMessage(e.target.value)} />
            <div className="mt-4 flex gap-3">
              <button className="px-5 py-3 rounded-full bg-[var(--brand-green)] text-white hover:opacity-95 transition flex items-center gap-2"><Mail className="w-4 h-4"/>Send Email</button>
              <button onClick={sendWhatsapp} className="px-5 py-3 rounded-full border border-[var(--brand-green)] text-[var(--brand-green)] hover:bg-[var(--brand-green)] hover:text-white transition flex items-center gap-2"><MessageCircle className="w-4 h-4"/>WhatsApp</button>
              <a href="tel:+255XXXXXXXXX" className="px-5 py-3 rounded-full border border-[#E0D9CF] text-[#1F1F1F] hover:bg-[#F6F1E9] transition flex items-center gap-2"><Phone className="w-4 h-4"/>Call</a>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E0D9CF] bg-[#FDFBF8] p-6">
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-[#1F1F1F]/70 mb-4">Dar es Salaam, Tanzania</p>
            <div className="aspect-video rounded-xl overflow-hidden bg-[#E9E3DA] flex items-center justify-center text-[#1F1F1F]/50">
              Map Placeholder
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const paymentMethods = [
    { name: 'M-Pesa', color: 'text-green-600' },
    { name: 'Tigo Pesa', color: 'text-blue-600' },
    { name: 'Airtel Money', color: 'text-red-600' },
  ]

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Packages', href: '/packages' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-[#1F1F1F] text-[#F3EEE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold font-display"
            >
              Fas Exclusive
            </motion.h3>
            <p className="text-[#F3EEE6]/80 text-sm">
              Creating memorable moments in Dar es Salaam. Full-service event planning, catering & décor.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com/fasexclusive"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#F3EEE6]/80 hover:text-[var(--brand-green-2)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-display">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-[#F3EEE6]/80">
                <Phone className="w-4 h-4 text-[var(--brand-green-2)]" />
                <span>+255 XXX XXX XXX</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-[#F3EEE6]/80">
                <Mail className="w-4 h-4 text-[var(--brand-green-2)]" />
                <span>fasexclusive@email.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-[#F3EEE6]/80">
                <MapPin className="w-4 h-4 text-[var(--brand-green-2)]" />
                <span>Dar es Salaam, Tanzania</span>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-display">Payments Accepted</h4>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.name}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2"
                >
                  <div className={`w-2 h-2 rounded-full bg-[var(--brand-green-2)]`} />
                  <span className="text-sm text-[#F3EEE6]/80">{method.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-[#F3EEE6]/60">
              © {currentYear} Fas Exclusive Planners. All rights reserved.
            </p>
            <p className="text-sm text-[#F3EEE6]/60">
              Follow us{' '}
              <a
                href="https://instagram.com/fasexclusive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-green-2)] hover:text-white transition-colors"
              >
                @fasexclusive
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

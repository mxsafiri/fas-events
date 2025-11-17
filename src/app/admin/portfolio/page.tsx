'use client'

import { Construction } from 'lucide-react'

export default function AdminPortfolioPage() {
  return (
    <div className="bg-white rounded-2xl border border-[#E0D9CF] p-12 text-center">
      <Construction className="w-16 h-16 text-[var(--brand-green)] mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-[#1F1F1F] mb-2">Portfolio Management</h2>
      <p className="text-[#1F1F1F]/70">Coming soon - Manage your portfolio items here</p>
    </div>
  )
}

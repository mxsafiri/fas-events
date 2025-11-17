'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Image, Settings, LogOut } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Event Requests', href: '/admin/requests', icon: FileText },
    { name: 'Portfolio', href: '/admin/portfolio', icon: Image },
    { name: 'Carousel', href: '/admin/carousel', icon: LayoutDashboard },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#F3EEE6]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-[#E0D9CF] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold font-display text-[var(--brand-green)]">
                FAS Exclusive
              </Link>
              <span className="px-3 py-1 bg-[var(--brand-green)]/10 text-[var(--brand-green)] text-xs font-semibold rounded-full">
                Admin Portal
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="px-4 py-2 text-sm text-[#1F1F1F] hover:text-[var(--brand-green)] transition-colors font-medium"
              >
                View Site
              </Link>
              <button className="px-4 py-2 text-sm text-[#1F1F1F] hover:text-red-600 transition-colors flex items-center gap-2 font-medium">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-4 sticky top-24 shadow-sm">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                        isActive
                          ? 'bg-[var(--brand-green)] text-white shadow-md'
                          : 'text-[#1F1F1F] hover:bg-[var(--brand-green)]/5 hover:text-[var(--brand-green)]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}

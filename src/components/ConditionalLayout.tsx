'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    // Admin routes - no navbar/footer, just children
    return <>{children}</>
  }

  // Public routes - include navbar and footer
  return (
    <div className="relative min-h-screen spotlight">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

// Keep backward compatibility
export { LayoutProvider as ConditionalLayout }

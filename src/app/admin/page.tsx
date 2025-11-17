'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminHomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to requests page by default
    router.push('/admin/requests')
  }, [router])

  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--brand-green)] border-t-transparent"></div>
    </div>
  )
}

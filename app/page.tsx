'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import Login from '@/components/auth/Login'

export default function Home() {
  const { user } = useMarketplace()
  const router = useRouter()

  // Check if user is authenticated and redirect to marketplace
  useEffect(() => {
    if (user) {
      router.push('/marketplace')
    }
  }, [user, router])

  // If user is authenticated, show loading while redirecting
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#061028] text-white font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Redirecting to marketplace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#061028] text-white font-sans">
      <Login onLogin={() => router.push('/marketplace')} />
    </div>
  )
}

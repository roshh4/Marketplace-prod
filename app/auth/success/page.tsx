'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import Spinner from '@/components/ui/Spinner'
import { GoogleUser } from '@/lib/googleAuth'
import { useMarketplace } from '@/components/context/MarketplaceContext'

export default function AuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { updateUser } = useMarketplace()
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<GoogleUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        // Extract tokens and user info from URL parameters
        const accessToken = searchParams.get('access_token')
        const refreshToken = searchParams.get('refresh_token')
        const userInfoParam = searchParams.get('user_info')

        if (!accessToken || !userInfoParam) {
          setError('Missing required authentication data')
          setLoading(false)
          return
        }

        // Parse user info
        const parsedUserInfo: GoogleUser = JSON.parse(userInfoParam)
        setUserInfo(parsedUserInfo)

        // Store tokens in localStorage
        localStorage.setItem('google_access_token', accessToken)
        if (refreshToken) {
          localStorage.setItem('google_refresh_token', refreshToken)
        }
        localStorage.setItem('google_user_info', userInfoParam)

        // Update marketplace context with user info
        updateUser({
          id: parsedUserInfo.id,
          name: parsedUserInfo.name,
          avatar: parsedUserInfo.picture,
        })

        setLoading(false)

        // Redirect to main marketplace after successful authentication
        setTimeout(() => {
          router.push('/')
        }, 2000)

      } catch (error) {
        console.error('Error processing authentication success:', error)
        setError('Failed to process authentication data')
        setLoading(false)
      }
    }

    handleAuthSuccess()
  }, [searchParams, router, updateUser])

  const handleContinue = () => {
    router.push('/')
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={32} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-red-400">Authentication Error</h1>
          <p className="text-sm opacity-70 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            Return to Home
          </button>
        </GlassCard>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <Spinner />
          <p className="mt-4 text-sm opacity-70">Setting up your account...</p>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle size={32} className="text-green-400" />
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
          <p className="text-sm opacity-70 mb-6">
            You've successfully signed in with Google
          </p>

          {userInfo && (
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg mb-6">
              <img 
                src={userInfo.picture} 
                alt={userInfo.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-left">
                <div className="font-medium">{userInfo.name}</div>
                <div className="text-sm opacity-70">{userInfo.email}</div>
              </div>
            </div>
          )}

          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 font-semibold hover:from-indigo-600 hover:to-cyan-500 transition-all duration-200"
          >
            Continue to Marketplace
          </button>
        </GlassCard>
      </motion.div>
    </div>
  )
}

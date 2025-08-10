'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import Spinner from '@/components/ui/Spinner'
import { GoogleUser } from '@/lib/googleAuth'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import { uid } from '@/lib/utils'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { updateUser } = useMarketplace()
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<GoogleUser | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: 'Rajalakshmi Engineering College',
    year: '3rd Year',
    department: '',
    phoneNumber: ''
  })

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for different authentication methods
        const accessToken = searchParams.get('access_token')
        const refreshToken = searchParams.get('refresh_token')
        const userInfoParam = searchParams.get('user_info')
        const isDemoUser = searchParams.get('demo_user')
        const isGmailUser = searchParams.get('gmail_user')
        const isMicrosoftUser = searchParams.get('microsoft_user')
        
        // Handle Google OAuth code (direct from Google)
        const code = searchParams.get('code')
        const error = searchParams.get('error')

        // Handle Google OAuth error
        if (error) {
          setError(`Google OAuth error: ${error}`)
          setLoading(false)
          return
        }

        // Handle Google OAuth code
        if (code) {
          try {
            // Exchange code for tokens using server-side API
            const response = await fetch('/api/auth/google/exchange', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ code }),
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.error || 'Failed to exchange code')
            }

            const { access_token, refresh_token, user_info } = await response.json()
            
            setUserInfo(user_info)

            // Store tokens in localStorage
            localStorage.setItem('google_access_token', access_token)
            if (refresh_token) {
              localStorage.setItem('google_refresh_token', refresh_token)
            }
            localStorage.setItem('google_user_info', JSON.stringify(user_info))

            // Pre-fill form with Google user data
            setFormData(prev => ({
              ...prev,
              fullName: user_info.name
            }))

            setLoading(false)
            setShowForm(true)
            return
          } catch (error) {
            console.error('Google OAuth error:', error)
            console.error('Error details:', {
              code: code ? 'present' : 'missing',
              errorMessage: error instanceof Error ? error.message : 'Unknown error'
            })
            setError(`Failed to authenticate with Google: ${error instanceof Error ? error.message : 'Unknown error'}`)
            setLoading(false)
            return
          }
        }

        // Handle demo user
        if (isDemoUser === 'true' && userInfoParam) {
          const parsedUserInfo = JSON.parse(userInfoParam)
          setUserInfo(parsedUserInfo)
          setFormData(prev => ({
            ...prev,
            fullName: parsedUserInfo.name
          }))
          setLoading(false)
          setShowForm(true)
          return
        }

        // Handle Gmail user
        if (isGmailUser === 'true' && userInfoParam) {
          const parsedUserInfo = JSON.parse(userInfoParam)
          setUserInfo(parsedUserInfo)
          setFormData(prev => ({
            ...prev,
            fullName: parsedUserInfo.name
          }))
          setLoading(false)
          setShowForm(true)
          return
        }

        // Handle Microsoft user
        if (isMicrosoftUser === 'true' && userInfoParam) {
          const parsedUserInfo = JSON.parse(userInfoParam)
          setUserInfo(parsedUserInfo)
          setFormData(prev => ({
            ...prev,
            fullName: parsedUserInfo.name
          }))
          setLoading(false)
          setShowForm(true)
          return
        }

        // Handle Google OAuth user
        if (accessToken && userInfoParam) {
          // Parse user info
          const parsedUserInfo: GoogleUser = JSON.parse(userInfoParam)
          setUserInfo(parsedUserInfo)

          // Store tokens in localStorage
          localStorage.setItem('google_access_token', accessToken)
          if (refreshToken) {
            localStorage.setItem('google_refresh_token', refreshToken)
          }
          localStorage.setItem('google_user_info', userInfoParam)

          // Pre-fill form with Google user data
          setFormData(prev => ({
            ...prev,
            fullName: parsedUserInfo.name
          }))

          setLoading(false)
          setShowForm(true)
          return
        }

        // If no valid authentication data found
        setError('Missing required authentication data')
        setLoading(false)

      } catch (error) {
        console.error('Error processing authentication callback:', error)
        setError('Failed to process authentication data')
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [searchParams])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      updateUser({ 
        id: uid("u"), 
        name: formData.fullName || userInfo?.name || "User", 
        avatar: userInfo?.picture || undefined, 
        year: formData.year, 
        department: formData.department || "CSE"
      })
      setLoading(false)
      router.push('/marketplace')
    }, 900 + Math.random() * 600)
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
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-4xl md:text-6xl font-extrabold">
            Welcome!
          </motion.h1>
          <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-sm opacity-80">
            You've successfully signed in. Please complete your student information to continue.
          </motion.p>
          
          {userInfo && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-lg"
            >
              <img 
                src={userInfo.picture} 
                alt={userInfo.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-medium">{userInfo.name}</div>
                <div className="text-sm opacity-70">{userInfo.email}</div>
              </div>
            </motion.div>
          )}
        </div>
        
        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              key="form"
              initial={{ scale: 0.98, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <div className="p-6 bg-gradient-to-b from-white/3 to-transparent">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Student Information</h3>
                    {userInfo && (
                      <div className="flex items-center gap-2">
                        <img 
                          src={userInfo.picture} 
                          alt={userInfo.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm opacity-70">{userInfo.email}</span>
                      </div>
                    )}
                  </div>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:border-indigo-400 focus:outline-none transition-colors text-white placeholder-gray-300"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">College Name</label>
                      <input
                        type="text"
                        value={formData.collegeName}
                        className="w-full p-3 bg-white/5 rounded-lg border border-white/20 text-gray-300 cursor-not-allowed"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">Year of Student</label>
                      <select
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                        className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:border-indigo-400 focus:outline-none transition-colors text-white"
                        required
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">Department</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:border-indigo-400 focus:outline-none transition-colors text-white placeholder-gray-300"
                        placeholder="e.g., Computer Science"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:border-indigo-400 focus:outline-none transition-colors text-white placeholder-gray-300"
                        placeholder="+91 xxxxx-xxxxx"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 font-semibold mt-6 hover:from-indigo-600 hover:to-cyan-500 transition-all duration-200"
                      disabled={loading}
                    >
                      {loading ? <Spinner /> : "Continue"}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

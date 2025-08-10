'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Chrome } from 'lucide-react'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import GlassCard from '@/components/ui/GlassCard'
import Spinner from '@/components/ui/Spinner'
import { uid } from '@/lib/utils'
import { generateGoogleAuthUrl } from '@/lib/googleAuth'

const Login: React.FC = () => {
  const { updateUser } = useMarketplace()
  const [loading, setLoading] = useState(false)
  const [showGmailForm, setShowGmailForm] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [gmailData, setGmailData] = useState({
    email: '',
    password: '',
    otp: ''
  })



  const handleSignInClick = (provider: string) => {
    if (provider === 'google') {
      handleGoogleSignIn()
    } else if (provider === 'gmail') {
      setShowGmailForm(true)
    } else if (provider === 'microsoft') {
      // For Microsoft user, redirect to callback page with demo data (since we don't have MS OAuth set up)
      const msUserInfo = {
        id: uid("u"),
        name: "Microsoft User",
        email: "user@outlook.com",
        picture: "https://via.placeholder.com/150"
      }
      
      const callbackUrl = new URL(`${window.location.origin}/auth/callback`)
      callbackUrl.searchParams.set('microsoft_user', 'true')
      callbackUrl.searchParams.set('user_info', JSON.stringify(msUserInfo))
      
      window.location.href = callbackUrl.toString()
    } else {
      // For demo user, redirect to callback page with demo data
      const demoUserInfo = {
        id: uid("u"),
        name: "Demo User",
        email: "demo@example.com",
        picture: "https://via.placeholder.com/150"
      }
      
      const callbackUrl = new URL(`${window.location.origin}/auth/callback`)
      callbackUrl.searchParams.set('demo_user', 'true')
      callbackUrl.searchParams.set('user_info', JSON.stringify(demoUserInfo))
      
      window.location.href = callbackUrl.toString()
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      // Redirect to Google OAuth
      const authUrl = generateGoogleAuthUrl()
      window.location.href = authUrl
    } catch (error) {
      console.error('Google Sign-In error:', error)
    }
  }



  const handleGmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpSent) {
      // Send OTP
      setLoading(true)
      setTimeout(() => {
        setOtpSent(true)
        setLoading(false)
      }, 1000)
    } else {
      // Verify OTP and redirect to callback page
      setLoading(true)
      setTimeout(() => {
        const gmailUserInfo = {
          id: uid("u"),
          name: gmailData.email.split('@')[0],
          email: gmailData.email,
          picture: "https://via.placeholder.com/150"
        }
        
        const callbackUrl = new URL(`${window.location.origin}/auth/callback`)
        callbackUrl.searchParams.set('gmail_user', 'true')
        callbackUrl.searchParams.set('user_info', JSON.stringify(gmailUserInfo))
        
        window.location.href = callbackUrl.toString()
      }, 1000)
    }
  }

  const handleGmailInputChange = (field: string, value: string) => {
    setGmailData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-4xl md:text-6xl font-extrabold">
            College Marketplace
          </motion.h1>
          <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-sm opacity-80">
            Buy, sell and chat with fellow students — built for campus life.
          </motion.p>
          
          <AnimatePresence mode="wait">
            {!showGmailForm && (
              <motion.div
                key="signin"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard>
                  <div className="space-y-3">
                    <p className="font-semibold">Sign in</p>
                    <div className="flex gap-3">
                      {[
                        { name: "Google", onClick: () => handleSignInClick("google"), icon: <Chrome size={16} />, className: "bg-white/6 hover:bg-white/8" },
                        { name: "Microsoft", onClick: () => handleSignInClick("microsoft"), icon: <User size={16} />, className: "bg-white/6 hover:bg-white/8" },
                        { name: "Gmail", onClick: () => handleSignInClick("gmail"), icon: <Mail size={16} />, className: "bg-white/6 hover:bg-white/8" },
                      ].map((p) => (
                        <button
                          key={p.name}
                          onClick={p.onClick}
                          className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${p.className}`}>
                          {p.icon} <span className="text-sm">{p.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => handleSignInClick("demo")}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 font-semibold">
                        Continue as Demo User
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence mode="wait">
          {!showGmailForm ? (
            <motion.div 
              key="tour"
              initial={{ scale: 0.98, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.98, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <div className="p-6 bg-gradient-to-b from-white/3 to-transparent h-full min-h-[320px]">
                  <h3 className="text-lg font-bold">Quick Tour</h3>
                  <ul className="mt-3 space-y-2 text-sm opacity-90">
                    <li>• Search and filter products instantly.</li>
                    <li>• Full-screen product views with gallery.</li>
                    <li>• Real-time chat simulation with sellers.</li>
                    <li>• List items with drag & drop upload.</li>
                  </ul>
                </div>
              </div>
            </motion.div>

          ) : showGmailForm ? (
            <motion.div
              key="gmail-form"
              initial={{ scale: 0.98, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <div className="p-6 bg-gradient-to-b from-white/3 to-transparent">
                  <h3 className="text-lg font-bold mb-4">Gmail Login</h3>
                  <form onSubmit={handleGmailSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email ID</label>
                      <input
                        type="email"
                        value={gmailData.email}
                        onChange={(e) => handleGmailInputChange('email', e.target.value)}
                        className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:border-indigo-400 focus:outline-none transition-colors text-white placeholder-gray-300"
                        placeholder="Enter your Gmail address"
                        required
                      />
                    </div>
                    
                    {!otpSent && (
                      <div>
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input
                          type="password"
                          value={gmailData.password}
                          onChange={(e) => handleGmailInputChange('password', e.target.value)}
                          className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:border-indigo-400 focus:outline-none transition-colors text-white placeholder-gray-300"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    )}
                    
                    {otpSent && (
                      <div>
                        <label className="block text-sm font-semibold mb-2">OTP Code</label>
                        <input
                          type="text"
                          value={gmailData.otp}
                          onChange={(e) => handleGmailInputChange('otp', e.target.value)}
                          className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:border-indigo-400 focus:outline-none transition-colors text-white placeholder-gray-300"
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          required
                        />
                        <p className="text-xs text-gray-300 mt-1">We've sent a 6-digit code to your email</p>
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 font-semibold mt-6 hover:from-indigo-600 hover:to-cyan-500 transition-all duration-200"
                      disabled={loading}
                    >
                      {loading ? <Spinner /> : (otpSent ? "Verify" : "Send OTP")}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Login

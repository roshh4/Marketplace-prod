'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, LogOut, Chrome } from 'lucide-react'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import GlassCard from '@/components/ui/GlassCard'
import Spinner from '@/components/ui/Spinner'
import { uid } from '@/lib/utils'
import { generateGoogleAuthUrl } from '@/lib/googleAuth'

interface LoginProps {
  onLogin: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { updateUser } = useMarketplace()
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showGmailForm, setShowGmailForm] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [gmailData, setGmailData] = useState({
    email: '',
    password: '',
    otp: ''
  })
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: 'Rajalakshmi Engineering College',
    year: '3rd Year',
    department: '',
    phoneNumber: ''
  })

  const [googleAccounts, setGoogleAccounts] = useState<Array<{
    email: string
    name: string
    picture: string
  }>>([])
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState<{
    email: string
    name: string
    picture: string
  } | null>(null)

  const handleSignInClick = (provider: string) => {
    if (provider === 'google') {
      handleGoogleSignIn()
    } else if (provider === 'gmail') {
      setShowGmailForm(true)
    } else {
      setShowForm(true)
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

  const handleGoogleAccountSelect = (account: typeof googleAccounts[0]) => {
    setSelectedGoogleAccount(account)
    setFormData(prev => ({
      ...prev,
      fullName: account.name
    }))
    setShowForm(true)
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
      // Verify OTP
      setLoading(true)
      setTimeout(() => {
        setShowGmailForm(false)
        setShowForm(true)
        setLoading(false)
      }, 1000)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      updateUser({ 
        id: uid("u"), 
        name: formData.fullName || "Avinash S.", 
        avatar: selectedGoogleAccount?.picture || undefined, 
        year: formData.year, 
        department: formData.department || "CSE"
      })
      setLoading(false)
      onLogin()
    }, 900 + Math.random() * 600)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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
            {!showForm && !showGmailForm && (
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
          {!showForm && !showGmailForm && googleAccounts.length === 0 ? (
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
          ) : googleAccounts.length > 0 && !showForm ? (
            <motion.div
              key="google-accounts"
              initial={{ scale: 0.98, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <div className="p-6 bg-gradient-to-b from-white/3 to-transparent">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Choose Google Account</h3>
                    <button
                      onClick={() => {
                        setGoogleAccounts([])
                        setSelectedGoogleAccount(null)
                      }}
                      className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition-colors"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {googleAccounts.map((account, index) => (
                      <button
                        key={index}
                        onClick={() => handleGoogleAccountSelect(account)}
                        className="w-full p-3 rounded-lg bg-white/6 hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        <img 
                          src={account.picture} 
                          alt={account.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="text-left">
                          <div className="font-medium">{account.name}</div>
                          <div className="text-sm opacity-70">{account.email}</div>
                        </div>
                      </button>
                    ))}
                  </div>
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
          ) : (
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
                    {selectedGoogleAccount && (
                      <div className="flex items-center gap-2">
                        <img 
                          src={selectedGoogleAccount.picture} 
                          alt={selectedGoogleAccount.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm opacity-70">{selectedGoogleAccount.email}</span>
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

export default Login

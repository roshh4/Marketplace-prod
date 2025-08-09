'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User } from 'lucide-react'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import GlassCard from '@/components/ui/GlassCard'
import Spinner from '@/components/ui/Spinner'
import { uid } from '@/lib/utils'

interface LoginProps {
  onLogin: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { updateUser } = useMarketplace()
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: 'Rajalakshmi Engineering College',
    year: '3rd Year',
    department: '',
    phoneNumber: ''
  })

  const collegeName = "Rajalakshmi Engineering College"

  const handleSignInClick = () => {
    setShowForm(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      updateUser({ 
        id: uid("u"), 
        name: formData.fullName || "Avinash S.", 
        avatar: undefined, 
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
            {!showForm && (
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
                        { name: "Google", onClick: handleSignInClick },
                        { name: "Microsoft", onClick: handleSignInClick },
                        { name: "Gmail", onClick: handleSignInClick },
                      ].map((p) => (
                        <button
                          key={p.name}
                          onClick={p.onClick}
                          className="flex-1 py-2 rounded-lg bg-white/6 hover:bg-white/8 transition-colors flex items-center justify-center gap-2">
                          <User size={16} /> <span className="text-sm">{p.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={handleSignInClick}
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
          {!showForm ? (
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
                  <h3 className="text-lg font-bold mb-4">Student Information</h3>
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

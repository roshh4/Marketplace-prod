'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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

  const fakeLogin = (provider: string) => {
    setLoading(true)
    setTimeout(() => {
      updateUser({ id: uid("u"), name: "Avinash S.", avatar: undefined, year: "3rd", department: "CSE" })
      setLoading(false)
      onLogin()
    }, 900 + Math.random() * 600)
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
          <GlassCard>
            <div className="space-y-3">
              <p className="font-semibold">Sign in</p>
              <div className="flex gap-3">
                {[
                  { name: "Google", onClick: () => fakeLogin("google") },
                  { name: "Microsoft", onClick: () => fakeLogin("ms") },
                  { name: "Gmail", onClick: () => fakeLogin("gmail") },
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
                  onClick={() => fakeLogin("demo")}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 font-semibold">
                  {loading ? <Spinner /> : "Continue as Demo User"}
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
        <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
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
      </div>
    </div>
  )
}

export default Login

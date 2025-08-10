'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import Profile from '@/components/profile/Profile'
import ChatPage from '@/components/chat/ChatPage'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useMarketplace()
  const [activeChat, setActiveChat] = useState<string | null>(null)

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  const handleBack = () => {
    router.push('/marketplace')
  }

  const handleOpenChat = (chatId: string) => {
    setActiveChat(chatId)
  }

  const closeChat = () => {
    setActiveChat(null)
  }

  // If not authenticated, show loading
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#061028] text-white font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#061028] text-white font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Profile onOpenChat={handleOpenChat} onBack={handleBack} />
      </motion.div>

      {/* Chat Overlay */}
      <AnimatePresence>
        {activeChat && (
          <ChatPage chatId={activeChat} onClose={closeChat} />
        )}
      </AnimatePresence>
    </div>
  )
}

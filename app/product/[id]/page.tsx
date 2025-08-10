'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import ProductFull from '@/components/product/ProductFull'
import ChatPage from '@/components/chat/ChatPage'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductPage() {
  const router = useRouter()
  const params = useParams()
  const { user, products } = useMarketplace()
  const [productId, setProductId] = useState<string | null>(null)
  const [activeChat, setActiveChat] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.push('/')
      return
    }

    // Get product ID from URL params
    const id = params.id as string
    if (id) {
      setProductId(id)
    }
  }, [params.id, user, router])

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

  // If product ID is not set yet, show loading
  if (!productId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#061028] text-white font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    )
  }

  // Check if product exists
  const product = products.find(p => p.id === productId)
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#061028] text-white font-sans flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 font-semibold hover:from-indigo-600 hover:to-cyan-500 transition-all duration-200"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#061028] text-white font-sans">
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -40, opacity: 0 }}
      >
        <ProductFull 
          productId={productId} 
          onBack={handleBack} 
          onOpenChat={handleOpenChat} 
        />
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

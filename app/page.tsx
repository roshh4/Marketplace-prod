'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Login from '@/components/auth/Login'
import Marketplace from '@/components/marketplace/Marketplace'
import ProductFull from '@/components/product/ProductFull'
import ListItemPage from '@/components/listing/ListItemPage'
import Profile from '@/components/profile/Profile'
import ChatPage from '@/components/chat/ChatPage'

export default function Home() {
  const [route, setRoute] = useState<string>("/login")
  const [routePayload, setRoutePayload] = useState<any>(null)
  
  const go = (r: string, payload?: any) => {
    setRoute(r)
    setRoutePayload(payload)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#061028] text-white font-sans">
      <AnimatePresence mode="wait">
        {route === "/login" && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Login onLogin={() => go("/marketplace")} />
          </motion.div>
        )}
        {route === "/marketplace" && (
          <motion.div key="market" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
            <Marketplace onNavigate={go} />
          </motion.div>
        )}
        {route === "/product" && (
          <motion.div key="product" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
            <ProductFull productId={routePayload} onBack={() => go("/marketplace")} onOpenChat={(chatId) => go("/chat", chatId)} />
          </motion.div>
        )}
        {route === "/list-item" && (
          <motion.div key="list" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}>
            <ListItemPage onDone={() => go("/marketplace")} />
          </motion.div>
        )}
        {route === "/profile" && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Profile onOpenChat={(chatId) => go("/chat", chatId)} onBack={() => go("/marketplace")} />
          </motion.div>
        )}
        {route === "/chat" && (
          <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ChatPage chatId={routePayload} onClose={() => go("/marketplace")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Send } from 'lucide-react'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import { Chat } from '@/types'

interface ChatPageProps {
  chatId: string
  onClose: () => void
}

const ChatPage: React.FC<ChatPageProps> = ({ chatId, onClose }) => {
  const { chats, products, user, pushMessage } = useMarketplace()
  const chat = chats.find((c: Chat) => c.id === chatId)
  const [text, setText] = useState("")
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" })
  }, [chat?.messages?.length])

  if (!chat) return <div className="p-8">Chat not found</div>

  const send = () => {
    if (!text.trim()) return
    pushMessage(chat.id, user?.id || "guest", text.trim())
    setText("")

    // auto response simulation
    setTimeout(() => {
      pushMessage(chat.id, chat.participants.find((p) => p !== user?.id) || "seller", "Thanks! I'm available — let's discuss pickup.")
    }, 900 + Math.random() * 1200)
  }

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-gradient-to-b from-[#081028] to-[#04101f] z-50 shadow-2xl">
      <div className="p-4 flex items-center gap-3 border-b border-white/6">
        <div className="text-lg font-semibold">Chat</div>
        <div className="text-sm opacity-70">
          {products.find((p) => p.id === chat.productId)?.title}
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={onClose} className="p-2 rounded-md bg-white/6">
            <X />
          </button>
        </div>
      </div>

      <div ref={ref} className="p-4 overflow-auto h-[calc(100vh-140px)] space-y-3">
        {chat.messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === user?.id ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-xl ${m.from === user?.id ? "bg-indigo-500 text-white" : "bg-white/8"}`}>
              <div className="text-sm">{m.text}</div>
              <div className="text-xs opacity-60 text-right mt-1">
                {new Date(m.at).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/6 flex gap-2">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          onKeyDown={(e) => e.key === "Enter" && send()} 
          className="flex-1 p-3 rounded-md bg-transparent border" 
          placeholder="Type a message..." 
        />
        <button onClick={send} className="p-3 rounded-md bg-gradient-to-r from-indigo-500 to-cyan-400">
          <Send />
        </button>
      </div>
    </div>
  )
}

export default ChatPage

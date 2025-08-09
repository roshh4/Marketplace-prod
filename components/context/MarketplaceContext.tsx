'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Product, UserType, Chat } from '@/types'
import { uid, nowIso, arraysEq, STORAGE_KEYS } from '@/lib/utils'

type MarketplaceContextType = {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  addProduct: (p: Omit<Product, "id" | "postedAt">) => Product
  user: UserType | null
  updateUser: (u: Partial<UserType>) => void
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>
  chats: Chat[]
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
  addChatIfMissing: (productId: string, participants: string[]) => Chat
  pushMessage: (chatId: string, from: string, text: string) => void
}

const MarketplaceContext = createContext<MarketplaceContextType | null>(null)

function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch (e) {
      return initial
    }
  })
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {}
  }, [key, state])
  
  return [state, setState] as const
}

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useLocalStorage<Product[]>(STORAGE_KEYS.PRODUCTS, [])
  const [chats, setChats] = useLocalStorage<Chat[]>(STORAGE_KEYS.CHATS, [])
  const [user, setUser] = useLocalStorage<UserType | null>(STORAGE_KEYS.USER, null)

  const addProduct = (p: Omit<Product, "id" | "postedAt">) => {
    const prod: Product = { ...p, id: uid("p"), postedAt: nowIso() }
    setProducts((s) => [prod, ...s])
    return prod
  }

  const updateUser = (u: Partial<UserType>) => {
    setUser((cur) => ({ ...(cur || { id: uid("u"), name: "You" }), ...u } as UserType))
  }

  const addChatIfMissing = (productId: string, participants: string[]) => {
    // find chat
    const existing = chats.find((c) => c.productId === productId && arraysEq(c.participants, participants))
    if (existing) return existing
    const c: Chat = { id: uid("c"), productId, participants, messages: [] }
    setChats((s) => [c, ...s])
    return c
  }

  const pushMessage = (chatId: string, from: string, text: string) => {
    setChats((s) =>
      s.map((c) => (c.id === chatId ? { ...c, messages: [...c.messages, { id: uid("m"), from, text, at: nowIso() }] } : c))
    )
  }

  return (
    <MarketplaceContext.Provider
      value={{ products, setProducts, addProduct, user, updateUser, setUser, chats, setChats, addChatIfMissing, pushMessage }}>
      {children}
    </MarketplaceContext.Provider>
  )
}

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext)
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider')
  }
  return context
}

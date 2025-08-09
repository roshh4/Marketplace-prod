'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import { Product, Chat } from '@/types'
import GlassCard from '@/components/ui/GlassCard'

interface ProfileProps {
  onOpenChat: (c: string) => void
  onBack: () => void
}

const Profile: React.FC<ProfileProps> = ({ onOpenChat, onBack }) => {
  const { user, updateUser, products, chats } = useMarketplace()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [year, setYear] = useState(user?.year || "")
  const [dept, setDept] = useState(user?.department || "")

  useEffect(() => {
    setName(user?.name || "")
    setYear(user?.year || "")
    setDept(user?.department || "")
  }, [user])

  const myListings = products.filter((p: Product) => p.sellerId === user?.id)
  const purchased: Product[] = []

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 rounded-full bg-white/6">
            <ArrowLeft />
          </button>
          <h2 className="text-2xl font-bold">Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <GlassCard>
              <div className="flex flex-col items-center gap-3">
                <div className="h-24 w-24 rounded-full bg-white/6 grid place-items-center">
                  {user?.name?.charAt(0) || "U"}
                </div>
                {!editing ? (
                  <div className="font-semibold">{user?.name}</div>
                ) : (
                  <input value={name} onChange={(e) => setName(e.target.value)} className="p-2 mt-2 bg-transparent border rounded-md w-full" />
                )}
                <div className="text-xs opacity-70">{user?.year} • {user?.department}</div>
                {editing ? (
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => { updateUser({ name, year, department: dept }); setEditing(false); }} className="py-2 px-3 rounded-md bg-gradient-to-r from-indigo-500 to-cyan-400">
                      Save
                    </button>
                    <button onClick={() => setEditing(false)} className="py-2 px-3 rounded-md bg-white/6">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setEditing(true)} className="mt-3 py-2 px-3 rounded-md bg-white/6">
                    Edit Profile
                  </button>
                )}
              </div>
            </GlassCard>

            <GlassCard className="mt-4">
              <div className="text-sm font-semibold">Active Chats</div>
              <div className="mt-3 space-y-2">
                {chats.map((c: Chat) => (
                  <div key={c.id} className="p-2 rounded-md bg-white/4 flex items-center justify-between cursor-pointer" onClick={() => onOpenChat(c.id)}>
                    <div className="flex gap-3 items-center">
                      <div className="h-10 w-10 rounded-md bg-white/6 grid place-items-center">P</div>
                      <div>
                        <div className="font-semibold">Chat for {products.find((p: Product) => p.id === c.productId)?.title}</div>
                        <div className="text-xs opacity-70">{c.messages[c.messages.length - 1]?.text?.slice(0, 40) || "No messages yet"}</div>
                      </div>
                    </div>
                    <div className="text-xs opacity-60">
                      {c.messages.length ? new Date(c.messages[c.messages.length - 1].at).toLocaleTimeString() : "-"}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-lg font-semibold">My Listings</div>
              <div className="text-sm opacity-70">{myListings.length}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {myListings.length === 0 ? (
                <div className="col-span-full p-6 text-center opacity-80">You have no listings yet</div>
              ) : (
                myListings.map((p) => (
                  <div key={p.id} className="p-3 bg-white/3 rounded-md">
                    <img src={p.images[0]} className="h-28 w-full object-cover rounded-md mb-2" />
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs opacity-70">₹{p.price}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

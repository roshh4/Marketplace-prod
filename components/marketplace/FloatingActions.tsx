'use client'

import { PlusCircle, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const FloatingActions: React.FC = () => {
  const router = useRouter()

  const handleList = () => {
    router.push('/list-item')
  }

  const handleProfile = () => {
    router.push('/profile')
  }
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <button onClick={handleProfile} className="p-3 rounded-full bg-white/6 backdrop-blur-md border border-white/6">
        <MessageCircle />
      </button>
      <button onClick={handleList} className="p-4 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg">
        <PlusCircle color="white" />
      </button>
    </div>
  )
}

export default FloatingActions

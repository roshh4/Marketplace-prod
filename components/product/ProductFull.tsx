'use client'

import { useState } from 'react'
import { ArrowLeft, Heart, Share2 } from 'lucide-react'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import { Product } from '@/types'
import GlassCard from '@/components/ui/GlassCard'

interface ProductFullProps {
  productId: string
  onBack: () => void
  onOpenChat: (c: string) => void
}

const ProductFull: React.FC<ProductFullProps> = ({ productId, onBack, onOpenChat }) => {
  const { products, addChatIfMissing, user } = useMarketplace()
  const prod = products.find((p: Product) => p.id === productId) as Product | undefined
  const [mainIndex, setMainIndex] = useState(0)

  if (!prod) return <div className="p-8">Product not found</div>

  const startChat = () => {
    const c = addChatIfMissing(prod.id, [user?.id || "guest", prod.sellerId])
    onOpenChat(c.id)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 rounded-full bg-white/6">
            <ArrowLeft />
          </button>
          <div className="flex-1">
            <div className="text-2xl font-bold">{prod.title}</div>
            <div className="text-sm opacity-70">₹{prod.price} • {prod.condition}</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md bg-white/6">
              <Heart />
            </button>
            <button className="p-2 rounded-md bg-white/6">
              <Share2 />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden bg-black/20">
              <img src={prod.images[mainIndex]} className="w-full h-[420px] object-cover" />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {prod.images.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  onClick={() => setMainIndex(i)} 
                  className={`h-20 w-full object-cover rounded-md cursor-pointer ${i === mainIndex ? "ring-2 ring-indigo-400" : ""}`} 
                />
              ))}
            </div>
          </div>

          <div>
            <GlassCard>
              <div className="space-y-3">
                <div className="font-semibold">Seller</div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-white/10 rounded-full grid place-items-center">S</div>
                  <div>
                    <div className="font-semibold">Seller Name</div>
                    <div className="text-xs opacity-70">3rd Year • CSE</div>
                  </div>
                </div>
                <div className="text-sm opacity-80">Posted: {new Date(prod.postedAt).toLocaleString()}</div>
                <div className="flex gap-2">
                  <button onClick={() => alert('Buy flow simulated')} className="flex-1 py-2 rounded-md bg-gradient-to-r from-emerald-500 to-green-400 font-semibold">
                    Buy Now
                  </button>
                  <button onClick={startChat} className="py-2 px-3 rounded-md bg-white/6">
                    Chat
                  </button>
                </div>
              </div>
            </GlassCard>

            <div className="mt-4 p-3 bg-white/3 rounded-xl">
              <div className="font-semibold mb-2">Description</div>
              <div className="text-sm opacity-90">{prod.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFull

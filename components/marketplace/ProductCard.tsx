'use client'

import { motion } from 'framer-motion'
import { Heart, Share2 } from 'lucide-react'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onOpen: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpen }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -6 }} 
      className="rounded-xl overflow-hidden bg-white/3 border border-white/6 p-3 cursor-pointer" 
      onClick={onOpen}
    >
      <div className="h-36 rounded-md overflow-hidden mb-2 bg-black/20 grid place-items-center">
        <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-sm">{product.title}</div>
          <div className="text-xs opacity-70">{product.category}</div>
        </div>
        <div className="text-sm font-bold">₹{product.price}</div>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs opacity-80">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-white/10 grid place-items-center text-xs">S</div>
          <div>Seller</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-md">
            <Heart size={14} />
          </button>
          <button className="p-1 rounded-md">
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard

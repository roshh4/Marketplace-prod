'use client'

import { motion } from 'framer-motion'
import { Heart, Share2 } from 'lucide-react'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onOpen: () => void
  isFavorited: boolean
  onToggleFavorite: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpen, isFavorited, onToggleFavorite }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite()
  }

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Share functionality can be added here
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -6 }} 
      className={`rounded-xl overflow-hidden bg-white/3 p-3 cursor-pointer relative ${product.status === 'sold' ? 'opacity-60' : ''}`}
      style={{ border: '1px solid rgb(50, 56, 68)' }}
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
          <button 
            onClick={handleFavoriteClick}
            className={`p-1 rounded-md transition-colors ${isFavorited ? 'text-red-400' : 'hover:text-red-400'}`}
          >
            <Heart size={14} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={handleShareClick}
            className="p-1 rounded-md hover:text-blue-400 transition-colors"
          >
            <Share2 size={14} />
          </button>
        </div>
      </div>
      
      {product.status === 'sold' && (
        <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Being sold
        </div>
      )}
    </motion.div>
  )
}

export default ProductCard

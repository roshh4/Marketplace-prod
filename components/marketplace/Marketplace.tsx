'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import { Product } from '@/types'
import { placeholderImage, nowIso } from '@/lib/utils'
import Header from './Header'
import ProductCard from './ProductCard'
import FloatingActions from './FloatingActions'

interface MarketplaceProps {
  onNavigate: (r: string, p?: any) => void
}

const Marketplace: React.FC<MarketplaceProps> = ({ onNavigate }) => {
  const { products, setProducts, favorites, toggleFavorite } = useMarketplace()
  const [query, setQuery] = useState("")
  const [filtered, setFiltered] = useState<Product[]>(products)

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) return setFiltered(products)
    setFiltered(products.filter((p: Product) => (p.title + " " + p.description + " " + p.tags.join(" ")).toLowerCase().includes(q)))
  }, [query, products])

  // sample data if empty
  useEffect(() => {
    if (products.length === 0) {
      const sample: Product[] = Array.from({ length: 6 }).map((_, i) => ({
        id: `p_${Math.random().toString(36).slice(2, 9)}`,
        title: ["Calculus Book", "Mechanical Kit", "Laptop Sleeve", "Graphing Calculator", "USB Microphone", "Data Structures Book"][i % 6],
        price: [150, 450, 299, 900, 1200, 200][i % 6],
        description: "A well-maintained item perfect for students.",
        images: [placeholderImage(i)],
        condition: i % 2 === 0 ? "Like New" : "Good",
        category: ["Books", "Electronics", "Accessories"][i % 3],
        tags: ["campus", "student"],
        sellerId: "seller_1",
        postedAt: nowIso(),
        status: "available" // available, requested, sold
      }))
      setProducts(sample)
    }
  }, [products.length, setProducts])

  return (
    <div className="min-h-screen pb-24">
      <Header query={query} setQuery={setQuery} onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Explore Marketplace</h2>
          <div className="text-sm opacity-80">Results: {filtered.length}</div>
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.length === 0 ? (
            <div className="col-span-full p-8 text-center opacity-80">No products found — try another search.</div>
          ) : (
            filtered.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onOpen={() => onNavigate("/product", p.id)}
                isFavorited={favorites.includes(p.id)}
                onToggleFavorite={() => toggleFavorite(p.id)}
              />
            ))
          )}
        </motion.div>
      </main>

      <FloatingActions onList={() => onNavigate("/list-item")} onProfile={() => onNavigate("/profile")} />
    </div>
  )
}

export default Marketplace

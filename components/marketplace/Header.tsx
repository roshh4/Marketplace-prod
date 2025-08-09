'use client'

import { useEffect, useRef } from 'react'
import { Search, User } from 'lucide-react'

interface HeaderProps {
  query: string
  setQuery: (s: string) => void
  onNavigate: (r: string) => void
}

const Header: React.FC<HeaderProps> = ({ query, setQuery, onNavigate }) => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return
      const y = window.scrollY
      headerRef.current.style.backdropFilter = `blur(${Math.min(12, y / 30)}px)`
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div ref={headerRef} className="sticky top-0 z-40 bg-white/3 backdrop-blur-md border-b border-white/3">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div>
          <div className="text-xl font-bold">College Marketplace</div>
          <div className="text-xs opacity-70">Rajalakshmi Engineering College</div>
        </div>
        <div className="flex items-center gap-3 w-1/3 min-w-[220px]">
          <div className="flex items-center bg-white/6 rounded-full px-3 py-2 w-full">
            <Search size={16} />
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search products..." 
              className="bg-transparent outline-none ml-2 w-full text-sm" 
            />
          </div>
          <button onClick={() => onNavigate("/profile")} className="p-2 rounded-full bg-white/5">
            <User size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header

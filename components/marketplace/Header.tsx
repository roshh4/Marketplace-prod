'use client'

import { useEffect, useRef } from 'react'
import { Search, User, LogOut } from 'lucide-react'
import { useMarketplace } from '@/components/context/MarketplaceContext'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  query: string
  setQuery: (s: string) => void
}

const Header: React.FC<HeaderProps> = ({ query, setQuery }) => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const { setUser } = useMarketplace()
  const router = useRouter()
  
  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return
      const y = window.scrollY
      headerRef.current.style.backdropFilter = `blur(${Math.min(12, y / 30)}px)`
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Clear user data from context
      setUser(null)
      
      // Clear localStorage
      localStorage.removeItem('cm_user_v1')
      localStorage.removeItem('google_access_token')
      localStorage.removeItem('google_refresh_token')
      localStorage.removeItem('google_user_info')
      
      // Redirect to login page
      router.push('/')
    }
  }

  return (
    <div ref={headerRef} className="sticky top-0 z-40 bg-white/3 backdrop-blur-md" style={{ borderBottom: '1px solid rgb(134, 139, 156)' }}>
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
          <button onClick={() => router.push("/profile")} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <User size={16} />
          </button>
          <button 
            onClick={handleLogout} 
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header

import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => (
  <div
    className={`bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-md ${className}`}>
    {children}
  </div>
)

export default GlassCard

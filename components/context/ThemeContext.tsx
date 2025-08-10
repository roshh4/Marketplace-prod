'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      console.log('Loaded saved theme:', savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
      console.log('Using system preference: light')
    } else {
      console.log('Using default theme: dark')
    }
  }, [])

  useEffect(() => {
    // Apply theme to document and body
    const root = document.documentElement
    const body = document.body
    
    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')
    
    root.classList.add(theme)
    body.classList.add(theme)
    
    localStorage.setItem('theme', theme)
    console.log('Theme applied:', theme, 'HTML classes:', root.classList.toString(), 'Body classes:', body.classList.toString())
  }, [theme])

  const toggleTheme = () => {
    console.log('Toggle theme called, current theme:', theme)
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      console.log('Setting theme to:', newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

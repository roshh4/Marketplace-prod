'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { GoogleUser, GoogleAuthResponse } from '@/lib/googleAuth'

interface AuthContextType {
  user: GoogleUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: () => void
  logout: () => void
  refreshUserSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<GoogleUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession()
  }, [])

  const checkExistingSession = async () => {
    try {
      // Check if user info exists in cookies/localStorage
      const userInfo = localStorage.getItem('google_user_info')
      const accessToken = localStorage.getItem('google_access_token')
      
      if (userInfo && accessToken) {
        const userData = JSON.parse(userInfo)
        setUser(userData)
      }
    } catch (error) {
      console.error('Error checking existing session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = () => {
    // Redirect to Google OAuth
    const googleAuthUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/google`
    window.location.href = googleAuthUrl
  }

  const logout = () => {
    // Clear user data and tokens
    localStorage.removeItem('google_user_info')
    localStorage.removeItem('google_access_token')
    localStorage.removeItem('google_refresh_token')
    setUser(null)
  }

  const refreshUserSession = async () => {
    try {
      const refreshToken = localStorage.getItem('google_refresh_token')
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      // Call your refresh token endpoint
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })

      if (!response.ok) {
        throw new Error('Failed to refresh token')
      }

      const data = await response.json()
      
      // Update stored tokens
      localStorage.setItem('google_access_token', data.access_token)
      if (data.refresh_token) {
        localStorage.setItem('google_refresh_token', data.refresh_token)
      }
    } catch (error) {
      console.error('Error refreshing session:', error)
      logout()
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      refreshUserSession,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

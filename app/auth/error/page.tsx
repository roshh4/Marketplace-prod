'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'access_denied':
        return 'You denied the permission to access your Google account'
      case 'invalid_request':
        return 'Invalid authentication request'
      case 'unauthorized_client':
        return 'This application is not authorized to access Google accounts'
      case 'unsupported_response_type':
        return 'Unsupported response type'
      case 'invalid_scope':
        return 'Invalid scope requested'
      case 'server_error':
        return 'Google authentication server error'
      case 'temporarily_unavailable':
        return 'Google authentication is temporarily unavailable'
      case 'no_code':
        return 'No authorization code received from Google'
      case 'auth_failed':
        return 'Authentication failed during token exchange'
      default:
        return 'An unexpected error occurred during authentication'
    }
  }

  const handleRetry = () => {
    router.push('/')
  }

  const handleGoBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6"
          >
            <AlertCircle size={32} className="text-red-400" />
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-2">Authentication Failed</h1>
          <p className="text-sm opacity-70 mb-6">
            {getErrorMessage(error)}
          </p>

          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 font-semibold hover:from-indigo-600 hover:to-cyan-500 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
            
            <button
              onClick={handleGoBack}
              className="w-full py-3 rounded-lg bg-white/6 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>

          {error && (
            <div className="mt-6 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <p className="text-xs text-red-400">
                Error Code: {error}
              </p>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  )
}

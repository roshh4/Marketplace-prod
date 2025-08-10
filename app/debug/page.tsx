'use client'

import { useState, useEffect } from 'react'
import { GOOGLE_OAUTH_CONFIG } from '@/lib/googleAuth'

export default function DebugPage() {
  const [config, setConfig] = useState(GOOGLE_OAUTH_CONFIG)
  const [envVars, setEnvVars] = useState<any>({})

  useEffect(() => {
    // Check environment variables
    const checkEnvVars = async () => {
      try {
        const response = await fetch('/api/debug/env')
        if (response.ok) {
          const data = await response.json()
          setEnvVars(data)
        }
      } catch (error) {
        console.error('Failed to fetch env vars:', error)
      }
    }

    checkEnvVars()
  }, [])

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Information</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">OAuth Configuration</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Client ID:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  config.clientId ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {config.clientId ? `${config.clientId.substring(0, 10)}...` : 'NOT SET'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Client Secret:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  config.clientSecret ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {config.clientSecret ? 'SET (hidden)' : 'NOT SET'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Redirect URI:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  config.redirectUri ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {config.redirectUri || 'NOT SET'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Environment Variables (Server-side)</h2>
            <pre className="bg-gray-900 p-4 rounded border overflow-x-auto text-sm">
              {JSON.stringify(envVars, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Make sure your <code className="bg-gray-700 px-1 rounded">.env.local</code> file exists in the project root</li>
              <li>Verify that <code className="bg-gray-700 px-1 rounded">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> is set</li>
              <li>Verify that <code className="bg-gray-700 px-1 rounded">GOOGLE_CLIENT_SECRET</code> is set</li>
              <li>Check that your Google Cloud Console redirect URI matches: <code className="bg-gray-700 px-1 rounded">http://localhost:3000/auth/callback</code></li>
              <li>Restart your development server after changing environment variables</li>
            </ol>
          </div>

          <div className="bg-blue-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test OAuth Flow</h2>
            <p className="mb-4">Click the button below to test the OAuth flow:</p>
            <button
              onClick={() => {
                const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`
                window.open(authUrl, '_blank')
              }}
              disabled={!config.clientId}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded"
            >
              Test Google OAuth
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

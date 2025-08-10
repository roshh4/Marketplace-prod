'use client'

import { useState } from 'react'
import { GOOGLE_OAUTH_CONFIG } from '@/lib/googleAuth'

export default function TestOAuthPage() {
  const [config, setConfig] = useState(GOOGLE_OAUTH_CONFIG)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">OAuth Configuration Test</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Environment Variables Status</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">NEXT_PUBLIC_GOOGLE_CLIENT_ID:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  config.clientId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {config.clientId || 'NOT SET'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">GOOGLE_CLIENT_SECRET:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  config.clientSecret ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {config.clientSecret ? 'SET (hidden)' : 'NOT SET'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">NEXT_PUBLIC_GOOGLE_REDIRECT_URI:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  config.redirectUri ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {config.redirectUri || 'NOT SET'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Configuration Object</h2>
            <pre className="bg-white p-4 rounded border overflow-x-auto">
              {JSON.stringify({
                clientId: config.clientId ? `${config.clientId.substring(0, 10)}...` : 'NOT SET',
                clientSecret: config.clientSecret ? 'SET (hidden)' : 'NOT SET',
                redirectUri: config.redirectUri,
                scope: config.scope,
                authUrl: config.authUrl,
                tokenUrl: config.tokenUrl,
                userInfoUrl: config.userInfoUrl
              }, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Create a <code className="bg-gray-200 px-1 rounded">.env.local</code> file in your project root</li>
              <li>Add your Google OAuth credentials:</li>
              <li className="ml-6">
                <pre className="bg-white p-2 rounded border text-xs mt-2">
{`NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback`}
                </pre>
              </li>
              <li>Restart your development server</li>
              <li>Refresh this page to see the updated configuration</li>
            </ol>
          </div>

          <div className="bg-blue-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Fix</h2>
            <p className="mb-4">To get your Google OAuth credentials:</p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Cloud Console</a></li>
              <li>Create a new project or select existing one</li>
              <li>Enable Google+ API or Google Identity API</li>
              <li>Go to Credentials → Create Credentials → OAuth 2.0 Client ID</li>
              <li>Set Application Type to "Web application"</li>
              <li>Add <code className="bg-gray-200 px-1 rounded">http://localhost:3000</code> to Authorized JavaScript origins</li>
              <li>Add <code className="bg-gray-200 px-1 rounded">http://localhost:3000/auth/callback</code> to Authorized redirect URIs</li>
              <li>Copy the Client ID and Client Secret</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

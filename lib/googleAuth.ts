// Google OAuth 2.0 configuration and authentication utilities

export const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  scope: 'openid email profile',
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo'
}

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture: string
  given_name?: string
  family_name?: string
  locale?: string
}

export interface GoogleAuthResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
  scope: string
  id_token?: string
}

// Generate Google OAuth URL
export function generateGoogleAuthUrl(): string {
  // Debug logging
  console.log('OAuth Config:', {
    clientId: GOOGLE_OAUTH_CONFIG.clientId,
    redirectUri: GOOGLE_OAUTH_CONFIG.redirectUri,
    hasClientId: !!GOOGLE_OAUTH_CONFIG.clientId
  })

  if (!GOOGLE_OAUTH_CONFIG.clientId) {
    throw new Error('Google Client ID is not configured. Please check your environment variables.')
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_OAUTH_CONFIG.clientId,
    redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
    response_type: 'code',
    scope: GOOGLE_OAUTH_CONFIG.scope,
    access_type: 'offline',
    prompt: 'consent'
  })

  const authUrl = `${GOOGLE_OAUTH_CONFIG.authUrl}?${params.toString()}`
  console.log('Generated OAuth URL:', authUrl)
  
  return authUrl
}

// Exchange authorization code for access token
export async function exchangeCodeForToken(code: string): Promise<GoogleAuthResponse> {
  const response = await fetch(GOOGLE_OAUTH_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      client_secret: GOOGLE_OAUTH_CONFIG.clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to exchange code for token')
  }

  return response.json()
}

// Get user information using access token
export async function getGoogleUserInfo(accessToken: string): Promise<GoogleUser> {
  const response = await fetch(GOOGLE_OAUTH_CONFIG.userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to get user info')
  }

  return response.json()
}

// Refresh access token using refresh token
export async function refreshAccessToken(refreshToken: string): Promise<GoogleAuthResponse> {
  const response = await fetch(GOOGLE_OAUTH_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      client_secret: GOOGLE_OAUTH_CONFIG.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to refresh access token')
  }

  return response.json()
}

// Validate Google ID token
export async function validateIdToken(idToken: string): Promise<GoogleUser> {
  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
  
  if (!response.ok) {
    throw new Error('Invalid ID token')
  }

  const tokenInfo = await response.json()
  
  if (tokenInfo.aud !== GOOGLE_OAUTH_CONFIG.clientId) {
    throw new Error('Token audience mismatch')
  }

  return {
    id: tokenInfo.sub,
    email: tokenInfo.email,
    name: tokenInfo.name,
    picture: tokenInfo.picture,
    given_name: tokenInfo.given_name,
    family_name: tokenInfo.family_name,
    locale: tokenInfo.locale
  }
}

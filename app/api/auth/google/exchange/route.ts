import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForToken, getGoogleUserInfo } from '@/lib/googleAuth'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      )
    }

    // Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(code)
    
    // Get user information using access token
    const userInfo = await getGoogleUserInfo(tokenResponse.access_token)

    return NextResponse.json({
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token,
      user_info: userInfo
    })

  } catch (error) {
    console.error('Google OAuth exchange error:', error)
    return NextResponse.json(
      { error: 'Failed to exchange authorization code' },
      { status: 500 }
    )
  }
}

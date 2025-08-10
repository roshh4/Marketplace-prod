import { NextRequest, NextResponse } from 'next/server'
import { refreshAccessToken } from '@/lib/googleAuth'

export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json()

    if (!refresh_token) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      )
    }

    // Refresh the access token using Google's API
    const tokenResponse = await refreshAccessToken(refresh_token)

    return NextResponse.json({
      access_token: tokenResponse.access_token,
      expires_in: tokenResponse.expires_in,
      refresh_token: tokenResponse.refresh_token || refresh_token, // Google might return a new refresh token
    })
  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 500 }
    )
  }
}

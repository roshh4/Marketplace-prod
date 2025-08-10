import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForToken, getGoogleUserInfo } from '@/lib/googleAuth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/error?error=${error}`
      )
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/error?error=no_code`
      )
    }

    // Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(code)
    
    // Get user information using access token
    const userInfo = await getGoogleUserInfo(tokenResponse.access_token)

    // Redirect to success page with tokens in URL params (for client-side storage)
    // In production, consider using secure HTTP-only cookies for sensitive data
    const successUrl = new URL(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/success`
    )
    
    // Add tokens and user info as URL parameters for client-side storage
    successUrl.searchParams.set('access_token', tokenResponse.access_token)
    if (tokenResponse.refresh_token) {
      successUrl.searchParams.set('refresh_token', tokenResponse.refresh_token)
    }
    successUrl.searchParams.set('user_info', JSON.stringify(userInfo))
    
    const response = NextResponse.redirect(successUrl)

    return response

  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/error?error=auth_failed`
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { generateGoogleAuthUrl } from '@/lib/googleAuth'

export async function GET(request: NextRequest) {
  try {
    // Generate Google OAuth URL with proper parameters
    const authUrl = generateGoogleAuthUrl()
    
    // Redirect user to Google OAuth
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Google OAuth initiation error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/error?error=initiation_failed`
    )
  }
}

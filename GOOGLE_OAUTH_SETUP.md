# Google OAuth 2.0 Setup Guide

This guide will help you set up Google OAuth 2.0 authentication for your College Marketplace application.

## Prerequisites

- Google Cloud Console account
- Next.js project (already set up)

## Step 1: Google Cloud Console Setup

### 1.1 Create a New Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "College Marketplace")
4. Click "Create"

### 1.2 Enable Google+ API
1. In the left sidebar, click "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on it and click "Enable"

### 1.3 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - User Type: External
   - App name: "College Marketplace"
   - User support email: Your email
   - Developer contact information: Your email
   - Save and continue

4. Create OAuth client ID:
   - Application type: Web application
   - Name: "College Marketplace Web Client"
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth/callback`
   - Click "Create"

5. Copy the Client ID and Client Secret

## Step 2: Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```bash
# Google OAuth 2.0 Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback

# Environment
NODE_ENV=development
```

**Important:** Never commit `.env.local` to version control!

## Step 3: Update Google Cloud Console Redirect URIs

For production, add your production domain to the authorized redirect URIs:
- `https://yourdomain.com/auth/callback`

## Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Click "Sign in" → "Google"
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you'll be redirected back to your app

## Step 5: Production Deployment

### Environment Variables
Update your production environment variables with:
- Production Google Client ID
- Production Google Client Secret
- Production app URL
- Production redirect URI

### Security Considerations
- Use HTTPS in production
- Consider implementing CSRF protection
- Implement proper session management
- Use secure HTTP-only cookies for production

## Troubleshooting

### Common Issues

1. **"Invalid redirect_uri" error**
   - Ensure the redirect URI in Google Cloud Console matches exactly
   - Check for trailing slashes or protocol mismatches

2. **"Client ID not found" error**
   - Verify your environment variables are set correctly
   - Restart your development server after changing .env files

3. **CORS errors**
   - Ensure your domain is in the authorized JavaScript origins
   - Check that your redirect URI is in the authorized redirect URIs

### Debug Mode
Enable debug logging by adding to your `.env.local`:
```bash
DEBUG=oauth2:*
```

## API Endpoints

The following API endpoints are now available:

- `GET /api/auth/google` - Initiates Google OAuth flow
- `GET /api/auth/google/callback` - Handles OAuth callback
- `POST /api/auth/refresh` - Refreshes access tokens

## Components

- `AuthContext` - Manages authentication state
- `Login` - Handles user login flow
- `AuthSuccessPage` - Processes successful authentication

## Security Notes

- Access tokens are stored in localStorage (for demo purposes)
- In production, use secure HTTP-only cookies
- Implement proper token refresh logic
- Add CSRF protection
- Consider implementing rate limiting

## Next Steps

1. Implement user profile management
2. Add logout functionality
3. Implement token refresh on app startup
4. Add error boundaries for authentication failures
5. Implement "Remember me" functionality
6. Add multi-factor authentication support

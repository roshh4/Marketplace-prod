# Google OAuth Setup Guide

## Fixing "redirect_uri_mismatch" Error

If you're getting the error "This app's request is invalid" with "Error 400: redirect_uri_mismatch", follow these steps:

### Step 1: Google Cloud Console Configuration

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Select your project

2. **Navigate to OAuth Credentials**
   - Go to **APIs & Services** → **Credentials**
   - Find your OAuth 2.0 Client ID and click on it

3. **Configure Redirect URI**
   - Click **Edit** on your OAuth 2.0 Client ID
   - In the **Authorized redirect URIs** section, add:
   ```
   http://localhost:3000/auth/callback
   ```
   - **IMPORTANT**: This must match EXACTLY with your environment variable
   - Click **Save**

### Step 2: Environment Variables

Create a `.env.local` file in your project root with:

```env
# Google OAuth 2.0 Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Environment
NODE_ENV=development
```

### Step 3: Verify Configuration

1. **Check your Google Cloud Console**:
   - Authorized redirect URIs should contain: `http://localhost:3000/auth/callback`
   - Authorized JavaScript origins should contain: `http://localhost:3000`

2. **Check your environment variables**:
   - `NEXT_PUBLIC_GOOGLE_REDIRECT_URI` should be: `http://localhost:3000/auth/callback`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` should match your Google Cloud Console Client ID

### Step 4: Restart Development Server

After making changes:
```bash
npm run dev
```

### Common Issues and Solutions

1. **Wrong redirect URI format**:
   - ✅ `http://localhost:3000/auth/callback` (correct)
   - ❌ `http://localhost:3000/api/callback` (wrong)

2. **Missing protocol**:
   - ❌ `localhost:3000/api/auth/google/callback` (wrong)
   - ✅ `http://localhost:3000/api/auth/google/callback` (correct)

3. **Wrong port**:
   - Make sure you're using the correct port (usually 3000 for Next.js)

4. **Environment variable not loaded**:
   - Restart your development server after changing `.env.local`

### Testing the Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Google" sign-in button
4. You should be redirected to Google's consent screen
5. After consent, you should be redirected back to your app

### For Production

When deploying to production, update your Google Cloud Console with your production domain:

   ```
   https://yourdomain.com/auth/callback
   ```

And update your environment variables accordingly.

## Need Help?

If you're still having issues:
1. Check the browser console for any JavaScript errors
2. Verify all environment variables are loaded correctly
3. Ensure your Google Cloud Console project has the Google+ API enabled
4. Make sure your OAuth consent screen is configured properly

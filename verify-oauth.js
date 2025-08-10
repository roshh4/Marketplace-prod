// OAuth Configuration Verification Script
// Run this with: node verify-oauth.js

console.log('🔍 OAuth Configuration Verification\n');

// Check environment variables
const envVars = {
  'NEXT_PUBLIC_GOOGLE_CLIENT_ID': process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  'GOOGLE_CLIENT_SECRET': process.env.GOOGLE_CLIENT_SECRET,
  'NEXT_PUBLIC_GOOGLE_REDIRECT_URI': process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
  'NEXT_PUBLIC_APP_URL': process.env.NEXT_PUBLIC_APP_URL
};

console.log('📋 Environment Variables:');
Object.entries(envVars).forEach(([key, value]) => {
  const status = value ? '✅ SET' : '❌ NOT SET';
  const displayValue = key.includes('SECRET') ? '***HIDDEN***' : (value || 'undefined');
  console.log(`  ${key}: ${status} (${displayValue})`);
});

console.log('\n🔗 Expected Redirect URI Flow:');
console.log('  1. Google OAuth → http://localhost:3000/auth/callback');
console.log('  2. Client Page → Student Information Form');
console.log('  3. Form Submission → /marketplace');

console.log('\n⚠️  IMPORTANT:');
console.log('  Make sure your Google Cloud Console has:');
console.log('  - Authorized redirect URIs: http://localhost:3000/auth/callback');
console.log('  - Authorized JavaScript origins: http://localhost:3000');

console.log('\n🚀 Next Steps:');
console.log('  1. Update Google Cloud Console redirect URI');
console.log('  2. Restart your development server');
console.log('  3. Try Google sign-in again');

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MarketplaceProvider } from '@/components/context/MarketplaceContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'College Marketplace',
  description: 'Buy, sell and chat with fellow students — built for campus life.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MarketplaceProvider>
          {children}
        </MarketplaceProvider>
      </body>
    </html>
  )
}

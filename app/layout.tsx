import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'

// Lazy load SpeedInsights para não bloquear renderização inicial
const SpeedInsights = dynamic(() => import('@vercel/speed-insights/next').then(mod => ({ default: mod.SpeedInsights })), {
  ssr: false,
})

// Lazy load Google Analytics para não bloquear renderização inicial
const GoogleAnalytics = dynamic(() => import('@/views/components/analytics/GoogleAnalytics'), {
  ssr: false,
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Evita FOIT (Flash of Invisible Text)
  preload: true, // Preload da fonte para melhor performance
  adjustFontFallback: true, // Melhora CLS (Cumulative Layout Shift)
})

import { baseMetadata } from '@/lib/constants/metadata'

export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        {/* Preconnect para recursos externos - melhora performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.worldvectorlogo.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
        {/* Preconnect para Google Analytics */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className="antialiased">
        {children}
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  )
}

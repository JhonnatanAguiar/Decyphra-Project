import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { CursorGlow } from '@/components/ui/CursorGlow'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://decyphra.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Startup Tech — Plataforma SaaS B2B | Centralize sua operação',
    template: '%s | Startup Tech',
  },
  description:
    'Centralize formulários, fluxos, sistemas e ferramentas em uma única plataforma. Solução SaaS B2B para clareza operacional e crescimento sustentável.',
  keywords: ['SaaS', 'B2B', 'plataforma', 'automação', 'operacional', 'Startup Tech'],
  authors: [{ name: 'Decyphra', url: 'https://decyphra.com.br' }],
  creator: 'Decyphra',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Startup Tech',
    title: 'Startup Tech — Plataforma SaaS B2B',
    description: 'Centralize sua operação em uma única plataforma. Solução SaaS B2B para clareza operacional e crescimento sustentável.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Tech — Plataforma SaaS B2B',
    description: 'Centralize sua operação em uma única plataforma. Solução SaaS B2B.',
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#020617',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed left-0 top-0 z-[9999] -translate-y-full bg-brand.primary px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand.secondary"
        >
          Ir ao conteúdo
        </a>
        {children}
        <CursorGlow />
      </body>
    </html>
  )
}


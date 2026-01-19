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

export const metadata: Metadata = {
  title: 'Startup Tech Demo | Decyphra',
  description:
    'Demo de landing page SaaS com foco máximo em UI/UX para o portfólio da Decyphra.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {children}
        <CursorGlow />
      </body>
    </html>
  )
}


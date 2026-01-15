import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Startup Tech Demo | Decyphra',
  description: 'Demo de landing page SaaS com foco máximo em UI/UX para o portfólio da Decyphra.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}


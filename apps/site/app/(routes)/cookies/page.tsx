import type { Metadata } from 'next'
import { baseMetadata, cookiesMetadata } from '@/lib/constants/metadata'
import CookiesPageClient from './CookiesPageClient'

/**
 * Página de Política de Cookies (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...cookiesMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...cookiesMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...cookiesMetadata.twitter,
  },
}

export default function CookiesPage() {
  return <CookiesPageClient />
}

import type { Metadata } from 'next'
import { baseMetadata, contactMetadata } from '@/lib/constants/metadata'
import ContactPageClient from './ContactPageClient'

/**
 * Página de Contato (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...contactMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...contactMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...contactMetadata.twitter,
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}

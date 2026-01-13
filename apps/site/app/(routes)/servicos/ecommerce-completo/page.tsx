import type { Metadata } from 'next'
import { baseMetadata, ecommerceCompletoMetadata } from '@/lib/constants/metadata'
import EcommerceCompletoPageClient from './EcommerceCompletoPageClient'

/**
 * Página de Serviço: E-commerce Completo (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...ecommerceCompletoMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...ecommerceCompletoMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...ecommerceCompletoMetadata.twitter,
  },
}

export default function EcommerceCompletoPage() {
  return <EcommerceCompletoPageClient />
}

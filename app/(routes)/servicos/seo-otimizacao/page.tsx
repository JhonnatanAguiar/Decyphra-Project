import type { Metadata } from 'next'
import { baseMetadata, seoOtimizacaoMetadata } from '@/lib/constants/metadata'
import SeoOtimizacaoPageClient from './SeoOtimizacaoPageClient'

/**
 * Página de Serviço: SEO & Otimização (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...seoOtimizacaoMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...seoOtimizacaoMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...seoOtimizacaoMetadata.twitter,
  },
}

export default function SeoOtimizacaoPage() {
  return <SeoOtimizacaoPageClient />
}

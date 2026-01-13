import type { Metadata } from 'next'
import TestimonialsManagementClient from './TestimonialsManagementClient'

/**
 * Página de Gerenciamento de Depoimentos (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */

export const metadata: Metadata = {
  title: 'Gerenciamento de Depoimentos | Admin - Decyphra',
  description: 'Visualize e gerencie depoimentos de clientes',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TestimonialsManagementPage() {
  return <TestimonialsManagementClient />
}

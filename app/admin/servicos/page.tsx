import type { Metadata } from 'next'
import ServicesManagementClient from './ServicesManagementClient'

/**
 * Página de Gerenciamento de Serviços (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */

export const metadata: Metadata = {
  title: 'Gerenciamento de Serviços | Admin - Decyphra',
  description: 'Visualize e gerencie serviços oferecidos',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ServicesManagementPage() {
  return <ServicesManagementClient />
}

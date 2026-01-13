import type { Metadata } from 'next'
import LeadsManagementClient from './LeadsManagementClient'

/**
 * Página de Gerenciamento de Leads (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */

export const metadata: Metadata = {
  title: 'Gerenciamento de Leads | Admin - Decyphra',
  description: 'Gerencie leads e oportunidades de negócio',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LeadsManagementPage() {
  return <LeadsManagementClient />
}

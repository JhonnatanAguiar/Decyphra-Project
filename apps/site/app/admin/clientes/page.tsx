import type { Metadata } from 'next'
import ClientsManagementClient from './ClientsManagementClient'

/**
 * Página de Gerenciamento de Clientes (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */

export const metadata: Metadata = {
  title: 'Gerenciamento de Clientes | Admin - Decyphra',
  description: 'Gerencie clientes e informações de contato',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ClientsManagementPage() {
  return <ClientsManagementClient />
}

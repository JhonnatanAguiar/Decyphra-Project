import type { Metadata } from 'next'
import ContactsManagementClient from './ContactsManagementClient'

/**
 * Página de Visualização de Submissões de Contato (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */

export const metadata: Metadata = {
  title: 'Submissões de Contato | Admin - Decyphra',
  description: 'Visualize submissões de contato recebidas',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ContactsManagementPage() {
  return <ContactsManagementClient />
}

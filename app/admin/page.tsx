import type { Metadata } from 'next'
import AdminDashboardClient from './AdminDashboardClient'

/**
 * Dashboard Admin (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */

export const metadata: Metadata = {
  title: 'Dashboard | Admin - Decyphra',
  description: 'Painel administrativo da Decyphra',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}

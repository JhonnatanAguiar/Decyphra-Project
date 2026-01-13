import type { Metadata } from 'next'
import ProjectsManagementClient from './ProjectsManagementClient'

/**
 * Página de Gerenciamento de Projetos (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */

export const metadata: Metadata = {
  title: 'Gerenciamento de Projetos | Admin - Decyphra',
  description: 'Visualize e gerencie projetos do portfólio',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ProjectsManagementPage() {
  return <ProjectsManagementClient />
}

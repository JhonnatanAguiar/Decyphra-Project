import { prisma } from '@/lib/db/prisma'
import type { ProjectListQuery } from '@/models/schemas'
import type { ProjectListDTO } from '@/models/types'

/**
 * Project Service
 * 
 * Service responsável pela lógica de negócio de projetos
 * - Listagem de projetos
 * - Filtros e paginação
 */

const DEFAULT_LIMIT = 50
const MAX_LIMIT = 100

/**
 * Lista projetos com filtros e paginação
 * 
 * @param query - Query params (category, featured, status, limit, offset)
 * @returns Lista de projetos com metadados de paginação
 */
export async function listProjects(query: ProjectListQuery = {}): Promise<ProjectListDTO> {
  const { category, featured, status, limit = DEFAULT_LIMIT, offset = 0 } = query

  // Construir filtros
  const where: {
    category?: string
    featured?: boolean
    status?: 'draft' | 'published' | 'archived'
  } = {}

  if (category) {
    where.category = category
  }

  if (featured !== undefined) {
    where.featured = featured
  }

  if (status) {
    where.status = status
  } else {
    // Por padrão, apenas projetos publicados
    where.status = 'published'
  }

  // Buscar projetos
  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
      take: Math.min(limit, MAX_LIMIT),
      skip: offset,
    }),
    prisma.project.count({ where }),
  ])

  return {
    projects,
    total,
    limit: Math.min(limit, MAX_LIMIT),
    offset,
    hasMore: offset + projects.length < total,
  }
}


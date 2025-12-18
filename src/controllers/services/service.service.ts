import { prisma } from '@/lib/db/prisma'
import type { ServiceListQuery } from '@/models/schemas'
import type { ServiceListDTO } from '@/models/types'

/**
 * Service Service
 * 
 * Service responsável pela lógica de negócio de serviços
 * - Listagem de serviços
 * - Filtros e paginação
 */

const DEFAULT_LIMIT = 50
const MAX_LIMIT = 100

/**
 * Lista serviços com filtros e paginação
 * 
 * @param query - Query params (active, limit, offset)
 * @returns Lista de serviços com metadados de paginação
 */
export async function listServices(query: ServiceListQuery = {}): Promise<ServiceListDTO> {
  const { active, limit = DEFAULT_LIMIT, offset = 0 } = query

  // Construir filtros
  const where: {
    active?: boolean
  } = {}

  if (active !== undefined) {
    where.active = active
  }

  // Buscar serviços
  const [services, total] = await Promise.all([
    prisma.service.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
      take: Math.min(limit, MAX_LIMIT),
      skip: offset,
    }),
    prisma.service.count({ where }),
  ])

  return {
    services,
    total,
    limit: Math.min(limit, MAX_LIMIT),
    offset,
    hasMore: offset + services.length < total,
  }
}


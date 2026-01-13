import { prisma } from '@/lib/db/prisma'
import { API_DEFAULTS } from '@/lib/api/constants'
import type { TestimonialListQuery } from '@/models/schemas'
import type { TestimonialListDTO } from '@/models/types'

/**
 * Testimonial Service
 * 
 * Service responsável pela lógica de negócio de depoimentos
 * - Listagem de depoimentos
 * - Filtros e paginação
 */

/**
 * Lista depoimentos com filtros e paginação
 * 
 * @param query - Query params (featured, limit, offset)
 * @returns Lista de depoimentos com metadados de paginação
 */
export async function listTestimonials(query: TestimonialListQuery = {}): Promise<TestimonialListDTO> {
  const { featured, limit = API_DEFAULTS.DEFAULT_LIMIT, offset = 0 } = query

  // Construir filtros
  const where: {
    featured?: boolean
  } = {}

  if (featured !== undefined) {
    where.featured = featured
  }

  // Buscar depoimentos
  const [testimonials, total] = await Promise.all([
    prisma.testimonial.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
      take: Math.min(limit, API_DEFAULTS.MAX_LIMIT),
      skip: offset,
    }),
    prisma.testimonial.count({ where }),
  ])

  return {
    testimonials,
    total,
    limit: Math.min(limit, API_DEFAULTS.MAX_LIMIT),
    offset,
    hasMore: offset + testimonials.length < total,
  }
}


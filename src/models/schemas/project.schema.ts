import { z } from 'zod'

/**
 * Project Schemas
 * 
 * Schemas Zod para validação de dados de projetos
 * Usado em API routes de listagem e detalhes
 */

// Query params para listagem de projetos
export const projectListQuerySchema = z.object({
  category: z.string().optional(),
  featured: z.string().transform((val) => val === 'true').optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  limit: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().positive().max(100)).optional(),
  offset: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().nonnegative()).optional(),
})

export type ProjectListQuery = z.infer<typeof projectListQuerySchema>

// Params para projeto individual (slug)
export const projectSlugSchema = z.object({
  slug: z.string().min(1, 'Slug é obrigatório'),
})

export type ProjectSlugParams = z.infer<typeof projectSlugSchema>


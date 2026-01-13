import { z } from 'zod'

/**
 * Testimonial Schemas
 * 
 * Schemas Zod para validação de dados de depoimentos
 * Usado em API routes de listagem
 */

// Query params para listagem de depoimentos
export const testimonialListQuerySchema = z.object({
  featured: z.string().transform((val) => val === 'true').optional(),
  limit: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().positive().max(100)).optional(),
  offset: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().nonnegative()).optional(),
})

export type TestimonialListQuery = z.infer<typeof testimonialListQuerySchema>


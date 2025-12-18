import { z } from 'zod'

/**
 * Service Schemas
 * 
 * Schemas Zod para validação de dados de serviços
 * Usado em API routes de listagem
 */

// Query params para listagem de serviços
export const serviceListQuerySchema = z.object({
  active: z.string().transform((val) => val === 'true').optional(),
  limit: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().positive().max(100)).optional(),
  offset: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().nonnegative()).optional(),
})

export type ServiceListQuery = z.infer<typeof serviceListQuerySchema>


import { apiError, apiResponse } from '@/lib/api/response'
import { testimonialListQuerySchema } from '@/models/schemas'
import { listTestimonials } from '@/controllers/services/testimonial.service'

/**
 * API Route: GET /api/v1/testimonials
 * 
 * Controller para listagem de depoimentos
 * - Valida query params com Zod schema
 * - Chama service para buscar dados
 * - Retorna resposta padronizada
 */

export async function GET(req: Request) {
  try {
    // Extrair e validar query params
    const { searchParams } = new URL(req.url)
    const queryParams = Object.fromEntries(searchParams.entries())
    const query = testimonialListQuerySchema.parse(queryParams)

    // Buscar depoimentos
    const result = await listTestimonials(query)

    return apiResponse(result, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/testimonials] error', err)
    return apiError('Erro ao buscar depoimentos', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'
// Forçar renderização dinâmica (usa request.url)
export const dynamic = 'force-dynamic'


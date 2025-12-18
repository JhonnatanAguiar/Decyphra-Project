import { apiError, apiResponse } from '@/lib/api/response'
import { serviceListQuerySchema } from '@/models/schemas'
import { listServices } from '@/controllers/services/service.service'

/**
 * API Route: GET /api/v1/services
 * 
 * Controller para listagem de serviços
 * - Valida query params com Zod schema
 * - Chama service para buscar dados
 * - Retorna resposta padronizada
 */

export async function GET(req: Request) {
  try {
    // Extrair e validar query params
    const { searchParams } = new URL(req.url)
    const queryParams = Object.fromEntries(searchParams.entries())
    const query = serviceListQuerySchema.parse(queryParams)

    // Buscar serviços
    const result = await listServices(query)

    return apiResponse(result, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/services] error', err)
    return apiError('Erro ao buscar serviços', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'
// Forçar renderização dinâmica (usa request.url)
export const dynamic = 'force-dynamic'


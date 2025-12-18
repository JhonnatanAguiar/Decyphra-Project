import { apiError, apiResponse } from '@/lib/api/response'
import { projectListQuerySchema } from '@/models/schemas'
import { listProjects } from '@/controllers/services/project.service'

/**
 * API Route: GET /api/v1/projects
 * 
 * Controller para listagem de projetos
 * - Valida query params com Zod schema
 * - Chama service para buscar dados
 * - Retorna resposta padronizada
 */

export async function GET(req: Request) {
  try {
    // Extrair e validar query params
    const { searchParams } = new URL(req.url)
    const queryParams = Object.fromEntries(searchParams.entries())
    const query = projectListQuerySchema.parse(queryParams)

    // Buscar projetos
    const result = await listProjects(query)

    return apiResponse(result, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/projects] error', err)
    return apiError('Erro ao buscar projetos', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'
// Forçar renderização dinâmica (usa request.url)
export const dynamic = 'force-dynamic'


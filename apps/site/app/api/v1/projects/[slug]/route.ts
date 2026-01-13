import { apiError, apiResponse } from '@/lib/api/response'
import { projectSlugSchema } from '@/models/schemas'
import { getProjectBySlug } from '@/controllers/services/project.service'

/**
 * API Route: GET /api/v1/projects/[slug]
 * 
 * Controller para detalhes de projeto
 * - Valida params com Zod schema
 * - Chama service para buscar dados
 * - Retorna resposta padronizada
 */

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Validar params
    const validatedParams = projectSlugSchema.parse(params)

    // Buscar projeto
    const project = await getProjectBySlug(validatedParams)

    if (!project) {
      return apiError('Projeto não encontrado', 404)
    }

    return apiResponse(project, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/projects/[slug]] error', err)
    return apiError('Erro ao buscar projeto', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'
// Forçar renderização dinâmica (rota dinâmica com params)
export const dynamic = 'force-dynamic'


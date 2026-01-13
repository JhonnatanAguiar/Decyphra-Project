import { getInteractionById } from '@/controllers/services'
import { apiResponse, apiError } from '@/lib/api/response'

/**
 * API Route: GET /api/v1/crm/interactions/[id]
 * 
 * Busca uma interação específica por ID
 */

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const interaction = await getInteractionById(id)

    if (!interaction) {
      return apiError('Interação não encontrada', 404)
    }

    return apiResponse(interaction, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/crm/interactions/[id]] GET error', err)
    return apiError('Erro ao buscar interação', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'

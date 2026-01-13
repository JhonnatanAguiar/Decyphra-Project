import { z } from 'zod'
import { interactionSchema, interactionListQuerySchema } from '@/models/schemas'
import { listInteractions, createInteraction } from '@/controllers/services'
import { apiResponse, apiError } from '@/lib/api/response'

/**
 * API Route: GET/POST /api/v1/crm/interactions
 * 
 * Controller para gerenciamento de interações do CRM
 * - GET: Lista interações com filtros e paginação
 * - POST: Cria uma nova interação
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = interactionListQuerySchema.parse({
      leadId: searchParams.get('leadId') || undefined,
      clientId: searchParams.get('clientId') || undefined,
      type: searchParams.get('type') || undefined,
      channel: searchParams.get('channel') || undefined,
      limit: searchParams.get('limit') || '10',
      offset: searchParams.get('offset') || '0',
    })

    const result = await listInteractions(query)
    return apiResponse(result, 200)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Parâmetros inválidos', 400, err.errors)
    }
    // eslint-disable-next-line no-console
    console.error('[api/crm/interactions] GET error', err)
    return apiError('Erro ao listar interações', 500)
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = interactionSchema.parse(body)

    const interaction = await createInteraction(data)
    return apiResponse(interaction, 201)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Dados inválidos', 400, err.errors)
    }
    if (err instanceof Error) {
      return apiError(err.message, 400)
    }
    // eslint-disable-next-line no-console
    console.error('[api/crm/interactions] POST error', err)
    return apiError('Erro ao criar interação', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'

import { z } from 'zod'
import { clientSchema } from '@/models/schemas'
import { convertLeadToClient } from '@/controllers/services'
import { apiResponse, apiError } from '@/lib/api/response'

/**
 * API Route: POST /api/v1/crm/leads/[id]/convert
 * 
 * Converte um lead em cliente
 */

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json().catch(() => ({}))
    
    // Validar dados opcionais do cliente se fornecidos
    const clientData = body ? clientSchema.partial().parse(body) : undefined

    const client = await convertLeadToClient(id, clientData)
    return apiResponse(client, 201)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Dados inválidos', 400, err.errors)
    }
    if (err instanceof Error) {
      return apiError(err.message, 400)
    }
    // eslint-disable-next-line no-console
    console.error('[api/crm/leads/[id]/convert] POST error', err)
    return apiError('Erro ao converter lead em cliente', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'

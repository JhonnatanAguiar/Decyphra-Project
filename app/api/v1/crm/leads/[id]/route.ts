import { z } from 'zod'
import { updateLeadSchema } from '@/models/schemas'
import { getLeadById, updateLead, deleteLead } from '@/controllers/services'
import { apiResponse, apiError } from '@/lib/api/response'

/**
 * API Route: GET/PUT/DELETE /api/v1/crm/leads/[id]
 * 
 * Controller para operações em leads específicos
 * - GET: Busca lead por ID
 * - PUT: Atualiza lead
 * - DELETE: Deleta lead
 */

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lead = await getLeadById(id)

    if (!lead) {
      return apiError('Lead não encontrado', 404)
    }

    return apiResponse(lead, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/crm/leads/[id]] GET error', err)
    return apiError('Erro ao buscar lead', 500)
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const data = updateLeadSchema.parse({ ...body, id })

    const lead = await updateLead(data)
    return apiResponse(lead, 200)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Dados inválidos', 400, err.errors)
    }
    // eslint-disable-next-line no-console
    console.error('[api/crm/leads/[id]] PUT error', err)
    return apiError('Erro ao atualizar lead', 500)
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteLead(id)

    return apiResponse({ message: 'Lead deletado com sucesso' }, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/crm/leads/[id]] DELETE error', err)
    return apiError('Erro ao deletar lead', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'

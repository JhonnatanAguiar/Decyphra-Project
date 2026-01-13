import { z } from 'zod'
import { updateClientSchema } from '@/models/schemas'
import { getClientById, updateClient, deleteClient } from '@/controllers/services'
import { apiResponse, apiError } from '@/lib/api/response'

/**
 * API Route: GET/PUT/DELETE /api/v1/crm/clients/[id]
 * 
 * Controller para operações em clientes específicos
 * - GET: Busca cliente por ID
 * - PUT: Atualiza cliente
 * - DELETE: Deleta cliente
 */

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const client = await getClientById(id)

    if (!client) {
      return apiError('Cliente não encontrado', 404)
    }

    return apiResponse(client, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/crm/clients/[id]] GET error', err)
    return apiError('Erro ao buscar cliente', 500)
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const data = updateClientSchema.parse({ ...body, id })

    const client = await updateClient(data)
    return apiResponse(client, 200)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Dados inválidos', 400, err.errors)
    }
    // eslint-disable-next-line no-console
    console.error('[api/crm/clients/[id]] PUT error', err)
    return apiError('Erro ao atualizar cliente', 500)
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteClient(id)

    return apiResponse({ message: 'Cliente deletado com sucesso' }, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/crm/clients/[id]] DELETE error', err)
    return apiError('Erro ao deletar cliente', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'

import { z } from 'zod'
import { clientSchema, clientListQuerySchema } from '@/models/schemas'
import { listClients, createClient } from '@/controllers/services'
import { apiResponse, apiError } from '@/lib/api/response'

/**
 * API Route: GET/POST /api/v1/crm/clients
 * 
 * Controller para gerenciamento de clientes do CRM
 * - GET: Lista clientes com filtros e paginação
 * - POST: Cria um novo cliente
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = clientListQuerySchema.parse({
      status: searchParams.get('status') || undefined,
      segment: searchParams.get('segment') || undefined,
      search: searchParams.get('search') || undefined,
      limit: searchParams.get('limit') || '10',
      offset: searchParams.get('offset') || '0',
    })

    const result = await listClients(query)
    
    // Cache headers para melhor performance
    const response = apiResponse(result, 200)
    response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60')
    return response
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Parâmetros inválidos', 400, err.errors)
    }
    // eslint-disable-next-line no-console
    console.error('[api/crm/clients] GET error', err)
    return apiError('Erro ao listar clientes', 500)
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = clientSchema.parse(body)

    const client = await createClient(data)
    return apiResponse(client, 201)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Dados inválidos', 400, err.errors)
    }
    // eslint-disable-next-line no-console
    console.error('[api/crm/clients] POST error', err)
    return apiError('Erro ao criar cliente', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'

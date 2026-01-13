import { z } from 'zod'
import { leadSchema, leadListQuerySchema } from '@/models/schemas'
import { listLeads, createLead } from '@/controllers/services'
import { apiResponse, apiError } from '@/lib/api/response'

/**
 * API Route: GET/POST /api/v1/crm/leads
 * 
 * Controller para gerenciamento de leads do CRM
 * - GET: Lista leads com filtros e paginação
 * - POST: Cria um novo lead
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = leadListQuerySchema.parse({
      status: searchParams.get('status') || undefined,
      source: searchParams.get('source') || undefined,
      search: searchParams.get('search') || undefined,
      limit: searchParams.get('limit') || '10',
      offset: searchParams.get('offset') || '0',
    })

    const result = await listLeads(query)
    
    // Cache headers para melhor performance
    const response = apiResponse(result, 200)
    response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60')
    return response
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Parâmetros inválidos', 400, err.errors)
    }
    // eslint-disable-next-line no-console
    console.error('[api/crm/leads] GET error', err)
    return apiError('Erro ao listar leads', 500)
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = leadSchema.parse(body)

    const lead = await createLead(data)
    return apiResponse(lead, 201)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Dados inválidos', 400, err.errors)
    }
    // eslint-disable-next-line no-console
    console.error('[api/crm/leads] POST error', err)
    return apiError('Erro ao criar lead', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
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

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Version': 'v1',
      },
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/services] error', err)
    return NextResponse.json(
      { ok: false, message: 'Erro ao buscar serviços' },
      { status: 500 }
    )
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'


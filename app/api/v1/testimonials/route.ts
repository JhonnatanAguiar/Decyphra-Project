import { NextResponse } from 'next/server'
import { testimonialListQuerySchema } from '@/models/schemas'
import { listTestimonials } from '@/controllers/services/testimonial.service'

/**
 * API Route: GET /api/v1/testimonials
 * 
 * Controller para listagem de depoimentos
 * - Valida query params com Zod schema
 * - Chama service para buscar dados
 * - Retorna resposta padronizada
 */

export async function GET(req: Request) {
  try {
    // Extrair e validar query params
    const { searchParams } = new URL(req.url)
    const queryParams = Object.fromEntries(searchParams.entries())
    const query = testimonialListQuerySchema.parse(queryParams)

    // Buscar depoimentos
    const result = await listTestimonials(query)

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Version': 'v1',
      },
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/testimonials] error', err)
    return NextResponse.json(
      { ok: false, message: 'Erro ao buscar depoimentos' },
      { status: 500 }
    )
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'


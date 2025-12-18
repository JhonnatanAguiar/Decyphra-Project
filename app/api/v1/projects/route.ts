import { NextResponse } from 'next/server'
import { projectListQuerySchema } from '@/models/schemas'
import { listProjects } from '@/controllers/services/project.service'

/**
 * API Route: GET /api/v1/projects
 * 
 * Controller para listagem de projetos
 * - Valida query params com Zod schema
 * - Chama service para buscar dados
 * - Retorna resposta padronizada
 */

export async function GET(req: Request) {
  try {
    // Extrair e validar query params
    const { searchParams } = new URL(req.url)
    const queryParams = Object.fromEntries(searchParams.entries())
    const query = projectListQuerySchema.parse(queryParams)

    // Buscar projetos
    const result = await listProjects(query)

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Version': 'v1',
      },
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/projects] error', err)
    return NextResponse.json(
      { ok: false, message: 'Erro ao buscar projetos' },
      { status: 500 }
    )
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'


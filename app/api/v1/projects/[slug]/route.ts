import { NextResponse } from 'next/server'
import { projectSlugSchema } from '@/models/schemas'
import { getProjectBySlug } from '@/controllers/services/project.service'

/**
 * API Route: GET /api/v1/projects/[slug]
 * 
 * Controller para detalhes de projeto
 * - Valida params com Zod schema
 * - Chama service para buscar dados
 * - Retorna resposta padronizada
 */

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Validar params
    const validatedParams = projectSlugSchema.parse(params)

    // Buscar projeto
    const project = await getProjectBySlug(validatedParams)

    if (!project) {
      return NextResponse.json(
        { ok: false, message: 'Projeto não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(project, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Version': 'v1',
      },
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/projects/[slug]] error', err)
    return NextResponse.json(
      { ok: false, message: 'Erro ao buscar projeto' },
      { status: 500 }
    )
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'


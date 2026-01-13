import { apiError, apiResponse } from '@/lib/api/response'
import { prisma } from '@/lib/db/prisma'
import { API_DEFAULTS } from '@/lib/api/constants'
import { cookies } from 'next/headers'

/**
 * API Route: GET /api/v1/admin/contacts
 * 
 * Lista submissões de contato (apenas para admin autenticado)
 * - Requer autenticação
 * - Filtros e paginação
 */

export async function GET(req: Request) {
  try {
    // Verificar autenticação
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')
    
    if (!session || !session.value) {
      return apiError('Não autenticado', 401)
    }

    // Extrair query params
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || undefined
    const limit = parseInt(searchParams.get('limit') || String(API_DEFAULTS.DEFAULT_LIMIT), 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    // Construir filtros
    const where: {
      status?: 'new' | 'read' | 'replied' | 'archived'
    } = {}

    if (status) {
      where.status = status as 'new' | 'read' | 'replied' | 'archived'
    }

    // Buscar submissões
    const [contacts, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: [
          { createdAt: 'desc' },
        ],
        take: Math.min(limit, API_DEFAULTS.MAX_LIMIT),
        skip: offset,
        include: {
          lead: {
            select: {
              id: true,
              name: true,
              email: true,
              status: true,
            },
          },
        },
      }),
      prisma.contactSubmission.count({ where }),
    ])

    return apiResponse(
      {
        contacts,
        total,
        limit: Math.min(limit, API_DEFAULTS.MAX_LIMIT),
        offset,
        hasMore: offset + contacts.length < total,
      },
      200
    )
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/admin/contacts] GET error', err)
    return apiError('Erro ao buscar submissões de contato', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

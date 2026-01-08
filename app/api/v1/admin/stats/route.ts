import { cookies } from 'next/headers'
import { apiResponse, apiError } from '@/lib/api/response'
import { prisma } from '@/lib/db/prisma'

/**
 * API Route: GET /api/v1/admin/stats
 * 
 * Retorna estatísticas para o dashboard admin
 * - Total de leads, clientes, projetos, etc.
 * - Estatísticas por status
 * - Métricas do dia
 */

export async function GET() {
  try {
    // Verificar autenticação
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session || !session.value) {
      return apiError('Não autenticado', 401)
    }

    // Buscar estatísticas em paralelo
    const [
      leadsTotal,
      leadsNew,
      leadsContacted,
      leadsQualified,
      clientsTotal,
      clientsActive,
      projectsTotal,
      projectsPublished,
      testimonialsTotal,
      contactsTotal,
      contactsToday,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'new' } }),
      prisma.lead.count({ where: { status: 'contacted' } }),
      prisma.lead.count({ where: { status: 'qualified' } }),
      prisma.client.count(),
      prisma.client.count({ where: { status: 'active' } }),
      prisma.project.count(),
      prisma.project.count({ where: { status: 'published' } }),
      prisma.testimonial.count(),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ])

    const stats = {
      leads: {
        total: leadsTotal,
        new: leadsNew,
        contacted: leadsContacted,
        qualified: leadsQualified,
      },
      clients: {
        total: clientsTotal,
        active: clientsActive,
      },
      projects: {
        total: projectsTotal,
        published: projectsPublished,
      },
      testimonials: {
        total: testimonialsTotal,
      },
      contacts: {
        total: contactsTotal,
        today: contactsToday,
      },
    }

    return apiResponse(stats, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/admin/stats] error', err)
    return apiError('Erro ao carregar estatísticas', 500)
  }
}

export const runtime = 'nodejs'

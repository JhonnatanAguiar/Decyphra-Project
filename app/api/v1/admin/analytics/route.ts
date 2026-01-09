import { cookies } from 'next/headers'
import { apiResponse, apiError } from '@/lib/api/response'
import {
  getPageViewsStats,
  getEventsStats,
  getAverageSessionDuration,
  getUniqueSessions,
} from '@/controllers/services/analytics.service'

/**
 * API Route: GET /api/v1/admin/analytics
 * 
 * Retorna estatísticas de analytics para o dashboard admin
 * Requer autenticação
 */

export async function GET(req: Request) {
  try {
    // Verificar autenticação
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session || !session.value) {
      return apiError('Não autenticado', 401)
    }

    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '7', 10)
    
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const [pageViews, events, avgDuration, uniqueSessions] = await Promise.all([
      getPageViewsStats(startDate, endDate),
      getEventsStats(startDate, endDate),
      getAverageSessionDuration(startDate, endDate),
      getUniqueSessions(startDate, endDate),
    ])

    return apiResponse(
      {
        period: { startDate, endDate, days },
        pageViews,
        events,
        avgSessionDuration: Math.round(avgDuration),
        uniqueSessions,
      },
      200
    )
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/admin/analytics] error', err)
    return apiError('Erro ao buscar estatísticas de analytics', 500)
  }
}

export const runtime = 'nodejs'

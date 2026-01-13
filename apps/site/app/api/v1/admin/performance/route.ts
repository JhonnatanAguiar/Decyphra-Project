import { cookies } from 'next/headers'
import { apiResponse, apiError } from '@/lib/api/response'
import {
  getPerformanceStats,
  getErrorLogs,
} from '@/controllers/services/analytics.service'

/**
 * API Route: GET /api/v1/admin/performance
 * 
 * Retorna estatísticas de performance e erros para o dashboard admin
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

    const [performance, errorLogs] = await Promise.all([
      getPerformanceStats(startDate, endDate),
      getErrorLogs(startDate, endDate, 20),
    ])

    return apiResponse(
      {
        period: { startDate, endDate, days },
        performance,
        errors: errorLogs,
      },
      200
    )
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/admin/performance] error', err)
    return apiError('Erro ao buscar estatísticas de performance', 500)
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

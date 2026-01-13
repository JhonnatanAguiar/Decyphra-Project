import { apiResponse, apiError } from '@/lib/api/response'
import { createPerformanceMetric } from '@/controllers/services/analytics.service'

/**
 * API Route: POST /api/v1/analytics/performance
 * 
 * Endpoint para registrar métricas de performance (Core Web Vitals)
 */

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validar campos mínimos
    if (!body.path || !body.metric || body.value === undefined) {
      return apiError('path, metric e value são obrigatórios', 400)
    }

    const metric = await createPerformanceMetric({
      path: body.path,
      metric: body.metric, // FCP, LCP, FID, CLS, TTFB
      value: body.value,
      device: body.device || undefined,
      connection: body.connection || undefined,
      metadata: body.metadata || undefined,
    })

    return apiResponse({ id: metric.id }, 201)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/analytics/performance] error', err)
    return apiError('Erro ao registrar métrica de performance', 500)
  }
}

export const runtime = 'nodejs'

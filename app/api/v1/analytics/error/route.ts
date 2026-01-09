import { apiResponse, apiError } from '@/lib/api/response'
import { createErrorLog } from '@/controllers/services/analytics.service'

/**
 * API Route: POST /api/v1/analytics/error
 * 
 * Endpoint para registrar erros do frontend
 */

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validar campos mínimos
    if (!body.message || !body.severity) {
      return apiError('message e severity são obrigatórios', 400)
    }

    const errorLog = await createErrorLog({
      message: body.message,
      stack: body.stack || null,
      path: body.path || null,
      userAgent: body.userAgent || null,
      userId: body.userId || null,
      sessionId: body.sessionId || null,
      severity: body.severity, // error, warning, info
      metadata: body.metadata || null,
    })

    return apiResponse({ id: errorLog.id }, 201)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/analytics/error] error', err)
    return apiError('Erro ao registrar log de erro', 500)
  }
}

export const runtime = 'nodejs'

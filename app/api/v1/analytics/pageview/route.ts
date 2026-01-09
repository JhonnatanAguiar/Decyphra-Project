import { apiResponse, apiError } from '@/lib/api/response'
import { createPageView } from '@/controllers/services/analytics.service'

/**
 * API Route: POST /api/v1/analytics/pageview
 * 
 * Endpoint para registrar page views (tracking)
 */

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validar campos mínimos
    if (!body.path || !body.sessionId) {
      return apiError('path e sessionId são obrigatórios', 400)
    }

    const pageView = await createPageView({
      path: body.path,
      title: body.title || null,
      referrer: body.referrer || null,
      userAgent: body.userAgent || null,
      ip: body.ip || null,
      country: body.country || null,
      city: body.city || null,
      device: body.device || null,
      browser: body.browser || null,
      os: body.os || null,
      screenWidth: body.screenWidth || null,
      screenHeight: body.screenHeight || null,
      sessionId: body.sessionId,
      userId: body.userId || null,
      duration: body.duration || null,
    })

    return apiResponse({ id: pageView.id }, 201)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/analytics/pageview] error', err)
    return apiError('Erro ao registrar page view', 500)
  }
}

export const runtime = 'nodejs'

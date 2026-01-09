import { apiResponse, apiError } from '@/lib/api/response'
import { createEvent } from '@/controllers/services/analytics.service'

/**
 * API Route: POST /api/v1/analytics/event
 * 
 * Endpoint para registrar eventos (clicks, submits, etc)
 */

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validar campos mínimos
    if (!body.name || !body.path || !body.sessionId) {
      return apiError('name, path e sessionId são obrigatórios', 400)
    }

    const event = await createEvent({
      name: body.name,
      category: body.category || null,
      action: body.action || null,
      label: body.label || null,
      value: body.value || null,
      path: body.path,
      sessionId: body.sessionId,
      userId: body.userId || null,
      metadata: body.metadata || null,
    })

    return apiResponse({ id: event.id }, 201)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/analytics/event] error', err)
    return apiError('Erro ao registrar evento', 500)
  }
}

export const runtime = 'nodejs'

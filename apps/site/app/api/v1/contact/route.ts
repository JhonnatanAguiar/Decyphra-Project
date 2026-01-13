import { apiError, apiResponse } from '@/lib/api/response'
import { z } from 'zod'
import { contactSchema } from '@/models/schemas'
import { sendContactEmail } from '@/controllers/services'

/**
 * API Route: POST /api/v1/contact
 * 
 * Controller para envio de formulário de contato
 * - Valida dados com Zod schema
 * - Chama service para processar
 * - Retorna resposta padronizada
 */

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    // Integra com serviço de email (Resend) com fallback para log
    const result = await sendContactEmail(data)
    if (!result.ok) {
      // eslint-disable-next-line no-console
      console.error('[api/contact] sendContactEmail error', result.error)
      return apiError('Erro enviando mensagem', 500)
    }

    return apiResponse({ ok: true, message: 'Mensagem recebida', via: result.provider }, 200)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Dados inválidos', 400, err.errors)
    }
    // eslint-disable-next-line no-console
    console.error('[api/contact] error', err)
    return apiError('Erro interno', 500)
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'
// Forçar renderização dinâmica (rota de API)
export const dynamic = 'force-dynamic'

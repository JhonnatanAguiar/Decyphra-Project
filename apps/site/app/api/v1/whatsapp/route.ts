import { z } from 'zod'
import { whatsappSchema } from '@/models/schemas'
import { sendWhatsAppMessage } from '@/controllers/services'
import { apiResponse, apiError } from '@/lib/api/response'

/**
 * API Route: POST /api/v1/whatsapp
 * 
 * Controller para envio de mensagem WhatsApp
 * - Valida dados com Zod schema
 * - Chama service para processar
 * - Retorna resposta padronizada
 */

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = whatsappSchema.parse(body)

    // Integra com serviço de WhatsApp (Twilio) com fallback para log
    const result = await sendWhatsAppMessage(data)
    if (!result.ok) {
      // eslint-disable-next-line no-console
      console.error('[api/whatsapp] sendWhatsAppMessage error', result.error)
      return apiError('Erro enviando mensagem WhatsApp', 500)
    }

    return apiResponse(
      {
        ok: true,
        message: 'Mensagem WhatsApp enviada com sucesso',
        via: result.provider,
      },
      200
    )
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Dados inválidos', 400, err.errors)
    }
    // eslint-disable-next-line no-console
    console.error('[api/whatsapp] error', err)
    return apiError('Erro interno', 500)
  }
}

// Usar runtime Node para permitir uso de Twilio no servidor
export const runtime = 'nodejs'

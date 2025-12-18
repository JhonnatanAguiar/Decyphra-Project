import { NextResponse } from 'next/server'
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
      return NextResponse.json({ ok: false, message: 'Erro enviando mensagem' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, message: 'Mensagem recebida', via: result.provider })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.errors }, { status: 400 })
    }
    // eslint-disable-next-line no-console
    console.error('[api/contact] error', err)
    return NextResponse.json({ ok: false, message: 'Erro interno' }, { status: 500 })
  }
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'

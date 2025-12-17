import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactEmail } from '@/lib/services/contact.service'

const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10),
})

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

export const runtime = 'edge'

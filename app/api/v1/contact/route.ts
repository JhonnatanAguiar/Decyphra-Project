import { NextResponse } from 'next/server'
import { z } from 'zod'

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

    // TODO: integrar com serviço de email / persistência (Fase 5.2)
    // Por enquanto, apenas logamos e retornamos sucesso
    // eslint-disable-next-line no-console
    console.info('[api/contact] received', { name: data.name, email: data.email, service: data.service })

    return NextResponse.json({ ok: true, message: 'Mensagem recebida' })
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

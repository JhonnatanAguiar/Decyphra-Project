import { NextResponse } from 'next/server'
import { requestAccessSchema } from '@/lib/request-access-schema'

/**
 * POST /api/request-access
 * Formulário "Solicitar acesso" / "Join waitlist".
 * Valida nome e e-mail; em produção pode integrar com CRM ou e-mail.
 * Por ora: validação + resposta de sucesso (mock).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = requestAccessSchema.safeParse(body)

    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors
      const msg = first.name?.[0] ?? first.email?.[0] ?? 'Dados inválidos'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const { name, email } = parsed.data

    // Mock: em produção, enviar para CRM, Resend, webhook, etc.
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[request-access]', { name, email })
    }

    return NextResponse.json({ ok: true, message: 'Solicitação recebida.' })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao processar. Tente novamente.' },
      { status: 500 }
    )
  }
}

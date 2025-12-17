export type ContactPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
}

async function sendViaResend(payload: ContactPayload) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'noreply@decyphra.com.br'
  const to = process.env.EMAIL_TO || 'jhonnatanaguiar@decyphra.com.br'
  if (!key) throw new Error('RESEND_API_KEY not configured')

  const subject = `Novo contato: ${payload.name} — ${payload.service ?? 'Sem serviço'}`
  const bodyHtml = `
    <p><strong>Nome:</strong> ${payload.name}</p>
    <p><strong>E-mail:</strong> ${payload.email}</p>
    <p><strong>Telefone:</strong> ${payload.phone ?? '-'}</p>
    <p><strong>Empresa:</strong> ${payload.company ?? '-'}</p>
    <p><strong>Serviço:</strong> ${payload.service ?? '-'}</p>
    <hr/>
    <p>${payload.message}</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html: bodyHtml,
    }),
  })

  const text = await res.text()
  let body: any = text
  try {
    body = JSON.parse(text)
  } catch (e) {
    // keep raw text
  }

  if (!res.ok) {
    throw new Error(`Resend error: ${res.status} ${JSON.stringify(body)}`)
  }

  return body
}

import { prisma } from '@/lib/db/prisma'

export async function sendContactEmail(payload: ContactPayload) {
  try {
    const via = process.env.RESEND_API_KEY ? 'resend' : 'log'
    let providerResult: any = null

    if (process.env.RESEND_API_KEY) {
      providerResult = await sendViaResend(payload)
    } else {
      // Fallback: apenas logar quando não há chave configurada
      // eslint-disable-next-line no-console
      console.info('[contact.service] fallback log:', payload)
    }

    // Persistir submissão no banco, se config disponível

    if (process.env.DATABASE_URL) {
      try {
        await prisma.contactSubmission.create({
          data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone ?? null,
            service: payload.service ?? null,
            message: payload.message,
            metadata: providerResult ?? null,
          },
        })
      } catch (dbErr) {
        // eslint-disable-next-line no-console
        console.error('[contact.service] prisma error', dbErr)
      }
    }

    return { ok: true, provider: via, providerResult }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact.service] error', err)
    return { ok: false, error: String(err) }
  }
}

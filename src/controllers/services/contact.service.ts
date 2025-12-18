import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import type { ContactInput } from '@/models/schemas'
import type { ContactEmailResult } from '@/models/types'

/**
 * Contact Service
 * 
 * Service responsável pela lógica de negócio de contato
 * - Envio de emails via Resend
 * - Persistência no banco de dados
 * - Fallback para log quando Resend não está configurado
 */

async function sendViaResend(payload: ContactInput) {
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
  let body: unknown = text
  try {
    body = JSON.parse(text)
  } catch {
    // keep raw text
  }

  if (!res.ok) {
    throw new Error(`Resend error: ${res.status} ${JSON.stringify(body)}`)
  }

  return body
}

/**
 * Envia email de contato via Resend e persiste no banco de dados
 * 
 * @param payload - Dados do formulário de contato
 * @returns Resultado do envio (ok, provider, error)
 */
export async function sendContactEmail(payload: ContactInput): Promise<ContactEmailResult> {
  try {
    const via = process.env.RESEND_API_KEY ? 'resend' : 'log'
    let providerResult: unknown = null

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
            metadata: providerResult ? (providerResult as Prisma.InputJsonValue) : null,
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
    return { ok: false, error: String(err), provider: 'log' }
  }
}


import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import type { ContactInput } from '@/models/schemas'
import type { ContactEmailResult } from '@/models/types'
import {
  getConfirmationEmailTemplate,
  getInternalNotificationTemplate,
} from '@/lib/templates/email-templates'

/**
 * Contact Service
 * 
 * Service responsável pela lógica de negócio de contato
 * - Envio de emails via Resend (confirmação para cliente + notificação interna)
 * - Persistência no banco de dados
 * - Fallback para log quando Resend não está configurado
 */

/**
 * Função auxiliar para enviar e-mail via Resend API
 */
async function sendEmailViaResend(options: {
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<unknown> {
  const key = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'noreply@decyphra.com.br'
  
  if (!key) {
    throw new Error('RESEND_API_KEY not configured')
  }

  const payload: {
    from: string
    to: string
    subject: string
    html: string
    reply_to?: string
  } = {
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  }

  // Adicionar reply_to se fornecido
  if (options.replyTo) {
    payload.reply_to = options.replyTo
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(payload),
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
 * Envia e-mail de confirmação para o cliente
 */
async function sendConfirmationToClient(payload: ContactInput): Promise<unknown> {
  const html = getConfirmationEmailTemplate(payload.name)
  const subject = 'Mensagem Recebida - Decyphra'

  return sendEmailViaResend({
    to: payload.email,
    subject,
    html,
  })
}

/**
 * Envia notificação interna para a equipe
 */
async function sendInternalNotification(payload: ContactInput): Promise<unknown> {
  const to = process.env.EMAIL_TO || 'contato@decyphra.com.br'
  const html = getInternalNotificationTemplate({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    countryCode: payload.countryCode,
    company: payload.company,
    service: payload.service,
    message: payload.message,
  })
  const subject = `Novo contato: ${payload.name}${payload.service ? ` — ${payload.service}` : ''}`

  return sendEmailViaResend({
    to,
    subject,
    html,
    replyTo: payload.email, // Permite responder direto para o cliente
  })
}

/**
 * Envia emails de contato via Resend e persiste no banco de dados
 * 
 * Envia dois e-mails:
 * 1. Confirmação para o cliente (template bonito)
 * 2. Notificação interna para contato@decyphra.com.br
 * 
 * @param payload - Dados do formulário de contato
 * @returns Resultado do envio (ok, provider, error)
 */
export async function sendContactEmail(payload: ContactInput): Promise<ContactEmailResult> {
  try {
    const via = process.env.RESEND_API_KEY ? 'resend' : 'log'
    let providerResult: {
      confirmation?: unknown
      notification?: unknown
    } | null = null

    if (process.env.RESEND_API_KEY) {
      // Enviar ambos os e-mails em paralelo
      const [confirmationResult, notificationResult] = await Promise.allSettled([
        sendConfirmationToClient(payload),
        sendInternalNotification(payload),
      ])

      providerResult = {
        confirmation: confirmationResult.status === 'fulfilled' ? confirmationResult.value : null,
        notification: notificationResult.status === 'fulfilled' ? notificationResult.value : null,
      }

      // Log de erros se houver
      if (confirmationResult.status === 'rejected') {
        // eslint-disable-next-line no-console
        console.error('[contact.service] erro ao enviar confirmação:', confirmationResult.reason)
      }
      if (notificationResult.status === 'rejected') {
        // eslint-disable-next-line no-console
        console.error('[contact.service] erro ao enviar notificação:', notificationResult.reason)
      }
    } else {
      // Fallback: apenas logar quando não há chave configurada
      // eslint-disable-next-line no-console
      console.info('[contact.service] fallback log:', payload)
    }

    // Persistir submissão no banco e criar lead automaticamente, se config disponível
    if (process.env.DATABASE_URL) {
      try {
        // Criar ContactSubmission e Lead em uma transação
        const contactSubmission = await prisma.contactSubmission.create({
          data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone ?? null,
            service: payload.service ?? null,
            message: payload.message,
            metadata: providerResult ? (providerResult as Prisma.InputJsonValue) : undefined,
          },
        })

        // Criar Lead automaticamente a partir do ContactSubmission
        try {
          await prisma.lead.create({
            data: {
              name: payload.name,
              email: payload.email,
              phone: payload.phone ?? null,
              company: payload.company ?? null,
              service: payload.service ?? null,
              source: 'formulario_contato',
              status: 'new',
              score: 0,
              notes: payload.message ? `Mensagem original: ${payload.message.substring(0, 500)}` : null,
              contactSubmissionId: contactSubmission.id,
            },
          })
        } catch (leadErr) {
          // Log erro mas não falha o envio do email se criação de lead falhar
          // eslint-disable-next-line no-console
          console.error('[contact.service] erro ao criar lead:', leadErr)
        }
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


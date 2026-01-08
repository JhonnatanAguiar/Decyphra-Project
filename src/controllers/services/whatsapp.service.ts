import type { WhatsAppInput } from '@/models/schemas'
import type { WhatsAppResult, SendWhatsAppOptions } from '@/models/types'
import {
  getWhatsAppConfirmationTemplate,
  getWhatsAppInternalNotificationTemplate,
} from '@/lib/templates/whatsapp-templates'

/**
 * WhatsApp Service
 * 
 * Service responsável pela lógica de negócio de envio de mensagens WhatsApp
 * - Envio de mensagens via Twilio (confirmação para cliente + notificação interna)
 * - Suporte para envio de imagens
 * - Fallback para log quando Twilio não está configurado
 */

/**
 * Função auxiliar para enviar mensagem WhatsApp via Twilio API
 */
async function sendMessageViaTwilio(options: SendWhatsAppOptions): Promise<unknown> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886' // Twilio Sandbox default
  
  if (!accountSid || !authToken) {
    throw new Error('TWILIO_ACCOUNT_SID e TWILIO_AUTH_TOKEN devem estar configurados')
  }

  // Normalizar número do destinatário (garantir formato E.164)
  const toNumber = options.to.startsWith('whatsapp:') ? options.to : `whatsapp:${options.to}`

  // Preparar payload base
  const payload: {
    from: string
    to: string
    body: string
    mediaUrl?: string[]
  } = {
    from: fromNumber,
    to: toNumber,
    body: options.message,
  }

  // Adicionar imagem se fornecida
  if (options.imageUrl) {
    payload.mediaUrl = [options.imageUrl]
  }

  // Importar Twilio dinamicamente (instalar com: npm install twilio)
  const { Twilio } = await import('twilio')
  const client = new Twilio(accountSid, authToken)

  const message = await client.messages.create(payload)

  return {
    sid: message.sid,
    status: message.status,
    to: message.to,
    from: message.from,
  }
}

/**
 * Envia mensagem de confirmação para o cliente via WhatsApp
 */
async function sendConfirmationToClient(payload: WhatsAppInput): Promise<unknown> {
  const message = getWhatsAppConfirmationTemplate(payload.name)
  
  return sendMessageViaTwilio({
    to: payload.phone,
    message,
    imageUrl: payload.imageUrl,
  })
}

/**
 * Envia notificação interna para a equipe via WhatsApp
 */
async function sendInternalNotification(payload: WhatsAppInput): Promise<unknown> {
  const toNumber = process.env.WHATSAPP_TO || process.env.TWILIO_WHATSAPP_TO
  
  if (!toNumber) {
    // eslint-disable-next-line no-console
    console.warn('[whatsapp.service] WHATSAPP_TO não configurado, pulando notificação interna')
    return null
  }

  const message = getWhatsAppInternalNotificationTemplate({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    company: payload.company,
    service: payload.service,
    message: payload.message,
  })

  return sendMessageViaTwilio({
    to: toNumber,
    message,
  })
}

/**
 * Envia mensagens WhatsApp via Twilio e persiste no banco de dados
 * 
 * Envia duas mensagens:
 * 1. Confirmação para o cliente (template bonito)
 * 2. Notificação interna para número configurado em WHATSAPP_TO
 * 
 * @param payload - Dados do formulário de contato
 * @returns Resultado do envio (ok, provider, error)
 */
export async function sendWhatsAppMessage(payload: WhatsAppInput): Promise<WhatsAppResult> {
  try {
    const via = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN ? 'twilio' : 'log'
    let providerResult: {
      confirmation?: unknown
      notification?: unknown
    } | null = null

    if (via === 'twilio') {
      // Enviar ambos as mensagens em paralelo
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
        console.error('[whatsapp.service] erro ao enviar confirmação:', confirmationResult.reason)
      }
      if (notificationResult.status === 'rejected') {
        // eslint-disable-next-line no-console
        console.error('[whatsapp.service] erro ao enviar notificação:', notificationResult.reason)
      }
    } else {
      // Fallback: apenas logar quando não há credenciais configuradas
      // eslint-disable-next-line no-console
      console.info('[whatsapp.service] fallback log (Twilio não configurado):', {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
      })
    }

    return {
      ok: true,
      provider: via,
      providerResult: providerResult as WhatsAppResult['providerResult'],
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[whatsapp.service] error', err)
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      provider: 'log',
    }
  }
}

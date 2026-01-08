/**
 * WhatsApp Types
 * 
 * Types TypeScript para entidades e DTOs de WhatsApp
 */

/**
 * Resultado do serviço de WhatsApp
 */
export type WhatsAppResult = {
  ok: boolean
  provider: 'twilio' | 'log'
  providerResult?: {
    sid?: string
    status?: string
  }
  error?: string
}

/**
 * Opções para envio de mensagem WhatsApp
 */
export type SendWhatsAppOptions = {
  to: string // Número no formato E.164 (ex: +5511999999999)
  message: string
  imageUrl?: string
}

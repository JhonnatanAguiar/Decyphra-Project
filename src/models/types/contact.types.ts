/**
 * Contact Types
 * 
 * Types TypeScript para entidades e DTOs de contato
 */

import { ContactSubmission, ContactStatus } from '@prisma/client'

/**
 * DTO para criação de contato
 */
export type CreateContactDTO = {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service?: string | null
  message: string
  metadata?: Record<string, unknown> | null
}

/**
 * DTO para resposta de contato
 */
export type ContactResponseDTO = {
  id: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service?: string | null
  message: string
  status: ContactStatus
  createdAt: Date
  updatedAt: Date
}

/**
 * Resultado do serviço de email
 */
export type ContactEmailResult = {
  ok: boolean
  provider: 'resend' | 'log'
  providerResult?: unknown
  error?: string
}


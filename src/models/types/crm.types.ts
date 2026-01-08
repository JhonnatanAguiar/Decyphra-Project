/**
 * CRM Types
 * 
 * Types TypeScript para entidades e DTOs do CRM
 */

import type { Lead, Client, Interaction, LeadStatus, ClientStatus, InteractionType, InteractionChannel } from '@prisma/client'

/**
 * DTO para resposta de Lead (com relacionamentos opcionais)
 */
export type LeadDTO = Lead & {
  convertedToClient?: ClientDTO | null
  interactions?: InteractionDTO[]
  contactSubmission?: { id: string; message: string } | null
}

/**
 * DTO para resposta de lista de Leads
 */
export type LeadListDTO = {
  leads: LeadDTO[]
  total: number
  limit: number
  offset: number
}

/**
 * DTO para resposta de Client (com relacionamentos opcionais)
 */
export type ClientDTO = Client & {
  convertedFromLead?: LeadDTO | null
  interactions?: InteractionDTO[]
}

/**
 * DTO para resposta de lista de Clients
 */
export type ClientListDTO = {
  clients: ClientDTO[]
  total: number
  limit: number
  offset: number
}

/**
 * DTO para resposta de Interaction (com relacionamentos opcionais)
 */
export type InteractionDTO = Interaction & {
  lead?: LeadDTO | null
  client?: ClientDTO | null
}

/**
 * DTO para resposta de lista de Interactions
 */
export type InteractionListDTO = {
  interactions: InteractionDTO[]
  total: number
  limit: number
  offset: number
}

/**
 * Exportar enums do Prisma
 */
export type { LeadStatus, ClientStatus, InteractionType, InteractionChannel }

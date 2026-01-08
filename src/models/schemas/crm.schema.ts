import { z } from 'zod'

/**
 * CRM Schemas
 * 
 * Schemas Zod para validação de dados do CRM
 */

/**
 * Schema para criação/atualização de Lead
 */
export const leadSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  source: z.string().optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost', 'archived']).optional(),
  score: z.number().int().min(0).max(100).optional(),
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  contactSubmissionId: z.string().uuid().optional(),
})

export const updateLeadSchema = leadSchema.partial().extend({
  id: z.string().uuid(),
})

export type LeadInput = z.infer<typeof leadSchema>
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>

/**
 * Schema para criação/atualização de Client
 */
export const clientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  cnpj: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'archived']).optional(),
  segment: z.string().optional(),
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  convertedFromLeadId: z.string().uuid().optional(),
})

export const updateClientSchema = clientSchema.partial().extend({
  id: z.string().uuid(),
})

export type ClientInput = z.infer<typeof clientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>

/**
 * Schema para criação de Interaction
 */
export const interactionSchema = z.object({
  type: z.enum(['call', 'email', 'whatsapp', 'meeting', 'proposal', 'follow_up', 'note', 'other']),
  subject: z.string().optional(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  channel: z.enum(['phone', 'email', 'whatsapp', 'video_call', 'in_person', 'system', 'other']),
  leadId: z.string().uuid().optional(),
  clientId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
  createdBy: z.string().optional(),
})

export type InteractionInput = z.infer<typeof interactionSchema>

/**
 * Schema para query de listagem de leads
 */
export const leadListQuerySchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost', 'archived']).optional(),
  source: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
})

export type LeadListQuery = z.infer<typeof leadListQuerySchema>

/**
 * Schema para query de listagem de clients
 */
export const clientListQuerySchema = z.object({
  status: z.enum(['active', 'inactive', 'suspended', 'archived']).optional(),
  segment: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
})

export type ClientListQuery = z.infer<typeof clientListQuerySchema>

/**
 * Schema para query de listagem de interactions
 */
export const interactionListQuerySchema = z.object({
  leadId: z.string().uuid().optional(),
  clientId: z.string().uuid().optional(),
  type: z.enum(['call', 'email', 'whatsapp', 'meeting', 'proposal', 'follow_up', 'note', 'other']).optional(),
  channel: z.enum(['phone', 'email', 'whatsapp', 'video_call', 'in_person', 'system', 'other']).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
})

export type InteractionListQuery = z.infer<typeof interactionListQuerySchema>

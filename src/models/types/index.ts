/**
 * Types Barrel Export
 * 
 * Exporta todos os types TypeScript para facilitar imports
 */

// Contact
export type {
  CreateContactDTO,
  ContactResponseDTO,
  ContactEmailResult,
} from './contact.types'

// Project
export type {
  ProjectListDTO,
  ProjectDetailDTO,
} from './project.types'

// Testimonial
export type {
  TestimonialListDTO,
} from './testimonial.types'

// Service
export type {
  ServiceListDTO,
} from './service.types'

// WhatsApp
export type {
  WhatsAppResult,
  SendWhatsAppOptions,
} from './whatsapp.types'

// CRM
export type {
  LeadDTO,
  LeadListDTO,
  ClientDTO,
  ClientListDTO,
  InteractionDTO,
  InteractionListDTO,
  LeadStatus,
  ClientStatus,
  InteractionType,
  InteractionChannel,
} from './crm.types'


/**
 * Schemas Barrel Export
 * 
 * Exporta todos os schemas Zod para facilitar imports
 */

// Contact
export { contactSchema, type ContactInput } from './contact.schema'

// Newsletter
export { newsletterSchema, type NewsletterInput } from './newsletter.schema'

// Project
export {
  projectListQuerySchema,
  projectSlugSchema,
  type ProjectListQuery,
  type ProjectSlugParams,
} from './project.schema'

// Testimonial
export {
  testimonialListQuerySchema,
  type TestimonialListQuery,
} from './testimonial.schema'

// Service
export {
  serviceListQuerySchema,
  type ServiceListQuery,
} from './service.schema'

// WhatsApp
export { whatsappSchema, type WhatsAppInput } from './whatsapp.schema'

// CRM
export {
  leadSchema,
  updateLeadSchema,
  clientSchema,
  updateClientSchema,
  interactionSchema,
  leadListQuerySchema,
  clientListQuerySchema,
  interactionListQuerySchema,
  type LeadInput,
  type UpdateLeadInput,
  type ClientInput,
  type UpdateClientInput,
  type InteractionInput,
  type LeadListQuery,
  type ClientListQuery,
  type InteractionListQuery,
} from './crm.schema'


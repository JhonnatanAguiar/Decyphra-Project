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


/**
 * Services Barrel Export
 * 
 * Exporta todos os services para facilitar imports
 */

export { sendContactEmail } from './contact.service'
export { sendWhatsAppMessage } from './whatsapp.service'
export { listServices } from './service.service'
export { listProjects, getProjectBySlug } from './project.service'
export { listTestimonials } from './testimonial.service'
export {
  listLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  convertLeadToClient,
  listClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  listInteractions,
  getInteractionById,
  createInteraction,
} from './crm.service'


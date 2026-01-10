import { z } from 'zod'
import { isValidPhone } from '@/lib/utils/phone'
import type { CountryCode } from 'libphonenumber-js'

/**
 * Contact Schema
 * 
 * Schema Zod para validação de dados de contato
 * Usado em API routes e formulários
 */

// Schema base que aceita país e telefone
const baseContactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  countryCode: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

// Schema com validação de telefone quando fornecido
export const contactSchema = baseContactSchema.refine(
  (data) => {
    // Se telefone for fornecido, deve ter país e ser válido
    if (data.phone && data.phone.trim()) {
      if (!data.countryCode) {
        return false
      }
      
      try {
        return isValidPhone(data.phone, data.countryCode as CountryCode)
      } catch {
        return false
      }
    }
    
    // Se não forneceu telefone, está ok
    return true
  },
  {
    message: 'Telefone inválido para o país selecionado',
    path: ['phone'], // Erro vai aparecer no campo phone
  }
)

export type ContactInput = z.infer<typeof contactSchema>


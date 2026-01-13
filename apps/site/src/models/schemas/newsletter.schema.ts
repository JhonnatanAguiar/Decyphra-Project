import { z } from 'zod'

/**
 * Newsletter Schema
 * 
 * Schema Zod para validação de dados de newsletter
 */

export const newsletterSchema = z.object({
  email: z.string().email('E-mail inválido'),
  source: z.string().optional(), // De onde veio a inscrição (ex: 'home', 'footer', 'popup')
})

export type NewsletterInput = z.infer<typeof newsletterSchema>


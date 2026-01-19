import { z } from 'zod'

export const requestAccessSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(120, 'Nome deve ter no máximo 120 caracteres')
    .trim(),
  email: z.string().email('E-mail inválido'),
})

export type RequestAccessInput = z.infer<typeof requestAccessSchema>

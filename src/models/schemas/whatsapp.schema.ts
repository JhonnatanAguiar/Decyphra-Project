import { z } from 'zod'

/**
 * WhatsApp Schema
 * 
 * Schema Zod para validação de dados de envio de mensagem WhatsApp
 * Similar ao contactSchema mas adaptado para WhatsApp
 */

export const whatsappSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone é obrigatório para WhatsApp').regex(/^\+?[1-9]\d{1,14}$/, 'Telefone deve estar em formato E.164 (ex: +5511999999999)'),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  imageUrl: z.string().url('URL da imagem inválida').optional(),
})

export type WhatsAppInput = z.infer<typeof whatsappSchema>

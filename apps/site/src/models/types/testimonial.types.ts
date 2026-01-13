/**
 * Testimonial Types
 * 
 * Types TypeScript para entidades e DTOs de depoimentos
 */

import { Testimonial } from '@prisma/client'

/**
 * DTO para listagem de depoimentos
 */
export type TestimonialListDTO = {
  testimonials: Testimonial[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}


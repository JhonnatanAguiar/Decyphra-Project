/**
 * Service Types
 * 
 * Types TypeScript para entidades e DTOs de serviços
 */

import { Service } from '@prisma/client'

/**
 * DTO para listagem de serviços
 */
export type ServiceListDTO = {
  services: Service[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}


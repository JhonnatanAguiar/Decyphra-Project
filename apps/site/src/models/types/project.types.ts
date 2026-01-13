/**
 * Project Types
 * 
 * Types TypeScript para entidades e DTOs de projetos
 */

import { Project } from '@prisma/client'

/**
 * DTO para listagem de projetos
 */
export type ProjectListDTO = {
  projects: Project[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

/**
 * DTO para projeto individual
 */
export type ProjectDetailDTO = Project


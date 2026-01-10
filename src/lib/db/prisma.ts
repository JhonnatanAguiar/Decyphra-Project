import { PrismaClient } from '@prisma/client'

/**
 * Prisma Client singleton
 * 
 * Em desenvolvimento, cria uma nova instância
 * Em produção, reutiliza a instância global para evitar múltiplas conexões
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Reduzir logs em desenvolvimento para evitar poluição
    // Apenas erros e avisos são logados
    // Queries são muito verbosas e poluem os logs com analytics
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

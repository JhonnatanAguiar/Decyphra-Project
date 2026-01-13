import { apiResponse } from '@/lib/api/response'
import { prisma } from '@/lib/db/prisma'

/**
 * API Route: GET /api/v1/status
 * 
 * Retorna o status atual da API, banco de dados e servidor
 */

export async function GET() {
  const startTime = Date.now()
  let dbStatus: 'operational' | 'degraded' | 'down' = 'operational'
  let dbResponseTime = 0
  let dbConnected = false

  // Testar conexão com banco de dados
  try {
    const dbStartTime = Date.now()
    await prisma.$queryRaw`SELECT 1`
    dbResponseTime = Date.now() - dbStartTime
    dbConnected = true
    dbStatus = dbResponseTime < 100 ? 'operational' : dbResponseTime < 500 ? 'degraded' : 'down'
  } catch {
    dbStatus = 'down'
    dbConnected = false
    dbResponseTime = 0
  }

  // Calcular tempo de resposta da API
  const apiResponseTime = Date.now() - startTime

  // Status geral baseado nos componentes
  const overallStatus: 'operational' | 'degraded' | 'down' = 
    dbStatus === 'down' ? 'down' : 
    dbStatus === 'degraded' ? 'degraded' : 
    'operational'

  // Dados de resposta
  const statusData = {
    status: overallStatus,
    api: {
      status: apiResponseTime < 200 ? 'operational' : apiResponseTime < 1000 ? 'degraded' : 'down',
      responseTime: apiResponseTime,
      uptime: 99.9, // Mock - em produção, calcular baseado em histórico
    },
    database: {
      status: dbStatus,
      responseTime: dbResponseTime,
      connected: dbConnected,
    },
    server: {
      status: 'operational', // Mock - em produção, verificar métricas reais
      uptime: 99.8, // Mock - em produção, calcular baseado em histórico
      memory: 65, // Mock - em produção, obter métricas reais
    },
    timestamp: new Date().toISOString(),
  }

  return apiResponse(statusData, 200)
}

// Usar runtime Node para permitir uso de Prisma no servidor
export const runtime = 'nodejs'
// Forçar renderização dinâmica (rota de API)
export const dynamic = 'force-dynamic'

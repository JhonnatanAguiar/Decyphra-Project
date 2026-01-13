import { prisma } from '@/lib/db/prisma'
import { Prisma } from '@prisma/client'

/**
 * Analytics Service
 * 
 * Service responsável pela lógica de negócio de analytics e tracking
 */

export interface PageViewInput {
  path: string
  title?: string
  referrer?: string
  userAgent?: string
  ip?: string
  country?: string
  city?: string
  device?: string
  browser?: string
  os?: string
  screenWidth?: number
  screenHeight?: number
  sessionId: string
  userId?: string
  duration?: number
}

export interface EventInput {
  name: string
  category?: string
  action?: string
  label?: string
  value?: number
  path: string
  sessionId: string
  userId?: string
  metadata?: Record<string, unknown>
}

export interface PerformanceMetricInput {
  path: string
  metric: string
  value: number
  device?: string
  connection?: string
  metadata?: Record<string, unknown>
}

export interface ErrorLogInput {
  message: string
  stack?: string
  path?: string
  userAgent?: string
  userId?: string
  sessionId?: string
  severity: 'error' | 'warning' | 'info'
  metadata?: Record<string, unknown>
}

/**
 * Cria um novo page view
 */
export async function createPageView(data: PageViewInput) {
  return prisma.pageView.create({ data })
}

/**
 * Cria um novo evento
 */
export async function createEvent(data: EventInput) {
  return prisma.event.create({
    data: {
      ...data,
      metadata: data.metadata ? (data.metadata as Prisma.InputJsonValue) : undefined,
    },
  })
}

/**
 * Cria uma nova métrica de performance
 */
export async function createPerformanceMetric(data: PerformanceMetricInput) {
  return prisma.performanceMetric.create({
    data: {
      path: data.path,
      metric: data.metric,
      value: data.value,
      device: data.device || undefined,
      connection: data.connection || undefined,
      metadata: data.metadata ? (data.metadata as Prisma.InputJsonValue) : undefined,
    },
  })
}

/**
 * Cria um novo log de erro
 */
export async function createErrorLog(data: ErrorLogInput) {
  return prisma.errorLog.create({
    data: {
      ...data,
      metadata: data.metadata ? (data.metadata as Prisma.InputJsonValue) : undefined,
    },
  })
}

/**
 * Busca estatísticas de page views por período
 */
export async function getPageViewsStats(startDate: Date, endDate: Date) {
  const [total, byPath, byDevice, byDate] = await Promise.all([
    prisma.pageView.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    }),
    prisma.pageView.groupBy({
      by: ['path'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 10,
    }),
    prisma.pageView.groupBy({
      by: ['device'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
    }),
    prisma.$queryRaw<
      Array<{ date: Date; count: bigint }>
    >`
      SELECT DATE_TRUNC('day', "createdAt")::date as date, COUNT(*)::bigint as count
      FROM page_views
      WHERE "createdAt" >= ${startDate} AND "createdAt" <= ${endDate}
      GROUP BY DATE_TRUNC('day', "createdAt")
      ORDER BY date ASC
    `,
  ])

  return {
    total,
    byPath: byPath.map((item: { path: string; _count: { id: number } }) => ({
      path: item.path,
      count: item._count.id,
    })),
    byDevice: byDevice.map((item: { device: string | null; _count: { id: number } }) => ({
      device: item.device || 'unknown',
      count: item._count.id,
    })),
    byDate: byDate.map((item: { date: Date; count: bigint }) => ({
      date: item.date,
      count: Number(item.count),
    })),
  }
}

/**
 * Busca estatísticas de eventos por período
 */
export async function getEventsStats(startDate: Date, endDate: Date) {
  const [total, byCategory, byName] = await Promise.all([
    prisma.event.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    }),
    prisma.event.groupBy({
      by: ['category'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        category: {
          not: null,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    }).catch(() => []),
    prisma.event.groupBy({
      by: ['name'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 10,
    }),
  ])

  return {
    total,
    byCategory: (byCategory || []).map((item: { category: string | null; _count: { id: number } }) => ({
      category: item.category || 'uncategorized',
      count: item._count.id,
    })),
    byName: byName.map((item: { name: string; _count: { id: number } }) => ({
      name: item.name,
      count: item._count.id,
    })),
  }
}

/**
 * Calcula tempo médio de permanência por página
 */
export async function getAverageSessionDuration(startDate: Date, endDate: Date) {
  const result = await prisma.$queryRaw<Array<{ avg_duration: number | null }>>`
    SELECT AVG(duration) as avg_duration
    FROM page_views
    WHERE "createdAt" >= ${startDate} 
      AND "createdAt" <= ${endDate}
      AND duration IS NOT NULL
  `

  return result[0]?.avg_duration || 0
}

/**
 * Busca sessões únicas por período
 */
export async function getUniqueSessions(startDate: Date, endDate: Date) {
  const result = await prisma.$queryRaw<Array<{ unique_sessions: bigint }>>`
    SELECT COUNT(DISTINCT "sessionId")::bigint as unique_sessions
    FROM page_views
    WHERE "createdAt" >= ${startDate} AND "createdAt" <= ${endDate}
  `

  return Number(result[0]?.unique_sessions || 0)
}

/**
 * Busca estatísticas de performance por período
 */
export async function getPerformanceStats(startDate: Date, endDate: Date) {
  const metrics = await prisma.performanceMetric.groupBy({
    by: ['metric'],
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _avg: {
      value: true,
    },
    _max: {
      value: true,
    },
    _min: {
      value: true,
    },
  })

  return metrics.map((m: { metric: string; _avg: { value: number | null }; _max: { value: number | null }; _min: { value: number | null } }) => ({
    metric: m.metric,
    average: m._avg.value || 0,
    max: m._max.value || 0,
    min: m._min.value || 0,
  }))
}

/**
 * Busca logs de erro por período
 */
export async function getErrorLogs(startDate: Date, endDate: Date, limit: number = 50) {
  const [errors, total, unresolved] = await Promise.all([
    prisma.errorLog.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    }),
    prisma.errorLog.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    }),
    prisma.errorLog.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        resolved: false,
      },
    }),
  ])

  return {
    errors,
    total,
    unresolved,
  }
}

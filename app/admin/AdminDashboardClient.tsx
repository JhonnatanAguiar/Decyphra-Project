'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardHeader, CardTitle, CardContent } from '@/views/components/ui/Card'
import { Badge } from '@/views/components/ui/Badge'
import { Users, Briefcase, MessageSquare, Mail, TrendingUp, Clock, BarChart3, Activity, AlertTriangle, Zap } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

// Lazy load dos gráficos para melhor performance
const LineChart = dynamic(() => import('@/views/components/analytics/LineChart').then(mod => ({ default: mod.LineChart })), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center text-light-400">Carregando gráfico...</div>,
})

const BarChart = dynamic(() => import('@/views/components/analytics/BarChart').then(mod => ({ default: mod.BarChart })), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center text-light-400">Carregando gráfico...</div>,
})

const PieChart = dynamic(() => import('@/views/components/analytics/PieChart').then(mod => ({ default: mod.PieChart })), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center text-light-400">Carregando gráfico...</div>,
})

/**
 * Dashboard Admin Client Component
 * 
 * Componente client-side do dashboard administrativo
 * Mostra estatísticas e métricas gerais
 */

interface DashboardStats {
  leads: {
    total: number
    new: number
    contacted: number
    qualified: number
  }
  clients: {
    total: number
    active: number
  }
  projects: {
    total: number
    published: number
  }
  testimonials: {
    total: number
  }
  contacts: {
    total: number
    today: number
  }
}

interface AnalyticsData {
  period: {
    startDate: string
    endDate: string
    days: number
  }
  pageViews: {
    total: number
    byPath: Array<{ path: string; count: number }>
    byDevice: Array<{ device: string; count: number }>
    byDate: Array<{ date: string; count: number }>
  }
  events: {
    total: number
    byCategory: Array<{ category: string; count: number }>
    byName: Array<{ name: string; count: number }>
  }
  avgSessionDuration: number
  uniqueSessions: number
}

interface PerformanceData {
  period: {
    startDate: string
    endDate: string
    days: number
  }
  performance: Array<{
    metric: string
    average: number
    max: number
    min: number
  }>
  errors: {
    errors: Array<{
      id: string
      message: string
      severity: string
      path: string | null
      createdAt: string
      resolved: boolean
    }>
    total: number
    unresolved: number
  }
}

export default function AdminDashboardClient() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [performance, setPerformance] = useState<PerformanceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsLoading, setAnalyticsLoading] = useState(true)
  const [performanceLoading, setPerformanceLoading] = useState(true)
  const [analyticsPeriod, setAnalyticsPeriod] = useState(7) // 7 dias por padrão

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Carregar stats básicas
        const statsResponse = await fetch('/api/v1/admin/stats')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        }

        // Carregar analytics
        const analyticsResponse = await fetch(`/api/v1/admin/analytics?days=${analyticsPeriod}`)
        if (analyticsResponse.ok) {
          const analyticsData = await analyticsResponse.json()
          setAnalytics(analyticsData)
        }

        // Carregar performance
        const performanceResponse = await fetch(`/api/v1/admin/performance?days=${analyticsPeriod}`)
        if (performanceResponse.ok) {
          const performanceData = await performanceResponse.json()
          setPerformance(performanceData)
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setIsLoading(false)
        setAnalyticsLoading(false)
        setPerformanceLoading(false)
      }
    }

    fetchAllData()
  }, [analyticsPeriod])

  if (isLoading && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-light-300">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-light-50 mb-2">Dashboard</h1>
          <p className="text-light-300">
            Bem-vindo ao painel administrativo - {format(new Date(), "d 'de' MMMM, yyyy", { locale: ptBR })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-light-400">Período:</label>
          <select
            value={analyticsPeriod.toString()}
            onChange={(e) => setAnalyticsPeriod(parseInt(e.target.value, 10))}
            className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-light-50 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="7">7 dias</option>
            <option value="15">15 dias</option>
            <option value="30">30 dias</option>
            <option value="90">90 dias</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Leads */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-primary-500" size={24} />
              Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-light-50">{stats.leads.total}</div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Novos: {stats.leads.new}</Badge>
                <Badge variant="secondary">Contatados: {stats.leads.contacted}</Badge>
                <Badge variant="secondary">Qualificados: {stats.leads.qualified}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clientes */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-primary-500" size={24} />
              Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-light-50">{stats.clients.total}</div>
              <div className="flex gap-2">
                <Badge variant="primary">Ativos: {stats.clients.active}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projetos */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="text-primary-500" size={24} />
              Projetos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-light-50">{stats.projects.total}</div>
              <div className="flex gap-2">
                <Badge variant="primary">Publicados: {stats.projects.published}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Depoimentos */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="text-primary-500" size={24} />
              Depoimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-light-50">{stats.testimonials.total}</div>
            </div>
          </CardContent>
        </Card>

        {/* Contatos */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="text-primary-500" size={24} />
              Contatos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-light-50">{stats.contacts.total}</div>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  <Clock size={14} className="inline mr-1" />
                  Hoje: {stats.contacts.today}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary-500" size={24} />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-light-300">
              <p>• Visualize leads recentes</p>
              <p>• Gerencie projetos</p>
              <p>• Responda contatos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-primary-500" size={24} />
            Analytics - Visitas e Engajamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          {analyticsLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Carregando analytics...</div>
            </div>
          ) : analytics ? (
            <div className="space-y-6">
              {/* Métricas Principais */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-dark-800 p-4 rounded-lg">
                  <div className="text-sm text-light-400 mb-1">Total de Visitas</div>
                  <div className="text-2xl font-bold text-light-50">{analytics.pageViews.total.toLocaleString('pt-BR')}</div>
                </div>
                <div className="bg-dark-800 p-4 rounded-lg">
                  <div className="text-sm text-light-400 mb-1">Sessões Únicas</div>
                  <div className="text-2xl font-bold text-light-50">{analytics.uniqueSessions.toLocaleString('pt-BR')}</div>
                </div>
                <div className="bg-dark-800 p-4 rounded-lg">
                  <div className="text-sm text-light-400 mb-1">Tempo Médio</div>
                  <div className="text-2xl font-bold text-light-50">
                    {Math.round(analytics.avgSessionDuration / 60)}min
                  </div>
                </div>
                <div className="bg-dark-800 p-4 rounded-lg">
                  <div className="text-sm text-light-400 mb-1">Total de Eventos</div>
                  <div className="text-2xl font-bold text-light-50">{analytics.events.total.toLocaleString('pt-BR')}</div>
                </div>
              </div>

              {/* Gráfico de Visitas ao Longo do Tempo */}
              {analytics.pageViews.byDate.length > 0 && (
                <div className="bg-dark-800 p-4 rounded-lg">
                  <LineChart
                    data={analytics.pageViews.byDate.map(item => ({
                      date: item.date,
                      count: item.count,
                    }))}
                    dataKey="count"
                    title="Visitas ao Longo do Tempo"
                    color="#10b981"
                  />
                </div>
              )}

              {/* Gráficos Comparativos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Páginas Mais Visitadas */}
                {analytics.pageViews.byPath.length > 0 && (
                  <div className="bg-dark-800 p-4 rounded-lg">
                    <BarChart
                      data={analytics.pageViews.byPath.slice(0, 10).map(item => ({
                        name: item.path.length > 30 ? item.path.substring(0, 30) + '...' : item.path,
                        count: item.count,
                      }))}
                      dataKey="count"
                      title="Top 10 Páginas Mais Visitadas"
                      color="#3b82f6"
                      height={250}
                    />
                  </div>
                )}

                {/* Dispositivos */}
                {analytics.pageViews.byDevice.length > 0 && (
                  <div className="bg-dark-800 p-4 rounded-lg">
                    <PieChart
                      data={analytics.pageViews.byDevice.map(item => ({
                        name: item.device || 'Desconhecido',
                        value: item.count,
                      }))}
                      title="Visitas por Dispositivo"
                      height={250}
                    />
                  </div>
                )}
              </div>

              {/* Eventos por Categoria */}
              {analytics.events.byCategory.length > 0 && (
                <div className="bg-dark-800 p-4 rounded-lg">
                  <BarChart
                    data={analytics.events.byCategory.map(item => ({
                      name: item.category,
                      count: item.count,
                    }))}
                    dataKey="count"
                    title="Eventos por Categoria"
                    color="#f59e0b"
                    height={250}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-light-400">
              Nenhum dado de analytics disponível ainda
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance e Falhas Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="text-primary-500" size={24} />
            Performance e Falhas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {performanceLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Carregando dados de performance...</div>
            </div>
          ) : performance ? (
            <div className="space-y-6">
              {/* Métricas de Performance */}
              {performance.performance.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-light-50 mb-4">Core Web Vitals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {performance.performance.map((metric) => (
                      <div key={metric.metric} className="bg-dark-800 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-light-400 font-mono">{metric.metric}</span>
                          <Zap className="text-yellow-500" size={16} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-light-500">Média:</span>
                            <span className="text-light-300">{metric.average.toFixed(2)}ms</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-light-500">Máx:</span>
                            <span className="text-light-300">{metric.max.toFixed(2)}ms</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-light-500">Mín:</span>
                            <span className="text-light-300">{metric.min.toFixed(2)}ms</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Erros */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-light-50">Logs de Erro</h3>
                  <div className="flex gap-2">
                    <Badge variant="error">
                      Total: {performance.errors.total}
                    </Badge>
                    <Badge variant="warning">
                      Não Resolvidos: {performance.errors.unresolved}
                    </Badge>
                  </div>
                </div>
                {performance.errors.errors.length > 0 ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {performance.errors.errors.slice(0, 10).map((error) => (
                      <div
                        key={error.id}
                        className={`p-4 rounded-lg border ${
                          error.severity === 'error'
                            ? 'bg-red-500/10 border-red-500/20'
                            : error.severity === 'warning'
                            ? 'bg-yellow-500/10 border-yellow-500/20'
                            : 'bg-blue-500/10 border-blue-500/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle
                              size={16}
                              className={
                                error.severity === 'error'
                                  ? 'text-red-400'
                                  : error.severity === 'warning'
                                  ? 'text-yellow-400'
                                  : 'text-blue-400'
                              }
                            />
                            <Badge
                              variant={
                                error.severity === 'error'
                                  ? 'error'
                                  : error.severity === 'warning'
                                  ? 'warning'
                                  : 'secondary'
                              }
                            >
                              {error.severity}
                            </Badge>
                            {error.resolved && (
                              <Badge variant="success">Resolvido</Badge>
                            )}
                          </div>
                          <span className="text-xs text-light-500">
                            {format(new Date(error.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                          </span>
                        </div>
                        <p className="text-sm text-light-200 mb-1 line-clamp-2">{error.message}</p>
                        {error.path && (
                          <p className="text-xs text-light-400 font-mono">{error.path}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-light-400">
                    <AlertTriangle className="mx-auto mb-2 text-green-500" size={32} />
                    <p>Nenhum erro registrado no período selecionado</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-light-400">
              Nenhum dado de performance disponível ainda
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

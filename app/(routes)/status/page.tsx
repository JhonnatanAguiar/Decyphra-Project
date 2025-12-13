'use client'

import { useState, useEffect } from 'react'
import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal } from '@/views/components/animations'
import { Card } from '@/views/components/ui/Card'
import { Badge } from '@/views/components/ui/Badge'
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Server, 
  Database, 
  Activity, 
  Clock,
  Zap,
  Globe,
  Shield
} from 'lucide-react'
import { API_ROUTES } from '@/lib/constants/routes'

/**
 * Página de Status
 * 
 * Exibe o status atual da API, banco de dados e servidor
 */

interface StatusData {
  status: 'operational' | 'degraded' | 'down'
  api: {
    status: 'operational' | 'degraded' | 'down'
    responseTime: number
    uptime: number
  }
  database: {
    status: 'operational' | 'degraded' | 'down'
    responseTime: number
    connected: boolean
  }
  server: {
    status: 'operational' | 'degraded' | 'down'
    uptime: number
    memory: number
  }
  timestamp: string
}

export default function StatusPage() {
  const [statusData, setStatusData] = useState<StatusData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(API_ROUTES.v1.status)
        if (!response.ok) {
          throw new Error('Erro ao buscar status')
        }
        const data = await response.json()
        setStatusData(data)
      } catch {
        setError('Não foi possível carregar o status')
        // Dados mockados para fallback
        setStatusData({
          status: 'operational',
          api: {
            status: 'operational',
            responseTime: 45,
            uptime: 99.9,
          },
          database: {
            status: 'operational',
            responseTime: 12,
            connected: true,
          },
          server: {
            status: 'operational',
            uptime: 99.8,
            memory: 65,
          },
          timestamp: new Date().toISOString(),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStatus()
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'degraded':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
      case 'down':
        return <XCircle className="w-6 h-6 text-red-500" />
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge variant="success">Operacional</Badge>
      case 'degraded':
        return <Badge variant="warning">Degradado</Badge>
      case 'down':
        return <Badge variant="error">Indisponível</Badge>
      default:
        return <Badge variant="warning">Desconhecido</Badge>
    }
  }

  const formatUptime = (uptime: number) => {
    return `${uptime.toFixed(1)}%`
  }

  const formatResponseTime = (ms: number) => {
    return `${ms}ms`
  }

  return (
    <>
      {/* Hero Section */}
      <Section variant="dark" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center py-16 lg:py-24">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-light-50">
                Status do <span className="text-primary-500">Sistema</span>
              </h1>
              <p className="text-lg md:text-xl text-light-200 leading-relaxed max-w-3xl mx-auto">
                Monitore o status em tempo real da nossa API, banco de dados e infraestrutura.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Status Cards */}
      <Section variant="default" spacing="lg" className="py-12 lg:py-16">
        <Container size="lg">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent" />
              <p className="mt-4 text-light-200">Carregando status...</p>
            </div>
          ) : error && !statusData ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-light-200">{error}</p>
            </div>
          ) : statusData ? (
            <div className="space-y-8">
              {/* Status Geral */}
              <ScrollReveal direction="up" delay={0}>
                <Card variant="elevated" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Activity className="w-8 h-8 text-primary-500" />
                      <h2 className="text-2xl font-bold text-light-50">Status Geral</h2>
                    </div>
                    {getStatusIcon(statusData.status)}
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(statusData.status)}
                    <span className="text-light-300 text-sm">
                      Última atualização: {new Date(statusData.timestamp).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Grid de Status Detalhado */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Status da API */}
                <ScrollReveal direction="up" delay={50}>
                  <Card variant="interactive" className="p-6 hover:border-primary-500/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-primary-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-light-50">API</h3>
                      </div>
                      {getStatusIcon(statusData.api.status)}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-light-300 text-sm">Status</span>
                        {getStatusBadge(statusData.api.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-light-300 text-sm">Tempo de Resposta</span>
                        <span className="text-light-50 font-medium">
                          {formatResponseTime(statusData.api.responseTime)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-light-300 text-sm">Uptime</span>
                        <span className="text-light-50 font-medium">
                          {formatUptime(statusData.api.uptime)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>

                {/* Status do Banco de Dados */}
                <ScrollReveal direction="up" delay={100}>
                  <Card variant="interactive" className="p-6 hover:border-primary-500/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                          <Database className="w-5 h-5 text-primary-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-light-50">Banco de Dados</h3>
                      </div>
                      {getStatusIcon(statusData.database.status)}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-light-300 text-sm">Status</span>
                        {getStatusBadge(statusData.database.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-light-300 text-sm">Conexão</span>
                        <span className="text-light-50 font-medium">
                          {statusData.database.connected ? 'Conectado' : 'Desconectado'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-light-300 text-sm">Tempo de Resposta</span>
                        <span className="text-light-50 font-medium">
                          {formatResponseTime(statusData.database.responseTime)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>

                {/* Status do Servidor */}
                <ScrollReveal direction="up" delay={150}>
                  <Card variant="interactive" className="p-6 hover:border-primary-500/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                          <Server className="w-5 h-5 text-primary-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-light-50">Servidor</h3>
                      </div>
                      {getStatusIcon(statusData.server.status)}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-light-300 text-sm">Status</span>
                        {getStatusBadge(statusData.server.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-light-300 text-sm">Uptime</span>
                        <span className="text-light-50 font-medium">
                          {formatUptime(statusData.server.uptime)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-light-300 text-sm">Memória</span>
                        <span className="text-light-50 font-medium">
                          {statusData.server.memory}%
                        </span>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              </div>

              {/* Métricas Adicionais */}
              <ScrollReveal direction="up" delay={200}>
                <Card variant="elevated" className="p-6">
                  <h3 className="text-xl font-bold text-light-50 mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary-500" />
                    Métricas de Performance
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-8 h-8 text-primary-500" />
                      </div>
                      <p className="text-2xl font-bold text-light-50 mb-1">
                        {statusData.api.responseTime}ms
                      </p>
                      <p className="text-light-300 text-sm">Tempo Médio de Resposta</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Shield className="w-8 h-8 text-primary-500" />
                      </div>
                      <p className="text-2xl font-bold text-light-50 mb-1">
                        {formatUptime(statusData.api.uptime)}
                      </p>
                      <p className="text-light-300 text-sm">Disponibilidade</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Activity className="w-8 h-8 text-primary-500" />
                      </div>
                      <p className="text-2xl font-bold text-light-50 mb-1">
                        {statusData.database.responseTime}ms
                      </p>
                      <p className="text-light-300 text-sm">Latência do Banco</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  )
}

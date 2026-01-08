'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/views/components/ui/Card'
import { Badge } from '@/views/components/ui/Badge'
import { Users, Briefcase, MessageSquare, Mail, TrendingUp, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

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

export default function AdminDashboardClient() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/v1/admin/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data.data)
        }
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-light-300">Carregando...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-light-300">Erro ao carregar estatísticas</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-light-50 mb-2">Dashboard</h1>
        <p className="text-light-300">
          Bem-vindo ao painel administrativo - {format(new Date(), "d 'de' MMMM, yyyy", { locale: ptBR })}
        </p>
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
    </div>
  )
}

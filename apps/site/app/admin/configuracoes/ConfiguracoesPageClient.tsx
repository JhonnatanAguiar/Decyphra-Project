'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/views/components/ui/Card'
import { Badge } from '@/views/components/ui/Badge'
import { Settings, Database, Mail, MessageSquare, Shield, Bell } from 'lucide-react'

/**
 * Página de Configurações (Client Component)
 * 
 * Página para gerenciar configurações do painel administrativo
 */

export default function ConfiguracoesPageClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-light-50 mb-2">Configurações</h1>
        <p className="text-light-300">Gerencie as configurações do painel administrativo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configurações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={20} className="text-primary-500" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-light-300">Nome do Site</span>
                <Badge variant="secondary">Decyphra</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light-300">Versão da API</span>
                <Badge variant="secondary">v1</Badge>
              </div>
              <div className="pt-4 border-t border-dark-700">
                <p className="text-sm text-light-400">
                  Em breve: Configurações avançadas do sistema
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Banco de Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={20} className="text-primary-500" />
              Banco de Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-light-300">Status</span>
                <Badge variant="success">Conectado</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light-300">Provider</span>
                <Badge variant="secondary">PostgreSQL</Badge>
              </div>
              <div className="pt-4 border-t border-dark-700">
                <p className="text-sm text-light-400">
                  Configurações de conexão gerenciadas via variáveis de ambiente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de E-mail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail size={20} className="text-primary-500" />
              E-mail
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-light-300">Provider</span>
                <Badge variant="secondary">Resend</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light-300">Status</span>
                <Badge variant="success">Ativo</Badge>
              </div>
              <div className="pt-4 border-t border-dark-700">
                <p className="text-sm text-light-400">
                  Templates de e-mail configurados e funcionando
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de WhatsApp */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare size={20} className="text-primary-500" />
              WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-light-300">Provider</span>
                <Badge variant="secondary">Twilio</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light-300">Status</span>
                <Badge variant="warning">Pendente</Badge>
              </div>
              <div className="pt-4 border-t border-dark-700">
                <p className="text-sm text-light-400">
                  ⚠️ Aguardando número oficial da Decyphra para configuração
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} className="text-primary-500" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-light-300">Autenticação</span>
                <Badge variant="success">Ativa</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light-300">Monitoramento</span>
                <Badge variant="success">Sentry Ativo</Badge>
              </div>
              <div className="pt-4 border-t border-dark-700">
                <p className="text-sm text-light-400">
                  Sistema de autenticação e monitoramento de erros funcionando
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} className="text-primary-500" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-light-300">E-mail</span>
                <Badge variant="success">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light-300">Dashboard</span>
                <Badge variant="success">Ativo</Badge>
              </div>
              <div className="pt-4 border-t border-dark-700">
                <p className="text-sm text-light-400">
                  Receba notificações sobre novas submissões e leads
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-light-300">
            <p>
              <strong>Ambiente:</strong> {process.env.NODE_ENV === 'production' ? 'Produção' : 'Desenvolvimento'}
            </p>
            <p>
              <strong>Painel Admin:</strong> Versão 1.0.0
            </p>
            <p className="text-light-400 text-xs mt-4">
              Para alterar configurações, edite as variáveis de ambiente no arquivo .env.local
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

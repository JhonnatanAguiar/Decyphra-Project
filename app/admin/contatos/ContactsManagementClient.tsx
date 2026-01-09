'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/views/components/ui/Card'
import { Button } from '@/views/components/ui/Button'
import { Badge } from '@/views/components/ui/Badge'
import { Input } from '@/views/components/ui/Input'
import { Select } from '@/views/components/ui/Select'
import { Modal } from '@/views/components/ui/Modal'
import { useToast } from '@/lib/hooks'
import { Toast } from '@/views/components/ui/Toast'
import { 
  Search, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  Reply,
  Archive
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

/**
 * Visualização de Submissões de Contato - Client Component
 * 
 * Componente para visualizar submissões de contato recebidas
 */

type ContactSubmission = {
  id: string
  name: string
  email: string
  phone?: string | null
  service?: string | null
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  metadata?: unknown
  createdAt: Date
  updatedAt: Date
  lead?: {
    id: string
    name: string
    email: string
    status: string
  } | null
}

type ContactListDTO = {
  contacts: ContactSubmission[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

const STATUS_LABELS: Record<'new' | 'read' | 'replied' | 'archived', string> = {
  new: 'Novo',
  read: 'Lido',
  replied: 'Respondido',
  archived: 'Arquivado',
}

const STATUS_COLORS: Record<'new' | 'read' | 'replied' | 'archived', 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
  new: 'primary',
  read: 'secondary',
  replied: 'success',
  archived: 'secondary',
}

export default function ContactsManagementClient() {
  const { toast, showToast, hideToast } = useToast()
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'new' | 'read' | 'replied' | 'archived' | ''>('')
  const [limit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // Carregar contatos
  const fetchContacts = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      params.append('limit', limit.toString())
      params.append('offset', offset.toString())

      const response = await fetch(`/api/v1/admin/contacts?${params.toString()}`)
      if (response.ok) {
        const result: ContactListDTO = await response.json()
        setContacts(result.contacts)
        setTotal(result.total)
      } else {
        if (response.status === 401) {
          showToast('Não autenticado. Redirecionando...', 'error')
          setTimeout(() => {
            window.location.href = '/admin/login'
          }, 2000)
        } else {
          showToast('Erro ao carregar submissões de contato', 'error')
        }
      }
    } catch (error) {
      console.error('Erro ao carregar submissões de contato:', error)
      showToast('Erro ao carregar submissões de contato', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [statusFilter, offset])

  // Filtrar contatos localmente por busca
  const filteredContacts = contacts.filter(contact => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      contact.name.toLowerCase().includes(search) ||
      contact.email.toLowerCase().includes(search) ||
      contact.phone?.toLowerCase().includes(search) ||
      contact.service?.toLowerCase().includes(search) ||
      contact.message.toLowerCase().includes(search)
    )
  })

  // Abrir modal de visualização
  const handleView = (contact: ContactSubmission) => {
    setSelectedContact(contact)
    setIsViewModalOpen(true)
  }

  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-light-50 mb-2">Submissões de Contato</h1>
          <p className="text-light-300">Visualize submissões de contato recebidas</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-400" size={20} />
              <Input
                placeholder="Buscar por nome, e-mail, telefone, serviço, mensagem..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as 'new' | 'read' | 'replied' | 'archived' | '')
                setOffset(0)
              }}
            >
              <option value="">Todos os status</option>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-4 text-light-300 text-sm">
            Total: <span className="font-bold text-light-50 ml-2">{total}</span>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contatos */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Carregando...</div>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Nenhuma submissão encontrada</div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <Card key={contact.id} variant="interactive" className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                              <User size={20} className="text-primary-500" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-light-50">{contact.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-light-400 mt-1">
                                <Mail size={14} />
                                {contact.email}
                              </div>
                            </div>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-2 text-sm text-light-400 mt-1">
                              <Phone size={14} />
                              {contact.phone}
                            </div>
                          )}
                          {contact.service && (
                            <div className="mt-2">
                              <Badge variant="secondary">{contact.service}</Badge>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={STATUS_COLORS[contact.status]}>
                            {STATUS_LABELS[contact.status]}
                          </Badge>
                          {contact.lead && (
                            <Badge variant="primary" className="text-xs">
                              Lead: {contact.lead.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-sm text-light-400 mb-2">
                          <MessageSquare size={14} />
                          Mensagem:
                        </div>
                        <p className="text-sm text-light-300 line-clamp-2 ml-6">
                          {contact.message.substring(0, 150)}{contact.message.length > 150 ? '...' : ''}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                        <div className="flex items-center gap-2 text-xs text-light-500">
                          <Calendar size={12} />
                          {format(new Date(contact.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleView(contact)}
                        >
                          <Eye size={16} className="mr-2" />
                          Visualizar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-dark-700">
                  <div className="text-sm text-light-300">
                    Página {currentPage} de {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setOffset(Math.max(0, offset - limit))}
                      disabled={offset === 0}
                    >
                      <ChevronLeft size={16} />
                      Anterior
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setOffset(Math.min((totalPages - 1) * limit, offset + limit))}
                      disabled={offset >= (totalPages - 1) * limit}
                    >
                      Próxima
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Modal de Visualização */}
      {selectedContact && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={`Contato de ${selectedContact.name}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-light-400">Nome</label>
                <div className="text-light-50 font-medium">{selectedContact.name}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">E-mail</label>
                <div className="text-light-50 flex items-center gap-2">
                  <Mail size={14} />
                  {selectedContact.email}
                </div>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-sm text-light-400">Telefone</label>
                  <div className="text-light-50 flex items-center gap-2">
                    <Phone size={14} />
                    {selectedContact.phone}
                  </div>
                </div>
              )}
              {selectedContact.service && (
                <div>
                  <label className="text-sm text-light-400">Serviço</label>
                  <div>
                    <Badge variant="secondary">{selectedContact.service}</Badge>
                  </div>
                </div>
              )}
              <div>
                <label className="text-sm text-light-400">Status</label>
                <div>
                  <Badge variant={STATUS_COLORS[selectedContact.status]}>
                    {STATUS_LABELS[selectedContact.status]}
                  </Badge>
                </div>
              </div>
              {selectedContact.lead && (
                <div>
                  <label className="text-sm text-light-400">Lead Criado</label>
                  <div className="space-y-1">
                    <div className="text-light-50 text-sm">{selectedContact.lead.name}</div>
                    <div>
                      <Badge variant="primary">{selectedContact.lead.status}</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-light-400 flex items-center gap-2 mb-2">
                <MessageSquare size={14} />
                Mensagem
              </label>
              <div className="text-light-50 whitespace-pre-wrap bg-dark-700 p-4 rounded-lg">
                {selectedContact.message}
              </div>
            </div>

            {selectedContact.metadata && (
              <div>
                <label className="text-sm text-light-400">Metadata</label>
                <pre className="text-xs text-light-400 bg-dark-700 p-4 rounded-lg overflow-auto max-h-48">
                  {JSON.stringify(selectedContact.metadata, null, 2)}
                </pre>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-700">
              <div>
                <label className="text-sm text-light-400">Criado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedContact.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
              <div>
                <label className="text-sm text-light-400">Atualizado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedContact.updatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-dark-700">
            <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>
              Fechar
            </Button>
            {selectedContact.email && (
              <Button
                variant="primary"
                onClick={() => window.location.href = `mailto:${selectedContact.email}`}
              >
                <Mail size={16} className="mr-2" />
                Responder por E-mail
              </Button>
            )}
          </div>
        </Modal>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          variant={toast.variant}
          description={toast.message}
          isVisible={!!toast}
          onClose={hideToast}
          duration={toast.duration}
          position="bottom-right"
        />
      )}
    </div>
  )
}

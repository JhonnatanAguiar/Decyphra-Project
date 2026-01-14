'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/views/components/ui/Card'
import { Button } from '@/views/components/ui/Button'
import { Badge } from '@/views/components/ui/Badge'
import { Input } from '@/views/components/ui/Input'
import { Select } from '@/views/components/ui/Select'
import { Modal } from '@/views/components/ui/Modal'
import { Textarea } from '@/views/components/ui/Textarea'
import { useToast, useDebounce } from '@/lib/hooks'
import { Toast } from '@/views/components/ui/Toast'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Building
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import type { LeadDTO, LeadStatus, LeadListDTO } from '@/models/types'

/**
 * Gerenciamento de Leads - Client Component
 * 
 * Componente para gerenciar leads com CRUD completo
 */

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'Novo',
  contacted: 'Contatado',
  qualified: 'Qualificado',
  proposal: 'Proposta Enviada',
  negotiation: 'Em Negociação',
  won: 'Ganho',
  lost: 'Perdido',
  archived: 'Arquivado',
}

const STATUS_COLORS: Record<LeadStatus, 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
  new: 'primary',
  contacted: 'secondary',
  qualified: 'success',
  proposal: 'secondary',
  negotiation: 'warning',
  won: 'success',
  lost: 'error',
  archived: 'secondary',
}

export default function LeadsManagementClient() {
  const { toast, showToast, hideToast } = useToast()
  const [leads, setLeads] = useState<LeadDTO[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [statusFilter, setStatusFilter] = useState<LeadStatus | ''>('')
  const [limit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [selectedLead, setSelectedLead] = useState<LeadDTO | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Form state
  const [formData, setFormData] = useState<Partial<LeadDTO>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    source: '',
    status: 'new',
    score: 0,
    notes: '',
  })

  // Carregar leads
  const fetchLeads = async (search?: string) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (search) params.append('search', search)
      params.append('limit', limit.toString())
      params.append('offset', offset.toString())

      const response = await fetch(`/api/v1/crm/leads?${params.toString()}`)
      if (response.ok) {
        const result: LeadListDTO = await response.json()
        setLeads(result.leads)
        setTotal(result.total)
      } else {
        showToast('Erro ao carregar leads', 'error')
      }
    } catch (error) {
      console.error('Erro ao carregar leads:', error)
      showToast('Erro ao carregar leads', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads(debouncedSearchTerm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, offset, debouncedSearchTerm])

  // Usar leads diretamente, a busca é feita no servidor
  const filteredLeads = leads

  // Abrir modal de visualização
  const handleView = (lead: LeadDTO) => {
    setSelectedLead(lead)
    setIsViewModalOpen(true)
  }

  // Abrir modal de edição
  const handleEdit = (lead: LeadDTO) => {
    setSelectedLead(lead)
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      company: lead.company || '',
      service: lead.service || '',
      source: lead.source || '',
      status: lead.status,
      score: lead.score,
      notes: lead.notes || '',
    })
    setIsEditMode(true)
    setIsModalOpen(true)
  }

  // Abrir modal de criação
  const handleCreate = () => {
    setSelectedLead(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      source: '',
      status: 'new',
      score: 0,
      notes: '',
    })
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  // Salvar lead
  const handleSave = async () => {
    try {
      const url = isEditMode && selectedLead
        ? `/api/v1/crm/leads/${selectedLead.id}`
        : '/api/v1/crm/leads'
      
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        showToast(isEditMode ? 'Lead atualizado com sucesso!' : 'Lead criado com sucesso!', 'success')
        setIsModalOpen(false)
        fetchLeads(debouncedSearchTerm)
      } else {
        const error = await response.json()
        showToast(error.message || 'Erro ao salvar lead', 'error')
      }
    } catch (error) {
      console.error('Erro ao salvar lead:', error)
      showToast('Erro ao salvar lead', 'error')
    }
  }

  // Deletar lead
  const handleDelete = async (lead: LeadDTO) => {
    if (!confirm(`Tem certeza que deseja deletar o lead "${lead.name}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/v1/crm/leads/${lead.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        showToast('Lead deletado com sucesso!', 'success')
        fetchLeads(debouncedSearchTerm)
      } else {
        showToast('Erro ao deletar lead', 'error')
      }
    } catch (error) {
      console.error('Erro ao deletar lead:', error)
      showToast('Erro ao deletar lead', 'error')
    }
  }

  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-light-50 mb-2">Gerenciamento de Leads</h1>
          <p className="text-light-300">Gerencie seus leads e oportunidades de negócio</p>
        </div>
        <Button onClick={handleCreate} variant="primary" size="md">
          <Plus size={20} className="mr-2" />
          Novo Lead
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-400" size={20} />
              <Input
                placeholder="Buscar por nome, e-mail, telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as LeadStatus | '')
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
            <div className="text-light-300 text-sm flex items-center">
              Total: <span className="font-bold text-light-50 ml-2">{total}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Leads */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Carregando...</div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Nenhum lead encontrado</div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left p-4 text-light-300 font-medium">Nome</th>
                      <th className="text-left p-4 text-light-300 font-medium">Contato</th>
                      <th className="text-left p-4 text-light-300 font-medium">Empresa</th>
                      <th className="text-left p-4 text-light-300 font-medium">Status</th>
                      <th className="text-left p-4 text-light-300 font-medium">Score</th>
                      <th className="text-left p-4 text-light-300 font-medium">Data</th>
                      <th className="text-right p-4 text-light-300 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-dark-700 hover:bg-dark-700/50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-light-50">{lead.name}</div>
                          {lead.service && (
                            <div className="text-sm text-light-400">{lead.service}</div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-light-300 flex items-center gap-2">
                            <Mail size={14} />
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="text-sm text-light-400 flex items-center gap-2 mt-1">
                              <Phone size={14} />
                              {lead.phone}
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          {lead.company ? (
                            <div className="text-sm text-light-300 flex items-center gap-2">
                              <Building size={14} />
                              {lead.company}
                            </div>
                          ) : (
                            <span className="text-light-500">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge variant={STATUS_COLORS[lead.status as LeadStatus]}>
                            {STATUS_LABELS[lead.status as LeadStatus]}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-light-300">{lead.score}/100</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-light-400">
                            {format(new Date(lead.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleView(lead)}
                              title="Visualizar"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(lead)}
                              title="Editar"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(lead)}
                              title="Deletar"
                            >
                              <Trash2 size={16} className="text-error-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
      {selectedLead && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={`Lead: ${selectedLead.name}`}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-light-400">Nome</label>
                <div className="text-light-50 font-medium">{selectedLead.name}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">E-mail</label>
                <div className="text-light-50">{selectedLead.email}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Telefone</label>
                <div className="text-light-50">{selectedLead.phone || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Empresa</label>
                <div className="text-light-50">{selectedLead.company || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Serviço</label>
                <div className="text-light-50">{selectedLead.service || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Origem</label>
                <div className="text-light-50">{selectedLead.source || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Status</label>
                <div>
                  <Badge variant={STATUS_COLORS[selectedLead.status as LeadStatus]}>
                    {STATUS_LABELS[selectedLead.status as LeadStatus]}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm text-light-400">Score</label>
                <div className="text-light-50">{selectedLead.score}/100</div>
              </div>
            </div>
            {selectedLead.notes && (
              <div>
                <label className="text-sm text-light-400">Notas</label>
                <div className="text-light-50 whitespace-pre-wrap">{selectedLead.notes}</div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-700">
              <div>
                <label className="text-sm text-light-400">Criado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedLead.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
              <div>
                <label className="text-sm text-light-400">Atualizado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedLead.updatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-dark-700">
            <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>
              Fechar
            </Button>
            <Button variant="primary" onClick={() => {
              setIsViewModalOpen(false)
              handleEdit(selectedLead)
            }}>
              Editar
            </Button>
          </div>
        </Modal>
      )}

      {/* Modal de Edição/Criação */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? 'Editar Lead' : 'Novo Lead'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-light-300 mb-2">Nome *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome completo"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">E-mail *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Telefone</label>
              <Input
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+55 11 99999-9999"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Empresa</label>
              <Input
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Nome da empresa"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Serviço</label>
              <Input
                value={formData.service || ''}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                placeholder="Tipo de serviço"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Origem</label>
              <Input
                value={formData.source || ''}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                placeholder="Origem do lead"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Status</label>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Score (0-100)</label>
              <Input
                type="number"
                min={0}
                max={100}
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-light-300 mb-2">Notas</label>
            <Textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Observações sobre o lead..."
              rows={4}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-dark-700">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditMode ? 'Atualizar' : 'Criar'}
          </Button>
        </div>
      </Modal>

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

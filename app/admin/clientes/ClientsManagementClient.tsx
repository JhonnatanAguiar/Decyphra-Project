'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/views/components/ui/Card'
import { Button } from '@/views/components/ui/Button'
import { Badge } from '@/views/components/ui/Badge'
import { Input } from '@/views/components/ui/Input'
import { Select } from '@/views/components/ui/Select'
import { Modal } from '@/views/components/ui/Modal'
import { Textarea } from '@/views/components/ui/Textarea'
import { useToast } from '@/lib/hooks'
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
  Building,
  MapPin
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import type { ClientDTO, ClientStatus, ClientListDTO } from '@/models/types'

/**
 * Gerenciamento de Clientes - Client Component
 * 
 * Componente para gerenciar clientes com CRUD completo
 */

const STATUS_LABELS: Record<ClientStatus, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
  suspended: 'Suspenso',
  archived: 'Arquivado',
}

const STATUS_COLORS: Record<ClientStatus, 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
  active: 'success',
  inactive: 'secondary',
  suspended: 'warning',
  archived: 'secondary',
}

export default function ClientsManagementClient() {
  const { toast, showToast, hideToast } = useToast()
  const [clients, setClients] = useState<ClientDTO[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ClientStatus | ''>('')
  const [limit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [selectedClient, setSelectedClient] = useState<ClientDTO | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Form state
  const [formData, setFormData] = useState<Partial<ClientDTO>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    cnpj: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    status: 'active',
    segment: '',
    notes: '',
  })

  // Carregar clientes
  const fetchClients = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      params.append('limit', limit.toString())
      params.append('offset', offset.toString())

      const response = await fetch(`/api/v1/crm/clients?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        const result: ClientListDTO = data.data
        setClients(result.clients)
        setTotal(result.total)
      } else {
        showToast('Erro ao carregar clientes', 'error')
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
      showToast('Erro ao carregar clientes', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, offset])

  // Filtrar clientes localmente por busca
  const filteredClients = clients.filter(client => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      client.name.toLowerCase().includes(search) ||
      client.email.toLowerCase().includes(search) ||
      client.phone?.toLowerCase().includes(search) ||
      client.company?.toLowerCase().includes(search) ||
      client.cnpj?.toLowerCase().includes(search)
    )
  })

  // Abrir modal de visualização
  const handleView = (client: ClientDTO) => {
    setSelectedClient(client)
    setIsViewModalOpen(true)
  }

  // Abrir modal de edição
  const handleEdit = (client: ClientDTO) => {
    setSelectedClient(client)
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone || '',
      company: client.company || '',
      cnpj: client.cnpj || '',
      address: client.address || '',
      city: client.city || '',
      state: client.state || '',
      zipCode: client.zipCode || '',
      status: client.status,
      segment: client.segment || '',
      notes: client.notes || '',
    })
    setIsEditMode(true)
    setIsModalOpen(true)
  }

  // Abrir modal de criação
  const handleCreate = () => {
    setSelectedClient(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      cnpj: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      status: 'active',
      segment: '',
      notes: '',
    })
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  // Salvar cliente
  const handleSave = async () => {
    try {
      const url = isEditMode && selectedClient
        ? `/api/v1/crm/clients/${selectedClient.id}`
        : '/api/v1/crm/clients'
      
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        showToast(isEditMode ? 'Cliente atualizado com sucesso!' : 'Cliente criado com sucesso!', 'success')
        setIsModalOpen(false)
        fetchClients()
      } else {
        const error = await response.json()
        showToast(error.message || 'Erro ao salvar cliente', 'error')
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
      showToast('Erro ao salvar cliente', 'error')
    }
  }

  // Deletar cliente
  const handleDelete = async (client: ClientDTO) => {
    if (!confirm(`Tem certeza que deseja deletar o cliente "${client.name}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/v1/crm/clients/${client.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        showToast('Cliente deletado com sucesso!', 'success')
        fetchClients()
      } else {
        showToast('Erro ao deletar cliente', 'error')
      }
    } catch (error) {
      console.error('Erro ao deletar cliente:', error)
      showToast('Erro ao deletar cliente', 'error')
    }
  }

  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-light-50 mb-2">Gerenciamento de Clientes</h1>
          <p className="text-light-300">Gerencie seus clientes e informações de contato</p>
        </div>
        <Button onClick={handleCreate} variant="primary" size="md">
          <Plus size={20} className="mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-400" size={20} />
              <Input
                placeholder="Buscar por nome, e-mail, telefone, CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as ClientStatus | '')
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

      {/* Lista de Clientes */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Carregando...</div>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Nenhum cliente encontrado</div>
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
                      <th className="text-left p-4 text-light-300 font-medium">Localização</th>
                      <th className="text-left p-4 text-light-300 font-medium">Data</th>
                      <th className="text-right p-4 text-light-300 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="border-b border-dark-700 hover:bg-dark-700/50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-light-50">{client.name}</div>
                          {client.segment && (
                            <div className="text-sm text-light-400">{client.segment}</div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-light-300 flex items-center gap-2">
                            <Mail size={14} />
                            {client.email}
                          </div>
                          {client.phone && (
                            <div className="text-sm text-light-400 flex items-center gap-2 mt-1">
                              <Phone size={14} />
                              {client.phone}
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          {client.company ? (
                            <div className="space-y-1">
                              <div className="text-sm text-light-300 flex items-center gap-2">
                                <Building size={14} />
                                {client.company}
                              </div>
                              {client.cnpj && (
                                <div className="text-xs text-light-500">CNPJ: {client.cnpj}</div>
                              )}
                            </div>
                          ) : (
                            <span className="text-light-500">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge variant={STATUS_COLORS[client.status]}>
                            {STATUS_LABELS[client.status]}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {client.city || client.state ? (
                            <div className="text-sm text-light-300 flex items-center gap-2">
                              <MapPin size={14} />
                              {[client.city, client.state].filter(Boolean).join(', ')}
                            </div>
                          ) : (
                            <span className="text-light-500">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-light-400">
                            {format(new Date(client.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleView(client)}
                              title="Visualizar"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(client)}
                              title="Editar"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(client)}
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
      {selectedClient && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={`Cliente: ${selectedClient.name}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-light-400">Nome</label>
                <div className="text-light-50 font-medium">{selectedClient.name}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">E-mail</label>
                <div className="text-light-50">{selectedClient.email}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Telefone</label>
                <div className="text-light-50">{selectedClient.phone || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Empresa</label>
                <div className="text-light-50">{selectedClient.company || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">CNPJ</label>
                <div className="text-light-50">{selectedClient.cnpj || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Segmento</label>
                <div className="text-light-50">{selectedClient.segment || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Status</label>
                <div>
                  <Badge variant={STATUS_COLORS[selectedClient.status]}>
                    {STATUS_LABELS[selectedClient.status]}
                  </Badge>
                </div>
              </div>
            </div>
            {(selectedClient.address || selectedClient.city || selectedClient.state || selectedClient.zipCode) && (
              <div>
                <label className="text-sm text-light-400">Endereço</label>
                <div className="text-light-50">
                  {[selectedClient.address, selectedClient.city, selectedClient.state, selectedClient.zipCode]
                    .filter(Boolean)
                    .join(', ')}
                </div>
              </div>
            )}
            {selectedClient.notes && (
              <div>
                <label className="text-sm text-light-400">Notas</label>
                <div className="text-light-50 whitespace-pre-wrap">{selectedClient.notes}</div>
              </div>
            )}
            {selectedClient.convertedFromLead && (
              <div className="pt-4 border-t border-dark-700">
                <label className="text-sm text-light-400">Convertido de Lead</label>
                <div className="text-light-50 text-sm">{selectedClient.convertedFromLead.name}</div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-700">
              <div>
                <label className="text-sm text-light-400">Criado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedClient.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
              <div>
                <label className="text-sm text-light-400">Atualizado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedClient.updatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
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
              handleEdit(selectedClient)
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
        title={isEditMode ? 'Editar Cliente' : 'Novo Cliente'}
        size="lg"
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
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+55 11 99999-9999"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Empresa</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Nome da empresa"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">CNPJ</label>
              <Input
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                placeholder="00.000.000/0000-00"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Segmento</label>
              <Input
                value={formData.segment}
                onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                placeholder="Segmento do cliente"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Status</label>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ClientStatus })}
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">CEP</label>
              <Input
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                placeholder="00000-000"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Endereço</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Rua, número, complemento"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Cidade</label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Cidade"
              />
            </div>
            <div>
              <label className="block text-sm text-light-300 mb-2">Estado</label>
              <Input
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="Estado (UF)"
                maxLength={2}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-light-300 mb-2">Notas</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Observações sobre o cliente..."
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

'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/views/components/ui/Card'
import { Button } from '@/views/components/ui/Button'
import { Badge } from '@/views/components/ui/Badge'
import { Input } from '@/views/components/ui/Input'
import { Modal } from '@/views/components/ui/Modal'
import { useToast, useDebounce } from '@/lib/hooks'
import { Toast } from '@/views/components/ui/Toast'
import { 
  Search, 
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Settings
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import type { ServiceListDTO } from '@/models/types'
import type { Service } from '@prisma/client'

/**
 * Gerenciamento de Serviços - Client Component
 * 
 * Componente para visualizar e listar serviços oferecidos
 */

export default function ServicesManagementClient() {
  const { toast, showToast, hideToast } = useToast()
  const [services, setServices] = useState<Service[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [limit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // Carregar serviços
  const fetchServices = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('limit', limit.toString())
      params.append('offset', offset.toString())

      const response = await fetch(`/api/v1/services?${params.toString()}`)
      if (response.ok) {
        const result: ServiceListDTO = await response.json()
        setServices(result.services)
        setTotal(result.total)
      } else {
        showToast('Erro ao carregar serviços', 'error')
      }
    } catch (error) {
      console.error('Erro ao carregar serviços:', error)
      showToast('Erro ao carregar serviços', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  // Filtrar serviços localmente por busca (serviços são poucos, então filtro local é aceitável)
  const filteredServices = services.filter(service => {
    if (!debouncedSearchTerm) return true
    const search = debouncedSearchTerm.toLowerCase()
    return (
      service.title.toLowerCase().includes(search) ||
      service.description.toLowerCase().includes(search) ||
      service.slug.toLowerCase().includes(search)
    )
  })

  // Abrir modal de visualização
  const handleView = (service: Service) => {
    setSelectedService(service)
    setIsViewModalOpen(true)
  }

  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-light-50 mb-2">Gerenciamento de Serviços</h1>
          <p className="text-light-300">Visualize e gerencie serviços oferecidos</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-400" size={20} />
              <Input
                placeholder="Buscar por título, descrição, slug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-light-300 text-sm flex items-center">
              Total: <span className="font-bold text-light-50 ml-2">{total}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Serviços */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Carregando...</div>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Nenhum serviço encontrado</div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {filteredServices.map((service) => (
                  <Card key={service.id} variant="interactive" className="overflow-hidden">
                    <div className="flex items-start gap-4 p-6">
                      {service.icon && (
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-dark-700 flex items-center justify-center">
                          <Settings size={24} className="text-primary-500" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-light-50 mb-1">{service.title}</h3>
                            <p className="text-sm text-light-400 font-mono">{service.slug}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {service.active ? (
                              <Badge variant="success">
                                <CheckCircle2 size={12} className="mr-1" />
                                Ativo
                              </Badge>
                            ) : (
                              <Badge variant="error">
                                <XCircle size={12} className="mr-1" />
                                Inativo
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-light-300 line-clamp-2 mb-3">
                          {service.description}
                        </p>
                        {service.features && service.features.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {service.features.slice(0, 4).map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {service.features.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{service.features.length - 4}
                              </Badge>
                            )}
                          </div>
                        )}
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleView(service)}
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
      {selectedService && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={selectedService.title}
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-light-400">Slug</label>
                <div className="text-light-50 font-mono text-sm">{selectedService.slug}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Status</label>
                <div>
                  {selectedService.active ? (
                    <Badge variant="success">
                      <CheckCircle2 size={12} className="mr-1" />
                      Ativo
                    </Badge>
                  ) : (
                    <Badge variant="error">
                      <XCircle size={12} className="mr-1" />
                      Inativo
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm text-light-400">Ícone</label>
                <div className="text-light-50">{selectedService.icon || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Ordem</label>
                <div className="text-light-50">{selectedService.order}</div>
              </div>
            </div>

            <div>
              <label className="text-sm text-light-400">Descrição</label>
              <div className="text-light-50 whitespace-pre-wrap mt-1">{selectedService.description}</div>
            </div>

            {selectedService.longDescription && (
              <div>
                <label className="text-sm text-light-400">Descrição Longa</label>
                <div className="text-light-50 whitespace-pre-wrap mt-1">{selectedService.longDescription}</div>
              </div>
            )}

            {selectedService.features && selectedService.features.length > 0 && (
              <div>
                <label className="text-sm text-light-400">Features ({selectedService.features.length})</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedService.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary">{feature}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-700">
              <div>
                <label className="text-sm text-light-400">Criado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedService.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
              <div>
                <label className="text-sm text-light-400">Atualizado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedService.updatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-dark-700">
            <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>
              Fechar
            </Button>
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

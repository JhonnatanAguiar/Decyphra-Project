'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/views/components/ui/Card'
import { Button } from '@/views/components/ui/Button'
import { Badge } from '@/views/components/ui/Badge'
import { Input } from '@/views/components/ui/Input'
import { Modal } from '@/views/components/ui/Modal'
import { useToast, useDebounce } from '@/lib/hooks'
import { Toast } from '@/views/components/ui/Toast'
import Image from 'next/image'
import { 
  Search, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Star,
  Building,
  User,
  Quote,
  ExternalLink
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import type { TestimonialListDTO } from '@/models/types'
import type { Testimonial } from '@prisma/client'

/**
 * Gerenciamento de Depoimentos - Client Component
 * 
 * Componente para visualizar e listar depoimentos de clientes
 */

export default function TestimonialsManagementClient() {
  const { toast, showToast, hideToast } = useToast()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [limit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // Carregar depoimentos
  const fetchTestimonials = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('limit', limit.toString())
      params.append('offset', offset.toString())

      const response = await fetch(`/api/v1/testimonials?${params.toString()}`)
      if (response.ok) {
        const result: TestimonialListDTO = await response.json()
        setTestimonials(result.testimonials)
        setTotal(result.total)
      } else {
        showToast('Erro ao carregar depoimentos', 'error')
      }
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error)
      showToast('Erro ao carregar depoimentos', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  // Filtrar depoimentos localmente por busca
  const filteredTestimonials = testimonials.filter(testimonial => {
    if (!debouncedSearchTerm) return true
    const search = debouncedSearchTerm.toLowerCase()
    return (
      testimonial.name.toLowerCase().includes(search) ||
      testimonial.company?.toLowerCase().includes(search) ||
      testimonial.content.toLowerCase().includes(search) ||
      testimonial.role?.toLowerCase().includes(search)
    )
  })

  // Abrir modal de visualização
  const handleView = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsViewModalOpen(true)
  }

  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-light-50 mb-2">Gerenciamento de Depoimentos</h1>
          <p className="text-light-300">Visualize e gerencie depoimentos de clientes</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-400" size={20} />
              <Input
                placeholder="Buscar por nome, empresa, conteúdo..."
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

      {/* Lista de Depoimentos */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Carregando...</div>
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Nenhum depoimento encontrado</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} variant="interactive" className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        {testimonial.image ? (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-dark-700">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0">
                            <User size={24} className="text-light-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg mb-1">{testimonial.name}</CardTitle>
                          {testimonial.company && (
                            <div className="text-sm text-light-400 flex items-center gap-1 mb-1">
                              <Building size={14} />
                              {testimonial.company}
                            </div>
                          )}
                          {testimonial.role && (
                            <div className="text-xs text-light-500">{testimonial.role}</div>
                          )}
                        </div>
                        {testimonial.featured && (
                          <Badge variant="primary" className="flex-shrink-0">
                            <Star size={12} className="mr-1" />
                            Destaque
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="flex-1 mb-4">
                        <Quote className="text-primary-500 mb-2" size={20} />
                        <p className="text-sm text-light-300 line-clamp-4 italic">
                          {'"'}{testimonial.content}{'"'}
                        </p>
                      </div>
                      {testimonial.rating && (
                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              size={16}
                              className={
                                idx < testimonial.rating!
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-light-600'
                              }
                            />
                          ))}
                          <span className="text-xs text-light-400 ml-2">
                            {testimonial.rating}/5
                          </span>
                        </div>
                      )}
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(testimonial)}
                        className="w-full"
                      >
                        <Eye size={16} className="mr-2" />
                        Visualizar
                      </Button>
                    </CardContent>
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
      {selectedTestimonial && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={`Depoimento de ${selectedTestimonial.name}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              {selectedTestimonial.image ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-dark-700">
                  <Image
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0">
                  <User size={32} className="text-light-400" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-light-50 mb-2">{selectedTestimonial.name}</h3>
                {selectedTestimonial.company && (
                  <div className="text-sm text-light-300 flex items-center gap-1 mb-1">
                    <Building size={16} />
                    {selectedTestimonial.company}
                  </div>
                )}
                {selectedTestimonial.role && (
                  <div className="text-sm text-light-400">{selectedTestimonial.role}</div>
                )}
                {selectedTestimonial.rating && (
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={20}
                        className={
                          idx < selectedTestimonial.rating!
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-light-600'
                        }
                      />
                    ))}
                    <span className="text-sm text-light-400 ml-2">
                      {selectedTestimonial.rating}/5
                    </span>
                  </div>
                )}
                {selectedTestimonial.featured && (
                  <div className="mt-2">
                    <Badge variant="primary">
                      <Star size={12} className="mr-1" />
                      Depoimento em Destaque
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-dark-700">
              <Quote className="text-primary-500 mb-3" size={24} />
              <p className="text-light-50 whitespace-pre-wrap italic leading-relaxed">
                {'"'}{selectedTestimonial.content}{'"'}
              </p>
            </div>

            {selectedTestimonial.video && (
              <div>
                <label className="text-sm text-light-400">Vídeo</label>
                <div className="mt-2">
                  <a
                    href={selectedTestimonial.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-400 text-sm flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Ver vídeo
                  </a>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-700">
              <div>
                <label className="text-sm text-light-400">Criado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedTestimonial.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
              <div>
                <label className="text-sm text-light-400">Atualizado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedTestimonial.updatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
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

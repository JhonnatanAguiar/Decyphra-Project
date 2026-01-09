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
import Image from 'next/image'
import { 
  Search, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  Star,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import type { ProjectListDTO } from '@/models/types'
import type { Project } from '@prisma/client'

/**
 * Gerenciamento de Projetos - Client Component
 * 
 * Componente para visualizar e listar projetos do portfólio
 */

const STATUS_LABELS: Record<'draft' | 'published' | 'archived', string> = {
  draft: 'Rascunho',
  published: 'Publicado',
  archived: 'Arquivado',
}

const STATUS_COLORS: Record<'draft' | 'published' | 'archived', 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
  draft: 'secondary',
  published: 'success',
  archived: 'secondary',
}

export default function ProjectsManagementClient() {
  const { toast, showToast, hideToast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'draft' | 'published' | 'archived' | ''>('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [limit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // Carregar projetos
  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (categoryFilter) params.append('category', categoryFilter)
      params.append('limit', limit.toString())
      params.append('offset', offset.toString())

      const response = await fetch(`/api/v1/projects?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        const result: ProjectListDTO = data.data
        setProjects(result.projects)
        setTotal(result.total)
      } else {
        showToast('Erro ao carregar projetos', 'error')
      }
    } catch (error) {
      console.error('Erro ao carregar projetos:', error)
      showToast('Erro ao carregar projetos', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, categoryFilter, offset])

  // Filtrar projetos localmente por busca
  const filteredProjects = projects.filter(project => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      project.title.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      project.category.toLowerCase().includes(search) ||
      project.client?.toLowerCase().includes(search)
    )
  })

  // Abrir modal de visualização
  const handleView = (project: Project) => {
    setSelectedProject(project)
    setIsViewModalOpen(true)
  }

  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1

  // Extrair categorias únicas dos projetos
  const categories = Array.from(new Set(projects.map(p => p.category)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-light-50 mb-2">Gerenciamento de Projetos</h1>
          <p className="text-light-300">Visualize e gerencie projetos do portfólio</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-400" size={20} />
              <Input
                placeholder="Buscar por título, descrição, categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as 'draft' | 'published' | 'archived' | '')
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
            <Select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                setOffset(0)
              }}
            >
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-4 text-light-300 text-sm">
            Total: <span className="font-bold text-light-50 ml-2">{total}</span>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Projetos */}
      <Card variant="elevated">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Carregando...</div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-light-300">Nenhum projeto encontrado</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} variant="interactive" className="overflow-hidden">
                    <div className="relative h-48 bg-dark-700">
                      {project.featuredImage ? (
                        <Image
                          src={project.featuredImage}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-light-500">
                          <ImageIcon size={48} />
                        </div>
                      )}
                      {project.featured && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="primary">
                            <Star size={14} className="mr-1" />
                            Destaque
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2">
                        <Badge variant={STATUS_COLORS[project.status]}>
                          {STATUS_LABELS[project.status]}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-light-400 line-clamp-2 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">
                          <Tag size={12} className="mr-1" />
                          {project.category}
                        </Badge>
                        {project.client && (
                          <Badge variant="secondary">{project.client}</Badge>
                        )}
                        <Badge variant="secondary">
                          <Calendar size={12} className="mr-1" />
                          {project.year}
                        </Badge>
                      </div>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-4">
                          <div className="text-xs text-light-400 mb-1">Tecnologias:</div>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-dark-700 rounded text-light-300">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-xs px-2 py-1 bg-dark-700 rounded text-light-400">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleView(project)}
                          className="flex-1"
                        >
                          <Eye size={16} className="mr-2" />
                          Visualizar
                        </Button>
                        {project.slug && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => window.open(`/portfolio/${project.slug}`, '_blank')}
                            title="Ver no site"
                          >
                            <ExternalLink size={16} />
                          </Button>
                        )}
                      </div>
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
      {selectedProject && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={selectedProject.title}
          size="lg"
        >
          <div className="space-y-4">
            {selectedProject.featuredImage && (
              <div className="relative h-64 bg-dark-700 rounded-lg overflow-hidden">
                <Image
                  src={selectedProject.featuredImage}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-light-400">Slug</label>
                <div className="text-light-50 font-mono text-sm">{selectedProject.slug}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Status</label>
                <div>
                  <Badge variant={STATUS_COLORS[selectedProject.status]}>
                    {STATUS_LABELS[selectedProject.status]}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm text-light-400">Categoria</label>
                <div className="text-light-50">{selectedProject.category}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Cliente</label>
                <div className="text-light-50">{selectedProject.client || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Ano</label>
                <div className="text-light-50">{selectedProject.year}</div>
              </div>
              <div>
                <label className="text-sm text-light-400">Destaque</label>
                <div className="text-light-50">
                  {selectedProject.featured ? (
                    <Badge variant="primary">Sim</Badge>
                  ) : (
                    'Não'
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-light-400">Descrição</label>
              <div className="text-light-50 whitespace-pre-wrap mt-1">{selectedProject.description}</div>
            </div>

            {selectedProject.longDescription && (
              <div>
                <label className="text-sm text-light-400">Descrição Longa</label>
                <div className="text-light-50 whitespace-pre-wrap mt-1">{selectedProject.longDescription}</div>
              </div>
            )}

            {selectedProject.technologies && selectedProject.technologies.length > 0 && (
              <div>
                <label className="text-sm text-light-400">Tecnologias</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedProject.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.challenges && (
              <div>
                <label className="text-sm text-light-400">Desafios</label>
                <div className="text-light-50 whitespace-pre-wrap mt-1">{selectedProject.challenges}</div>
              </div>
            )}

            {selectedProject.solutions && (
              <div>
                <label className="text-sm text-light-400">Soluções</label>
                <div className="text-light-50 whitespace-pre-wrap mt-1">{selectedProject.solutions}</div>
              </div>
            )}

            {selectedProject.results && (
              <div>
                <label className="text-sm text-light-400">Resultados</label>
                <div className="text-light-50 whitespace-pre-wrap mt-1">{selectedProject.results}</div>
              </div>
            )}

            {selectedProject.images && selectedProject.images.length > 0 && (
              <div>
                <label className="text-sm text-light-400">Imagens ({selectedProject.images.length})</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {selectedProject.images.slice(0, 6).map((img, idx) => (
                    <div key={idx} className="relative h-24 bg-dark-700 rounded overflow-hidden">
                      <Image
                        src={img}
                        alt={`${selectedProject.title} - Imagem ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 150px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-700">
              <div>
                <label className="text-sm text-light-400">Criado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedProject.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
              <div>
                <label className="text-sm text-light-400">Atualizado em</label>
                <div className="text-light-50 text-sm">
                  {format(new Date(selectedProject.updatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-dark-700">
            <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>
              Fechar
            </Button>
            {selectedProject.slug && (
              <Button
                variant="primary"
                onClick={() => window.open(`/portfolio/${selectedProject.slug}`, '_blank')}
              >
                <ExternalLink size={16} className="mr-2" />
                Ver no Site
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

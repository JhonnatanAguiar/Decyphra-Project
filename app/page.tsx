'use client'

import { useState } from 'react'
import { Button, Input, Textarea, Select, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Modal } from '@/views/components/ui'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="min-h-screen bg-dark-950 text-light-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">
          Decyphra Website
        </h1>
        <p className="text-lg text-light-200 mb-8">
          Projeto em desenvolvimento - Fase 2: Design System
        </p>
        
        {/* Teste dos componentes Button */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Botões</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="md">
              Primary
            </Button>
            <Button variant="secondary" size="md">
              Secondary
            </Button>
            <Button variant="ghost" size="md">
              Ghost
            </Button>
            <Button variant="dark" size="md">
              Dark
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>
        </div>

        {/* Teste dos componentes Input */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Input Default</label>
              <Input placeholder="Digite algo..." variant="default" size="md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Input Primary</label>
              <Input placeholder="Digite algo..." variant="primary" size="md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Input Error</label>
              <Input placeholder="Campo com erro..." variant="error" size="md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tamanhos</label>
              <div className="space-y-2">
                <Input placeholder="Small" size="sm" />
                <Input placeholder="Medium" size="md" />
                <Input placeholder="Large" size="lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Teste dos componentes Textarea */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Textareas</h2>
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Textarea Default</label>
              <Textarea placeholder="Digite sua mensagem..." variant="default" size="md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Textarea Primary</label>
              <Textarea placeholder="Digite sua mensagem..." variant="primary" size="md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Textarea Error</label>
              <Textarea placeholder="Campo com erro..." variant="error" size="md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tamanhos</label>
              <div className="space-y-2">
                <Textarea placeholder="Small" size="sm" />
                <Textarea placeholder="Medium" size="md" />
                <Textarea placeholder="Large" size="lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Teste dos componentes Select */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Selects</h2>
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Default</label>
              <Select variant="default" size="md">
                <option value="">Selecione uma opção...</option>
                <option value="1">Opção 1</option>
                <option value="2">Opção 2</option>
                <option value="3">Opção 3</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select Primary</label>
              <Select variant="primary" size="md">
                <option value="">Selecione uma opção...</option>
                <option value="1">Opção 1</option>
                <option value="2">Opção 2</option>
                <option value="3">Opção 3</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select Error</label>
              <Select variant="error" size="md">
                <option value="">Selecione uma opção...</option>
                <option value="1">Opção 1</option>
                <option value="2">Opção 2</option>
                <option value="3">Opção 3</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tamanhos</label>
              <div className="space-y-2">
                <Select size="sm">
                  <option value="">Small</option>
                  <option value="1">Opção 1</option>
                </Select>
                <Select size="md">
                  <option value="">Medium</option>
                  <option value="1">Opção 1</option>
                </Select>
                <Select size="lg">
                  <option value="">Large</option>
                  <option value="1">Opção 1</option>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Teste dos componentes Card */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Card Default</CardTitle>
                <CardDescription>Card padrão com borda sutil</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-light-200">
                  Este é um exemplo de card padrão. Perfeito para exibir informações de forma organizada.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm">Ação</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Card Elevated</CardTitle>
                <CardDescription>Card com sombra elevada</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-light-200">
                  Este card tem uma sombra mais pronunciada, dando destaque visual ao conteúdo.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">Ação</Button>
              </CardFooter>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Card Interactive</CardTitle>
                <CardDescription>Card com hover effects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-light-200">
                  Este card tem efeitos de hover, incluindo escala e sombra. Passe o mouse para ver.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">Ação</Button>
              </CardFooter>
            </Card>

            <Card variant="featured">
              <CardHeader>
                <CardTitle>Card Featured</CardTitle>
                <CardDescription>Card destacado com borda neon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-light-200">
                  Este card tem uma borda verde neon e sombra especial para destacar conteúdo importante.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">Ação</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Teste dos componentes Badge */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Badges</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Variantes</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Tamanhos</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary" size="sm">Small</Badge>
                <Badge variant="primary" size="md">Medium</Badge>
                <Badge variant="primary" size="lg">Large</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Exemplos de Uso</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="success">Novo</Badge>
                <Badge variant="primary">Popular</Badge>
                <Badge variant="warning">Em breve</Badge>
                <Badge variant="error">Esgotado</Badge>
                <Badge variant="secondary">Beta</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Teste dos componentes Modal */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Modals</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setIsModalOpen(true)} variant="primary">
              Abrir Modal
            </Button>
          </div>
        </div>

        {/* Modal de Exemplo */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Modal de Exemplo"
          description="Este é um exemplo de modal com todas as funcionalidades"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-light-200">
              Este modal demonstra as funcionalidades básicas:
            </p>
            <ul className="list-disc list-inside text-light-300 space-y-2">
              <li>Fechamento ao clicar no overlay</li>
              <li>Fechamento ao pressionar ESC</li>
              <li>Bloqueio de scroll quando aberto</li>
              <li>Animações suaves de entrada/saída</li>
              <li>Overlay com blur</li>
            </ul>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Confirmar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </main>
  )
}

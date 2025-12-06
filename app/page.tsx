import { Button, Input, Textarea } from '@/views/components/ui'

export default function Home() {
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
      </div>
    </main>
  )
}

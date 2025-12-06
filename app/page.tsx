import { Button } from '@/views/components/ui'

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
    </main>
  )
}

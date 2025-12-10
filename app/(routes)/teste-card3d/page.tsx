'use client'

import { Card3D } from '@/views/components/ui/Card3D'
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/views/components/ui/Card'
import { Code2, Zap, Shield, Rocket } from 'lucide-react'

/**
 * Página de Teste - Card3D
 * 
 * Página para testar e visualizar o componente Card3D
 * com diferentes configurações e efeitos.
 */

export default function TesteCard3DPage() {
  return (
    <div className="min-h-screen bg-dark-950 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-light-50 mb-4">
            Teste - Cards 3D
          </h1>
          <p className="text-light-300 text-lg">
            Demonstração do componente Card3D com efeitos de levitação e interações 3D
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Card 1: Todas as funcionalidades ativadas */}
          <Card3D
            enableTilt={true}
            enableParticles={true}
            enableRipple={true}
            enableBorderGlow={true}
            className="p-6"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Code2 className="h-6 w-6 text-primary-500" />
                </div>
                <CardTitle className="text-xl">Card Completo</CardTitle>
              </div>
              <CardDescription>
                Todas as funcionalidades ativadas: tilt dinâmico, partículas, ripple e spotlight
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-light-300 text-sm">
                Passe o mouse sobre este card para ver todos os efeitos em ação.
                Mova o cursor pela página para ver o spotlight iluminando os cards.
              </p>
            </CardContent>
          </Card3D>

          {/* Card 2: Apenas Tilt e Levitação */}
          <Card3D
            enableTilt={true}
            enableParticles={false}
            enableRipple={false}
            enableBorderGlow={true}
            className="p-6"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Zap className="h-6 w-6 text-primary-500" />
                </div>
                <CardTitle className="text-xl">Tilt + Glow</CardTitle>
              </div>
              <CardDescription>
                Apenas efeito 3D de tilt e glow na borda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-light-300 text-sm">
                Efeito mais sutil, apenas com rotação 3D e brilho na borda.
              </p>
            </CardContent>
          </Card3D>

          {/* Card 3: Partículas */}
          <Card3D
            enableTilt={false}
            enableParticles={true}
            enableRipple={true}
            enableBorderGlow={false}
            className="p-6"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Shield className="h-6 w-6 text-primary-500" />
                </div>
                <CardTitle className="text-xl">Partículas</CardTitle>
              </div>
              <CardDescription>
                Partículas animadas no hover
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-light-300 text-sm">
                Veja as partículas verdes neon animadas quando passar o mouse.
              </p>
            </CardContent>
          </Card3D>

          {/* Card 4: Mínimo - Apenas Levitação */}
          <Card3D
            enableTilt={false}
            enableParticles={false}
            enableRipple={false}
            enableBorderGlow={true}
            className="p-6"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Rocket className="h-6 w-6 text-primary-500" />
                </div>
                <CardTitle className="text-xl">Mínimo</CardTitle>
              </div>
              <CardDescription>
                Apenas efeito de levitação e glow na borda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-light-300 text-sm">
                Versão mais leve, apenas com elevação no hover.
              </p>
            </CardContent>
          </Card3D>

          {/* Card 5: Customizado - Mais partículas */}
          <Card3D
            enableTilt={true}
            enableParticles={true}
            enableRipple={true}
            enableBorderGlow={true}
            particleCount={12}
            className="p-6"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Code2 className="h-6 w-6 text-primary-500" />
                </div>
                <CardTitle className="text-xl">Mais Partículas</CardTitle>
              </div>
              <CardDescription>
                Configuração com 12 partículas (padrão: 8)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-light-300 text-sm">
                Mais partículas para um efeito mais intenso.
              </p>
            </CardContent>
          </Card3D>

          {/* Card 6: Sem animações (para comparação) */}
          <Card3D
            enableTilt={false}
            enableParticles={false}
            enableRipple={false}
            enableBorderGlow={false}
            disableAnimations={true}
            className="p-6"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Shield className="h-6 w-6 text-primary-500" />
                </div>
                <CardTitle className="text-xl">Sem Animações</CardTitle>
              </div>
              <CardDescription>
                Card estático para comparação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-light-300 text-sm">
                Este card não tem animações, apenas o estilo base.
              </p>
            </CardContent>
          </Card3D>

        </div>

        {/* Instruções */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-light-50 mb-4">
              Instruções de Teste
            </h2>
            <ul className="space-y-2 text-light-300">
              <li className="flex items-start gap-2">
                <span className="text-primary-500">•</span>
                <span><strong>Hover:</strong> Passe o mouse sobre os cards para ver os efeitos de levitação, tilt e partículas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">•</span>
                <span><strong>Movimento do Mouse:</strong> Mova o mouse sobre o card para ver o tilt 3D dinâmico. Mova pela página para ver o spotlight iluminando os cards (raio 500px)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">•</span>
                <span><strong>Clique:</strong> Clique nos cards para ver o efeito ripple verde neon</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">•</span>
                <span><strong>Mobile:</strong> As animações são desabilitadas automaticamente em dispositivos móveis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

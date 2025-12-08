'use client'

import { Container, Section, Header, Footer, DecyphraLogo } from '@/views/components/layout'
import { FadeIn, ScrollReveal } from '@/views/components/animations'

/**
 * Página de Demonstração dos Componentes de Layout
 * 
 * Esta página exibe todos os componentes de layout criados na Fase 2.2
 * para visualização e avaliação.
 */

export default function LayoutDemoPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-light-50">
      {/* Header de Demonstração */}
      <Header variant="default" sticky={true} />

      <main>
        {/* Seção: DecyphraLogo */}
        <Section variant="default" spacing="lg">
          <Container size="lg">
            <FadeIn direction="up" delay={0}>
              <h1 className="text-4xl font-bold mb-2">Componentes de Layout</h1>
              <p className="text-lg text-light-200 mb-12">
                Demonstração de todos os componentes de layout criados na Fase 2.2
              </p>
            </FadeIn>

            <ScrollReveal direction="up" delay={100}>
              <div className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">DecyphraLogo</h2>
                <div className="space-y-12">
                  {/* Layouts */}
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Layouts</h3>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="space-y-2">
                        <p className="text-sm text-light-300">Horizontal (padrão)</p>
                        <div className="p-6 bg-dark-900 rounded-lg border border-dark-800">
                          <DecyphraLogo layout="horizontal" size="md" showText={true} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-light-300">Vertical</p>
                        <div className="p-6 bg-dark-900 rounded-lg border border-dark-800">
                          <DecyphraLogo layout="vertical" size="md" showText={true} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tamanhos */}
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Tamanhos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm text-light-300">Small</p>
                        <div className="p-6 bg-dark-900 rounded-lg border border-dark-800 flex items-center justify-center">
                          <DecyphraLogo layout="horizontal" size="sm" showText={true} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-light-300">Medium</p>
                        <div className="p-6 bg-dark-900 rounded-lg border border-dark-800 flex items-center justify-center">
                          <DecyphraLogo layout="horizontal" size="md" showText={true} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-light-300">Large</p>
                        <div className="p-6 bg-dark-900 rounded-lg border border-dark-800 flex items-center justify-center">
                          <DecyphraLogo layout="horizontal" size="lg" showText={true} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-light-300">Extra Large</p>
                        <div className="p-6 bg-dark-900 rounded-lg border border-dark-800 flex items-center justify-center">
                          <DecyphraLogo layout="horizontal" size="xl" showText={true} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Opções */}
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Opções</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm text-light-300">Apenas Ícone (sem texto)</p>
                        <div className="p-6 bg-dark-900 rounded-lg border border-dark-800 flex items-center justify-center">
                          <DecyphraLogo layout="horizontal" size="md" showText={false} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-light-300">Com Link para Home</p>
                        <div className="p-6 bg-dark-900 rounded-lg border border-dark-800 flex items-center justify-center">
                          <DecyphraLogo layout="horizontal" size="md" showText={true} linkToHome={true} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Seção: Container */}
        <Section variant="dark" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up" delay={200}>
              <div className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Container</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Tamanhos</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-light-300 mb-2">Small (max-w-2xl)</p>
                        <Container size="sm" className="bg-dark-900 p-6 rounded-lg border border-dark-800">
                          <p className="text-light-200">Conteúdo dentro de um Container Small</p>
                        </Container>
                      </div>
                      <div>
                        <p className="text-sm text-light-300 mb-2">Medium (max-w-4xl)</p>
                        <Container size="md" className="bg-dark-900 p-6 rounded-lg border border-dark-800">
                          <p className="text-light-200">Conteúdo dentro de um Container Medium</p>
                        </Container>
                      </div>
                      <div>
                        <p className="text-sm text-light-300 mb-2">Large (max-w-6xl) - Padrão</p>
                        <Container size="lg" className="bg-dark-900 p-6 rounded-lg border border-dark-800">
                          <p className="text-light-200">Conteúdo dentro de um Container Large (padrão)</p>
                        </Container>
                      </div>
                      <div>
                        <p className="text-sm text-light-300 mb-2">Extra Large (max-w-7xl)</p>
                        <Container size="xl" className="bg-dark-900 p-6 rounded-lg border border-dark-800">
                          <p className="text-light-200">Conteúdo dentro de um Container Extra Large</p>
                        </Container>
                      </div>
                      <div>
                        <p className="text-sm text-light-300 mb-2">Full (max-w-full)</p>
                        <Container size="full" className="bg-dark-900 p-6 rounded-lg border border-dark-800">
                          <p className="text-light-200">Conteúdo dentro de um Container Full</p>
                        </Container>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Seção: Section */}
        <Section variant="light" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up" delay={300}>
              <div className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Section</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Variantes de Background</h3>
                    <div className="space-y-4">
                      <Section variant="default" spacing="md" className="rounded-lg border border-dark-800">
                        <Container size="md">
                          <p className="text-light-200">Section Default (bg-dark-950)</p>
                        </Container>
                      </Section>
                      <Section variant="dark" spacing="md" className="rounded-lg border border-dark-800">
                        <Container size="md">
                          <p className="text-light-200">Section Dark (bg-dark-1000)</p>
                        </Container>
                      </Section>
                      <Section variant="light" spacing="md" className="rounded-lg border border-dark-800">
                        <Container size="md">
                          <p className="text-light-200">Section Light (bg-dark-900)</p>
                        </Container>
                      </Section>
                      <Section variant="accent" spacing="md" className="rounded-lg border border-dark-800">
                        <Container size="md">
                          <p className="text-light-200">Section Accent (gradient)</p>
                        </Container>
                      </Section>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Espaçamentos</h3>
                    <div className="space-y-4">
                      <Section variant="default" spacing="none" className="rounded-lg border border-dark-800">
                        <Container size="md">
                          <p className="text-light-200">Spacing: None (py-0)</p>
                        </Container>
                      </Section>
                      <Section variant="default" spacing="sm" className="rounded-lg border border-dark-800">
                        <Container size="md">
                          <p className="text-light-200">Spacing: Small (py-8 sm:py-12)</p>
                        </Container>
                      </Section>
                      <Section variant="default" spacing="md" className="rounded-lg border border-dark-800">
                        <Container size="md">
                          <p className="text-light-200">Spacing: Medium (py-12 sm:py-16 lg:py-20) - Padrão</p>
                        </Container>
                      </Section>
                      <Section variant="default" spacing="lg" className="rounded-lg border border-dark-800">
                        <Container size="md">
                          <p className="text-light-200">Spacing: Large (py-16 sm:py-20 lg:py-24)</p>
                        </Container>
                      </Section>
                      <Section variant="default" spacing="xl" className="rounded-lg border border-dark-800">
                        <Container size="md">
                          <p className="text-light-200">Spacing: Extra Large (py-20 sm:py-24 lg:py-32)</p>
                        </Container>
                      </Section>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Seção: Header Variants */}
        <Section variant="accent" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up" delay={400}>
              <div className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Header</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Variantes</h3>
                    <div className="space-y-4">
                      <div className="bg-dark-900 p-4 rounded-lg border border-dark-800">
                        <p className="text-sm text-light-300 mb-2">Default (com scroll detection)</p>
                        <p className="text-light-200 text-sm">
                          O Header está fixo no topo da página. Role para ver a mudança de estilo ao fazer scroll.
                        </p>
                      </div>
                      <div className="bg-dark-900 p-4 rounded-lg border border-dark-800">
                        <p className="text-sm text-light-300 mb-2">Transparent (transparente até fazer scroll)</p>
                        <p className="text-light-200 text-sm">
                          Variante transparent que fica sólida após scroll.
                        </p>
                      </div>
                      <div className="bg-dark-900 p-4 rounded-lg border border-dark-800">
                        <p className="text-sm text-light-300 mb-2">Solid (sempre sólido)</p>
                        <p className="text-light-200 text-sm">
                          Variante sempre com background sólido.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Funcionalidades</h3>
                    <ul className="list-disc list-inside space-y-2 text-light-200">
                      <li>Navegação desktop e mobile</li>
                      <li>Menu mobile responsivo com animações</li>
                      <li>Scroll detection (muda estilo ao rolar)</li>
                      <li>Sticky header (fixo no topo)</li>
                      <li>Logo integrado com DecyphraLogo</li>
                      <li>CTA button "Fale Conosco"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Seção: Footer Variants */}
        <Section variant="default" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up" delay={500}>
              <div className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Footer</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Variantes</h3>
                    <div className="space-y-4">
                      <div className="bg-dark-900 p-4 rounded-lg border border-dark-800">
                        <p className="text-sm text-light-300 mb-2">Default (completo)</p>
                        <p className="text-light-200 text-sm">
                          Footer completo com logo, links, contato e redes sociais.
                        </p>
                      </div>
                      <div className="bg-dark-900 p-4 rounded-lg border border-dark-800">
                        <p className="text-sm text-light-300 mb-2">Minimal (simplificado)</p>
                        <p className="text-light-200 text-sm">
                          Footer minimalista apenas com copyright e links.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Funcionalidades</h3>
                    <ul className="list-disc list-inside space-y-2 text-light-200">
                      <li>Layout responsivo em grid</li>
                      <li>Logo integrado com DecyphraLogo</li>
                      <li>Links de navegação rápida</li>
                      <li>Informações de contato (email, telefones)</li>
                      <li>Copyright dinâmico (ano atual)</li>
                      <li>Espaço reservado para redes sociais</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Seção: Combinação de Componentes */}
        <Section variant="dark" spacing="xl">
          <Container size="lg">
            <ScrollReveal direction="up" delay={600}>
              <div className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Combinação de Componentes</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-primary-500">Exemplo Real de Uso</h3>
                    <Section variant="light" spacing="md" className="rounded-lg border border-dark-800">
                      <Container size="md">
                        <div className="text-center space-y-6">
                          <DecyphraLogo layout="vertical" size="lg" showText={true} />
                          <h3 className="text-2xl font-bold text-light-50">
                            Seção de Exemplo
                          </h3>
                          <p className="text-light-200 max-w-2xl mx-auto">
                            Esta é uma demonstração de como os componentes de layout podem ser combinados
                            para criar seções completas e bem estruturadas. O Container limita a largura,
                            o Section adiciona espaçamento e background, e o DecyphraLogo adiciona identidade visual.
                          </p>
                        </div>
                      </Container>
                    </Section>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      </main>

      {/* Footer de Demonstração */}
      <Footer variant="default" />
    </div>
  )
}

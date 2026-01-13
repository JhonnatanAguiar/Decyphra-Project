'use client'

import { useState, useEffect } from 'react'
import { Container, Section } from '@/views/components/layout'
import { FadeIn } from '@/views/components/animations'

/**
 * Página de Política de Cookies Client Component
 * 
 * Componente client-side da página de política de cookies
 */

export default function CookiesPageClient() {
  const [lastUpdate, setLastUpdate] = useState<string>('')

  useEffect(() => {
    // Garantir que a data só seja gerada no cliente após hidratação
    setLastUpdate(
      new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    )
  }, [])

  return (
    <>
      {/* Hero Section */}
      <Section variant="dark" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50 z-[1] pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center py-12 lg:py-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">
                Política de <span className="text-light-50">Cookies</span>
              </h1>
              <p className="text-lg md:text-xl text-light-200 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                Esta política explica como utilizamos cookies e tecnologias similares em nosso site para melhorar sua experiência e coletar informações sobre o uso do site.
              </p>
              {lastUpdate && (
                <p className="text-sm text-light-300 mt-4">
                  Última atualização: {lastUpdate}
                </p>
              )}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Conteúdo Principal */}
      <Section variant="default" spacing="lg" className="py-12 lg:py-16">
        <Container size="lg">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <FadeIn direction="up" delay={100}>
              <div className="space-y-8 text-light-200">
                
                {/* Introdução */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    1. O que são Cookies?
                  </h2>
                  <p className="leading-relaxed">
                    Cookies são pequenos arquivos de texto armazenados em seu dispositivo (computador, tablet ou smartphone) quando você visita um site. Os cookies permitem que o site reconheça seu dispositivo e armazene algumas informações sobre suas preferências ou ações passadas.
                  </p>
                  <p className="leading-relaxed mt-4">
                    A <strong className="text-primary-500">Decyphra</strong> utiliza cookies e tecnologias similares para melhorar a funcionalidade do site, analisar o uso e personalizar sua experiência. Esta política explica quais cookies utilizamos, por que os utilizamos e como você pode gerenciá-los.
                  </p>
                </section>

                {/* Tipos de Cookies */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    2. Tipos de Cookies que Utilizamos
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Utilizamos diferentes tipos de cookies em nosso site, classificados de acordo com sua finalidade e duração:
                  </p>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        2.1. Cookies Essenciais
                      </h3>
                      <p className="leading-relaxed mb-2">
                        Estes cookies são necessários para o funcionamento básico do site e não podem ser desativados. Eles são geralmente definidos apenas em resposta a ações realizadas por você, como definir suas preferências de privacidade, fazer login ou preencher formulários.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200 mt-2">
                        <li><strong>Finalidade:</strong> Garantir funcionalidades básicas do site</li>
                        <li><strong>Duração:</strong> Geralmente cookies de sessão (temporários)</li>
                        <li><strong>Desativável:</strong> Não (necessários para o funcionamento do site)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        2.2. Cookies de Análise e Performance
                      </h3>
                      <p className="leading-relaxed mb-2">
                        Estes cookies nos ajudam a entender como os visitantes interagem com nosso site, fornecendo informações sobre áreas visitadas, tempo de permanência e problemas encontrados. Isso nos permite melhorar o desempenho e a funcionalidade do site.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200 mt-2">
                        <li><strong>Finalidade:</strong> Coletar informações sobre uso do site para melhorias</li>
                        <li><strong>Duração:</strong> Cookies persistentes (permanecem por períodos variados)</li>
                        <li><strong>Desativável:</strong> Sim (você pode recusar através das configurações do navegador ou nosso banner de cookies)</li>
                        <li><strong>Serviços utilizados:</strong> Google Analytics, Vercel Analytics</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        2.3. Cookies de Funcionalidade
                      </h3>
                      <p className="leading-relaxed mb-2">
                        Estes cookies permitem que o site forneça funcionalidades e personalização melhoradas, como lembrar suas preferências, idioma ou região.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200 mt-2">
                        <li><strong>Finalidade:</strong> Personalizar sua experiência no site</li>
                        <li><strong>Duração:</strong> Cookies persistentes</li>
                        <li><strong>Desativável:</strong> Sim (mas algumas funcionalidades podem não funcionar corretamente)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        2.4. Cookies de Segurança
                      </h3>
                      <p className="leading-relaxed mb-2">
                        Utilizamos cookies de segurança para proteger contra atividades fraudulentas e garantir a segurança do site e dos usuários.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200 mt-2">
                        <li><strong>Finalidade:</strong> Detecção de fraudes e segurança</li>
                        <li><strong>Duração:</strong> Cookies de sessão e persistentes</li>
                        <li><strong>Desativável:</strong> Não recomendado (compromete a segurança)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Cookies Utilizados */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    3. Cookies Específicos que Utilizamos
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-dark-900/50 rounded-lg border border-primary-500/20 p-6">
                      <h3 className="text-lg font-semibold mb-3 text-primary-500">
                        Google Analytics
                      </h3>
                      <p className="leading-relaxed mb-3">
                        Utilizamos o Google Analytics para coletar informações sobre como os visitantes usam nosso site. Isso nos ajuda a entender quais páginas são mais populares, quanto tempo os usuários passam no site e como navegam entre as páginas.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200">
                        <li><strong>Cookies utilizados:</strong> _ga, _ga_*, _gid, _gat</li>
                        <li><strong>Finalidade:</strong> Análise de tráfego e comportamento do usuário</li>
                        <li><strong>Duração:</strong> Até 2 anos (dependendo do cookie específico)</li>
                        <li><strong>Fonte:</strong> Google LLC</li>
                        <li><strong>Mais informações:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">Política de Privacidade do Google</a></li>
                      </ul>
                    </div>
                    <div className="bg-dark-900/50 rounded-lg border border-primary-500/20 p-6">
                      <h3 className="text-lg font-semibold mb-3 text-primary-500">
                        Vercel Analytics
                      </h3>
                      <p className="leading-relaxed mb-3">
                        Utilizamos o Vercel Analytics para monitorar o desempenho do site e coletar métricas sobre uso e performance.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200">
                        <li><strong>Finalidade:</strong> Análise de performance e métricas de uso</li>
                        <li><strong>Duração:</strong> Cookies de sessão</li>
                        <li><strong>Fonte:</strong> Vercel Inc.</li>
                        <li><strong>Mais informações:</strong> <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">Política de Privacidade da Vercel</a></li>
                      </ul>
                    </div>
                    <div className="bg-dark-900/50 rounded-lg border border-primary-500/20 p-6">
                      <h3 className="text-lg font-semibold mb-3 text-primary-500">
                        Sentry (Monitoramento de Erros)
                      </h3>
                      <p className="leading-relaxed mb-3">
                        Utilizamos o Sentry para monitorar erros e problemas técnicos no site, ajudando-nos a identificar e corrigir problemas rapidamente.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200">
                        <li><strong>Finalidade:</strong> Monitoramento de erros e performance</li>
                        <li><strong>Duração:</strong> Cookies de sessão</li>
                        <li><strong>Fonte:</strong> Sentry.io</li>
                        <li><strong>Mais informações:</strong> <a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">Política de Privacidade do Sentry</a></li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Tecnologias Similares */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    4. Tecnologias Similares
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Além de cookies, utilizamos outras tecnologias similares para coletar e armazenar informações:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        4.1. Local Storage
                      </h3>
                      <p className="leading-relaxed">
                        Utilizamos o Local Storage do navegador para armazenar preferências do usuário e dados temporários necessários para o funcionamento do site.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        4.2. Session Storage
                      </h3>
                      <p className="leading-relaxed">
                        Utilizamos o Session Storage para armazenar dados temporários durante a sessão do usuário, que são automaticamente removidos quando o navegador é fechado.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        4.3. Pixels e Web Beacons
                      </h3>
                      <p className="leading-relaxed">
                        Podemos utilizar pixels invisíveis (web beacons) em e-mails e no site para rastrear a abertura de e-mails e interações com conteúdo.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Gerenciamento de Cookies */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    5. Como Gerenciar Cookies
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Você tem controle sobre os cookies. A maioria dos navegadores permite que você:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        5.1. Configurações do Navegador
                      </h3>
                      <p className="leading-relaxed mb-3">
                        Você pode configurar seu navegador para recusar ou aceitar cookies, e para notificá-lo quando um cookie está sendo definido. No entanto, se você desativar cookies, algumas funcionalidades do site podem não funcionar corretamente.
                      </p>
                      <p className="leading-relaxed mb-2">
                        <strong>Como desativar cookies nos principais navegadores:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200">
                        <li><strong>Google Chrome:</strong> Configurações → Privacidade e Segurança → Cookies e outros dados do site</li>
                        <li><strong>Mozilla Firefox:</strong> Opções → Privacidade e Segurança → Cookies e dados do site</li>
                        <li><strong>Microsoft Edge:</strong> Configurações → Cookies e permissões do site → Cookies e dados do site</li>
                        <li><strong>Safari:</strong> Preferências → Privacidade → Cookies e dados de sites</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        5.2. Opt-out de Cookies de Terceiros
                      </h3>
                      <p className="leading-relaxed mb-3">
                        Você pode optar por não receber cookies de análise desativando-os através dos seguintes links:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200">
                        <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">Desativar Google Analytics</a></li>
                        <li><strong>Adicionar extensão do navegador:</strong> Você também pode instalar extensões do navegador que bloqueiam cookies de rastreamento</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        5.3. Banner de Consentimento
                      </h3>
                      <p className="leading-relaxed">
                        Quando disponível, você pode gerenciar suas preferências de cookies através do banner de consentimento que aparece quando você visita nosso site pela primeira vez. Você pode alterar suas preferências a qualquer momento através das configurações de cookies.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Cookies de Terceiros */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    6. Cookies de Terceiros
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Nosso site pode conter links para sites de terceiros e também pode utilizar serviços de terceiros que definem cookies. Estes cookies são definidos por domínios externos e não são controlados diretamente por nós. Exemplos incluem:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li><strong>Google Analytics</strong> - Para análise de tráfego</li>
                    <li><strong>Vercel</strong> - Para hospedagem e análise de performance</li>
                    <li><strong>Sentry</strong> - Para monitoramento de erros</li>
                    <li><strong>Redes sociais</strong> - Se você interagir com botões de redes sociais no site</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Recomendamos que você leia as políticas de privacidade e cookies desses serviços de terceiros para entender como eles utilizam cookies e outras tecnologias de rastreamento.
                  </p>
                </section>

                {/* Duração dos Cookies */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    7. Duração dos Cookies
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Os cookies que utilizamos podem ser:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        7.1. Cookies de Sessão
                      </h3>
                      <p className="leading-relaxed">
                        Estes cookies são temporários e são excluídos automaticamente quando você fecha o navegador. Eles nos ajudam a manter sua sessão ativa enquanto você navega pelo site.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        7.2. Cookies Persistentes
                      </h3>
                      <p className="leading-relaxed">
                        Estes cookies permanecem em seu dispositivo por um período determinado ou até que você os exclua. Eles nos permitem lembrar suas preferências e melhorar sua experiência em visitas futuras.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Alterações na Política */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    8. Alterações nesta Política
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças em nossas práticas ou por outras razões operacionais, legais ou regulatórias. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer alterações.
                  </p>
                  <p className="leading-relaxed">
                    A data da última atualização está indicada no topo desta página. Alterações significativas serão comunicadas através do site ou por e-mail, quando aplicável.
                  </p>
                </section>

                {/* Seus Direitos */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    9. Seus Direitos
                  </h2>
                  <p className="leading-relaxed mb-4">
                    De acordo com a LGPD e outras leis de proteção de dados aplicáveis, você tem o direito de:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li>Ser informado sobre o uso de cookies</li>
                    <li>Optar por não receber cookies não essenciais</li>
                    <li>Acessar informações sobre quais cookies são utilizados</li>
                    <li>Solicitar a exclusão de cookies que coletam seus dados pessoais</li>
                    <li>Retirar seu consentimento para uso de cookies a qualquer momento</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Para exercer seus direitos relacionados a cookies e dados pessoais, entre em contato conosco através do e-mail <a href="mailto:contato@decyphra.com.br" className="text-primary-500 hover:text-primary-400 transition-colors">contato@decyphra.com.br</a>.
                  </p>
                </section>

                {/* Mais Informações */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    10. Mais Informações
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Para mais informações sobre cookies e como gerenciá-los, você pode visitar os seguintes recursos:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">All About Cookies</a> - Informações gerais sobre cookies</li>
                    <li><a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">Your Online Choices</a> - Ferramenta de opt-out para cookies de publicidade</li>
                    <li><a href="/privacidade" className="text-primary-500 hover:text-primary-400 transition-colors">Nossa Política de Privacidade</a> - Para informações sobre como tratamos seus dados pessoais</li>
                  </ul>
                </section>

                {/* Contato */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    11. Contato
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Se você tiver dúvidas ou preocupações sobre nossa Política de Cookies ou sobre como utilizamos cookies e tecnologias similares, entre em contato conosco:
                  </p>
                  <div className="bg-dark-900/50 rounded-lg border border-primary-500/20 p-6 mt-4">
                    <p className="text-light-50 font-semibold mb-2">Decyphra</p>
                    <p className="text-light-200 mb-2">
                      <strong>E-mail:</strong>{' '}
                      <a href="mailto:contato@decyphra.com.br" className="text-primary-500 hover:text-primary-400 transition-colors">
                        contato@decyphra.com.br
                      </a>
                    </p>
                    <p className="text-light-200">
                      <strong>Endereço:</strong> Sumaré, SP - Brasil
                    </p>
                  </div>
                </section>

              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </>
  )
}

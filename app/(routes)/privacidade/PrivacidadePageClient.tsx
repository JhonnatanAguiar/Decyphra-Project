'use client'

import { useState, useEffect } from 'react'
import { Container, Section } from '@/views/components/layout'
import { FadeIn } from '@/views/components/animations'

/**
 * Página de Política de Privacidade Client Component
 * 
 * Componente client-side da página de política de privacidade
 */

export default function PrivacidadePageClient() {
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
                Política de <span className="text-light-50">Privacidade</span>
              </h1>
              <p className="text-lg md:text-xl text-light-200 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                Sua privacidade é importante para nós. Esta política explica como coletamos, usamos e protegemos seus dados pessoais.
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
                    1. Introdução
                  </h2>
                  <p className="leading-relaxed">
                    A <strong className="text-primary-500">Decyphra</strong> ({'"'}nós{'"'}, {'"'}nosso{'"'} ou {'"'}empresa{'"'}) está comprometida em proteger a privacidade e os dados pessoais de nossos usuários e visitantes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong> e demais normas aplicáveis.
                  </p>
                  <p className="leading-relaxed mt-4">
                    Ao utilizar nosso site e serviços, você concorda com as práticas descritas nesta política. Recomendamos que você leia atentamente este documento.
                  </p>
                </section>

                {/* Dados Coletados */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    2. Dados Pessoais que Coletamos
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Coletamos os seguintes tipos de dados pessoais quando você utiliza nosso site:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        2.1. Dados Fornecidos Voluntariamente
                      </h3>
                      <ul className="list-disc pl-6 space-y-2 text-light-200">
                        <li><strong>Nome completo</strong> - quando você preenche nosso formulário de contato</li>
                        <li><strong>Endereço de e-mail</strong> - para comunicação e envio de informações</li>
                        <li><strong>Telefone/WhatsApp</strong> - para contato e suporte (opcional)</li>
                        <li><strong>Nome da empresa</strong> - para identificação do seu negócio (opcional)</li>
                        <li><strong>Mensagens</strong> - conteúdo das comunicações enviadas através do formulário</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        2.2. Dados Coletados Automaticamente
                      </h3>
                      <ul className="list-disc pl-6 space-y-2 text-light-200">
                        <li><strong>Endereço IP</strong> - para segurança e análise</li>
                        <li><strong>Informações do navegador</strong> - tipo, versão, idioma</li>
                        <li><strong>Dados de navegação</strong> - páginas visitadas, tempo de permanência</li>
                        <li><strong>Cookies e tecnologias similares</strong> - conforme nossa Política de Cookies</li>
                        <li><strong>Dados de localização aproximada</strong> - baseado no IP (não precisa)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Finalidade do Uso */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    3. Finalidade do Uso dos Dados
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Utilizamos seus dados pessoais para as seguintes finalidades:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li>Responder às suas solicitações e entrar em contato sobre nossos serviços</li>
                    <li>Enviar confirmações e notificações relacionadas ao uso do site</li>
                    <li>Melhorar nossos serviços e experiência do usuário</li>
                    <li>Realizar análises estatísticas e métricas de uso do site</li>
                    <li>Cumprir obrigações legais e regulatórias</li>
                    <li>Prevenir fraudes e garantir a segurança do site</li>
                    <li>Enviar comunicações de marketing (apenas com seu consentimento explícito)</li>
                  </ul>
                </section>

                {/* Base Legal */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    4. Base Legal para o Tratamento
                  </h2>
                  <p className="leading-relaxed mb-4">
                    O tratamento de seus dados pessoais é realizado com base nas seguintes hipóteses legais da LGPD:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li><strong>Consentimento</strong> - quando você nos fornece dados voluntariamente</li>
                    <li><strong>Execução de contrato</strong> - para cumprir obrigações contratuais</li>
                    <li><strong>Cumprimento de obrigação legal</strong> - para atender determinações legais</li>
                    <li><strong>Legítimo interesse</strong> - para melhorar nossos serviços e segurança</li>
                  </ul>
                </section>

                {/* Compartilhamento de Dados */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    5. Compartilhamento de Dados
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Não vendemos, alugamos ou comercializamos seus dados pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li><strong>Prestadores de serviços</strong> - empresas que nos auxiliam na operação do site (hospedagem, análise, e-mail) sob contratos de confidencialidade</li>
                    <li><strong>Obrigações legais</strong> - quando exigido por lei, ordem judicial ou autoridade competente</li>
                    <li><strong>Com seu consentimento</strong> - quando você autorizar explicitamente o compartilhamento</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Utilizamos os seguintes serviços terceirizados:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200 mt-2">
                    <li><strong>Vercel</strong> - Hospedagem e infraestrutura do site</li>
                    <li><strong>Resend</strong> - Serviço de envio de e-mails transacionais</li>
                    <li><strong>Google Analytics</strong> - Análise de tráfego e comportamento (com seu consentimento)</li>
                    <li><strong>Sentry</strong> - Monitoramento de erros e performance</li>
                  </ul>
                </section>

                {/* Segurança dos Dados */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    6. Segurança dos Dados
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li>Criptografia SSL/TLS para transmissão de dados</li>
                    <li>Armazenamento seguro em bancos de dados protegidos</li>
                    <li>Controles de acesso restritos e autenticação</li>
                    <li>Monitoramento contínuo de segurança</li>
                    <li>Backups regulares dos dados</li>
                    <li>Atualizações de segurança constantes</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Apesar de nossos esforços, nenhum método de transmissão ou armazenamento é 100% seguro. Não podemos garantir segurança absoluta, mas nos comprometemos a notificar você em caso de violação de dados que possa afetá-lo.
                  </p>
                </section>

                {/* Retenção de Dados */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    7. Período de Retenção dos Dados
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li><strong>Dados de contato</strong> - enquanto mantivermos relacionamento comercial ou você não solicitar exclusão</li>
                    <li><strong>Dados de navegação</strong> - conforme nossa Política de Cookies</li>
                    <li><strong>Dados legais obrigatórios</strong> - conforme prazo legal aplicável</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Após o término do período de retenção, seus dados serão excluídos de forma segura ou anonimizados.
                  </p>
                </section>

                {/* Direitos do Titular */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    8. Seus Direitos (LGPD)
                  </h2>
                  <p className="leading-relaxed mb-4">
                    De acordo com a LGPD, você possui os seguintes direitos sobre seus dados pessoais:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li><strong>Confirmação e acesso</strong> - saber se tratamos seus dados e ter acesso a eles</li>
                    <li><strong>Correção</strong> - solicitar correção de dados incompletos, inexatos ou desatualizados</li>
                    <li><strong>Anonimização, bloqueio ou eliminação</strong> - solicitar remoção de dados desnecessários ou excessivos</li>
                    <li><strong>Portabilidade</strong> - solicitar portabilidade dos dados para outro fornecedor</li>
                    <li><strong>Eliminação</strong> - solicitar exclusão dos dados tratados com base em consentimento</li>
                    <li><strong>Informação</strong> - obter informações sobre entidades públicas e privadas com as quais compartilhamos dados</li>
                    <li><strong>Revogação do consentimento</strong> - retirar seu consentimento a qualquer momento</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Para exercer seus direitos, entre em contato conosco através do e-mail <a href="mailto:contato@decyphra.com.br" className="text-primary-500 hover:text-primary-400 transition-colors">contato@decyphra.com.br</a> ou através de nosso formulário de contato.
                  </p>
                </section>

                {/* Cookies */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    9. Cookies e Tecnologias Similares
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site. Para mais informações sobre como utilizamos cookies, consulte nossa <a href="/cookies" className="text-primary-500 hover:text-primary-400 transition-colors">Política de Cookies</a>.
                  </p>
                </section>

                {/* Alterações na Política */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    10. Alterações nesta Política
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer alterações. Alterações significativas serão comunicadas através do site ou por e-mail.
                  </p>
                  <p className="leading-relaxed">
                    A data da última atualização está indicada no topo desta página.
                  </p>
                </section>

                {/* Contato */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    11. Contato e Encarregado de Dados (DPO)
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Se você tiver dúvidas, solicitações ou reclamações sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato conosco:
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
                  <p className="leading-relaxed mt-4">
                    Responderemos às suas solicitações no prazo de até 15 (quinze) dias, conforme estabelecido pela LGPD.
                  </p>
                </section>

              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Container, Section } from '@/views/components/layout'
import { FadeIn } from '@/views/components/animations'

/**
 * Página de Termos de Uso Client Component
 * 
 * Componente client-side da página de termos de uso
 */

export default function TermosPageClient() {
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
                Termos de <span className="text-light-50">Uso</span>
              </h1>
              <p className="text-lg md:text-xl text-light-200 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                Estes termos estabelecem as condições para utilização de nosso site e serviços. Ao acessar e utilizar nossos serviços, você concorda com estes termos.
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
                    Bem-vindo ao site da <strong className="text-primary-500">Decyphra</strong>. Estes Termos de Uso ({'"'}Termos{'"'}) regulam o acesso e uso de nosso site, serviços e plataforma (coletivamente, os {'"'}Serviços{'"'}). Ao acessar ou utilizar nossos Serviços, você concorda em ficar vinculado a estes Termos.
                  </p>
                  <p className="leading-relaxed mt-4">
                    Se você não concorda com algum destes Termos, não deve utilizar nossos Serviços. Recomendamos que você leia atentamente este documento antes de utilizar nossos Serviços.
                  </p>
                </section>

                {/* Aceitação dos Termos */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    2. Aceitação dos Termos
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Ao acessar, navegar ou utilizar nossos Serviços de qualquer forma, você declara e garante que:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li>Leu, compreendeu e concorda em ficar vinculado a estes Termos</li>
                    <li>Possui capacidade legal para aceitar estes Termos (se for menor de idade, você deve ter o consentimento de seus pais ou responsáveis)</li>
                    <li>Não está violando nenhuma lei ou regulamento aplicável</li>
                    <li>As informações fornecidas são verdadeiras, precisas e atualizadas</li>
                  </ul>
                </section>

                {/* Descrição dos Serviços */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    3. Descrição dos Serviços
                  </h2>
                  <p className="leading-relaxed mb-4">
                    A Decyphra oferece os seguintes serviços:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li>Desenvolvimento web e de aplicações</li>
                    <li>Consultoria em transformação digital</li>
                    <li>Serviços de e-commerce completo</li>
                    <li>Otimização SEO e marketing de conteúdo</li>
                    <li>Desenvolvimento com inteligência artificial</li>
                    <li>Consultoria em Google Ads</li>
                    <li>Outros serviços de tecnologia e marketing digital relacionados</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto dos Serviços a qualquer momento, com ou sem aviso prévio.
                  </p>
                </section>

                {/* Uso Permitido e Restrições */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    4. Uso Permitido e Restrições
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        4.1. Uso Permitido
                      </h3>
                      <p className="leading-relaxed">
                        Você pode utilizar nossos Serviços apenas para fins legítimos e de acordo com estes Termos. É permitido:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200 mt-2">
                        <li>Acessar e navegar pelo site</li>
                        <li>Utilizar os serviços oferecidos para fins comerciais legítimos</li>
                        <li>Entrar em contato conosco através dos canais oficiais</li>
                        <li>Compartilhar conteúdo do site em redes sociais, desde que mantenha os créditos e links originais</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        4.2. Restrições
                      </h3>
                      <p className="leading-relaxed mb-2">
                        Você <strong>NÃO</strong> pode:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-light-200">
                        <li>Utilizar nossos Serviços de forma que viole qualquer lei, regulamento ou direito de terceiros</li>
                        <li>Reproduzir, duplicar, copiar, vender ou explorar comercialmente qualquer parte dos Serviços sem autorização prévia</li>
                        <li>Tentar acessar áreas restritas, sistemas ou contas não autorizadas</li>
                        <li>Transmitir vírus, malware ou qualquer código malicioso</li>
                        <li>Realizar engenharia reversa, descompilação ou desmontagem de nossos Serviços</li>
                        <li>Interferir ou interromper o funcionamento dos Serviços</li>
                        <li>Coletar informações de outros usuários sem autorização</li>
                        <li>Utilizar nossos Serviços para atividades fraudulentas, ilegais ou enganosas</li>
                        <li>Falsificar ou modificar informações de identificação</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Propriedade Intelectual */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    5. Propriedade Intelectual
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Todo o conteúdo disponível nos Serviços, incluindo, mas não limitado a:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200 mb-4">
                    <li>Textos, gráficos, logotipos, ícones, imagens e software</li>
                    <li>Design, layout e estrutura do site</li>
                    <li>Marca {'"'}Decyphra{'"'} e demais marcas registradas</li>
                    <li>Código-fonte, algoritmos e tecnologias proprietárias</li>
                  </ul>
                  <p className="leading-relaxed">
                    São de propriedade exclusiva da <strong className="text-primary-500">Decyphra</strong> ou de seus licenciadores e estão protegidos por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual do Brasil e de outros países.
                  </p>
                  <p className="leading-relaxed mt-4">
                    É expressamente vedada a reprodução, distribuição, modificação ou criação de obras derivadas do conteúdo dos Serviços sem autorização prévia e por escrito da Decyphra.
                  </p>
                </section>

                {/* Conteúdo do Usuário */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    6. Conteúdo Fornecido pelo Usuário
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Quando você nos fornece conteúdo através de formulários, mensagens, comentários ou outras formas de comunicação:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li>Você mantém a propriedade intelectual sobre o conteúdo que fornece</li>
                    <li>Você nos concede uma licença não exclusiva, mundial, livre de royalties e transferível para usar, reproduzir, modificar, adaptar e exibir esse conteúdo para fins de prestação dos Serviços</li>
                    <li>Você declara e garante que possui todos os direitos necessários sobre o conteúdo fornecido</li>
                    <li>Você declara que o conteúdo não viola direitos de terceiros</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Reservamo-nos o direito de remover qualquer conteúdo que consideremos inadequado, ofensivo ou em violação destes Termos, sem aviso prévio.
                  </p>
                </section>

                {/* Limitação de Responsabilidade */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    7. Limitação de Responsabilidade
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Na medida máxima permitida por lei:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li>Os Serviços são fornecidos {'"'}como estão{'"'} e {'"'}conforme disponível{'"'}, sem garantias de qualquer tipo, expressas ou implícitas</li>
                    <li>Não garantimos que os Serviços estarão sempre disponíveis, ininterruptos, seguros ou livres de erros</li>
                    <li>Não nos responsabilizamos por danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou impossibilidade de uso dos Serviços</li>
                    <li>Não nos responsabilizamos por perda de dados, lucros, receitas ou oportunidades de negócio</li>
                    <li>Não nos responsabilizamos por ações ou omissões de terceiros, incluindo provedores de serviços</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Algumas jurisdições não permitem a exclusão de certas garantias ou limitações de responsabilidade. Nesses casos, nossas limitações se aplicam na medida máxima permitida pela lei aplicável.
                  </p>
                </section>

                {/* Isenção de Garantias */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    8. Isenção de Garantias
                  </h2>
                  <p className="leading-relaxed mb-4">
                    A Decyphra não oferece garantias sobre:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li>A precisão, completude ou atualidade das informações nos Serviços</li>
                    <li>Que os Serviços atenderão às suas necessidades ou expectativas específicas</li>
                    <li>Que os Serviços estarão livres de erros, vírus ou outros componentes prejudiciais</li>
                    <li>Que qualquer defeito ou erro será corrigido</li>
                    <li>Resultados específicos do uso dos Serviços</li>
                  </ul>
                </section>

                {/* Links para Sites de Terceiros */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    9. Links para Sites de Terceiros
                  </h2>
                  <p className="leading-relaxed">
                    Nossos Serviços podem conter links para sites de terceiros que não são controlados pela Decyphra. Não temos controle sobre o conteúdo, políticas de privacidade ou práticas de sites de terceiros e não assumimos responsabilidade por eles.
                  </p>
                  <p className="leading-relaxed mt-4">
                    Ao clicar em links de terceiros, você reconhece que está deixando nosso site e que a utilização de sites de terceiros está sujeita aos termos e políticas de privacidade daqueles sites.
                  </p>
                </section>

                {/* Modificações nos Termos */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    10. Modificações nos Termos
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Reservamo-nos o direito de modificar estes Termos a qualquer momento, a nosso exclusivo critério. As modificações entrarão em vigor imediatamente após a publicação no site.
                  </p>
                  <p className="leading-relaxed">
                    É sua responsabilidade revisar periodicamente estes Termos. O uso contínuo dos Serviços após a publicação de modificações constitui sua aceitação dos Termos modificados. Se você não concordar com as modificações, deve deixar de utilizar nossos Serviços.
                  </p>
                </section>

                {/* Rescisão */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    11. Rescisão
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Podemos encerrar ou suspender seu acesso aos Serviços imediatamente, sem aviso prévio, por qualquer motivo, incluindo, mas não limitado a:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-200">
                    <li>Violação destes Termos</li>
                    <li>Uso fraudulento, ilegal ou não autorizado dos Serviços</li>
                    <li>Solicitação sua</li>
                    <li>Encerramento ou modificação substancial dos Serviços</li>
                    <li>Requisitos técnicos ou legais</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Após a rescisão, seu direito de utilizar os Serviços cessará imediatamente. Todas as disposições destes Termos que por sua natureza devam sobreviver permanecerão em vigor após a rescisão.
                  </p>
                </section>

                {/* Lei Aplicável e Foro */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    12. Lei Aplicável e Foro
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Estes Termos são regidos e interpretados de acordo com as leis da República Federativa do Brasil, sem considerar conflitos de disposições legais.
                  </p>
                  <p className="leading-relaxed">
                    Qualquer disputa relacionada a estes Termos ou aos Serviços será resolvida exclusivamente no foro da Comarca de Sumaré, Estado de São Paulo, Brasil, renunciando as partes a qualquer outro foro, por mais privilegiado que seja.
                  </p>
                </section>

                {/* Disposições Gerais */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    13. Disposições Gerais
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        13.1. Integridade do Acordo
                      </h3>
                      <p className="leading-relaxed">
                        Estes Termos, juntamente com nossa Política de Privacidade e Política de Cookies, constituem o acordo completo entre você e a Decyphra em relação aos Serviços.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        13.2. Renúncia
                      </h3>
                      <p className="leading-relaxed">
                        A falha da Decyphra em exercer ou fazer valer qualquer direito ou disposição destes Termos não constitui renúncia a esse direito ou disposição.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        13.3. Divisibilidade
                      </h3>
                      <p className="leading-relaxed">
                        Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-500">
                        13.4. Atribuição
                      </h3>
                      <p className="leading-relaxed">
                        Você não pode transferir ou ceder seus direitos ou obrigações sob estes Termos sem nosso consentimento prévio por escrito. Podemos transferir nossos direitos e obrigações sem restrições.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Contato */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                    14. Contato
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
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

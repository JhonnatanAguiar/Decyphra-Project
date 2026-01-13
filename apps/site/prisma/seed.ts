import { PrismaClient } from '@prisma/client'

// Criar instância do Prisma Client para o seed
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

/**
 * Seed de dados iniciais para o banco de dados
 * 
 * Popula o banco com:
 * - Serviços oferecidos pela Decyphra
 */

async function main() {
  console.log('🌱 Iniciando seed de dados...')

  // Limpar serviços existentes (opcional - apenas em desenvolvimento)
  // await prisma.service.deleteMany()

  // Serviços da Decyphra
  const services = [
    {
      slug: 'desenvolvimento-web',
      title: 'Desenvolvimento Web',
      description: 'Sites e aplicações web modernas, responsivas e de alta performance',
      longDescription: 'Criamos soluções web personalizadas que combinam design moderno com tecnologia de ponta. Desenvolvemos sites institucionais, landing pages, aplicações web complexas e Progressive Web Apps (PWA) que funcionam perfeitamente em todos os dispositivos.',
      features: [
        'Sites responsivos e modernos',
        'Aplicações web personalizadas',
        'PWA (Progressive Web Apps)',
        'Otimização de performance',
        'SEO integrado',
        'Design sob medida'
      ],
      order: 1,
      active: true,
    },
    {
      slug: 'sistemas-apis',
      title: 'Sistemas e APIs',
      description: 'Sistemas personalizados e APIs RESTful para integração e automação',
      longDescription: 'Desenvolvemos sistemas completos e APIs robustas que integram seus processos de negócio. Nossas soluções são escaláveis, seguras e preparadas para crescer com sua empresa.',
      features: [
        'APIs REST e GraphQL',
        'Sistemas personalizados',
        'Integrações entre sistemas',
        'Arquitetura escalável',
        'Documentação completa',
        'Segurança e performance'
      ],
      order: 2,
      active: true,
    },
    {
      slug: 'seo-otimizacao',
      title: 'SEO & Otimização',
      description: 'Otimização completa para mecanismos de busca e melhor posicionamento',
      longDescription: 'Aumente sua visibilidade online com estratégias de SEO técnicas e de conteúdo. Otimizamos seu site para alcançar melhores posições nos resultados de busca e atrair mais clientes qualificados.',
      features: [
        'Análise e auditoria SEO',
        'Otimização técnica',
        'Conteúdo otimizado',
        'Link building estratégico',
        'SEO local',
        'Relatórios e acompanhamento'
      ],
      order: 3,
      active: true,
    },
    {
      slug: 'google-ads',
      title: 'Google Ads',
      description: 'Campanhas publicitárias no Google para gerar leads e vendas',
      longDescription: 'Gerencie campanhas eficientes no Google Ads que convertem visitantes em clientes. Criamos e otimizamos anúncios que maximizam seu ROI e alcançam o público certo no momento certo.',
      features: [
        'Criação de campanhas',
        'Otimização contínua',
        'Remarketing',
        'Google Analytics integrado',
        'A/B testing',
        'Relatórios detalhados'
      ],
      order: 4,
      active: true,
    },
    {
      slug: 'marketing-conteudo',
      title: 'Marketing de Conteúdo',
      description: 'Estratégias de conteúdo para engajamento e construção de autoridade',
      longDescription: 'Criamos conteúdo relevante e estratégico que engaja sua audiência e posiciona sua marca como autoridade no mercado. Desenvolvemos blogs, artigos, posts em redes sociais e materiais ricos que convertem.',
      features: [
        'Criação de conteúdo',
        'Estratégia de conteúdo',
        'Gestão de redes sociais',
        'Blog e artigos',
        'Materiais ricos',
        'Análise de resultados'
      ],
      order: 5,
      active: true,
    },
    {
      slug: 'inteligencia-artificial',
      title: 'Inteligência Artificial',
      description: 'Soluções com IA para automação, eficiência e inovação',
      longDescription: 'Integramos inteligência artificial em seus processos para automatizar tarefas, melhorar a experiência do cliente e gerar insights valiosos. Desenvolvemos chatbots, sistemas de recomendação e análises preditivas.',
      features: [
        'Chatbots inteligentes',
        'Automação com IA',
        'Análise de dados avançada',
        'Integração de IA',
        'Machine Learning',
        'Processamento de linguagem natural'
      ],
      order: 6,
      active: true,
    },
    {
      slug: 'ecommerce',
      title: 'E-commerce',
      description: 'Lojas virtuais completas e otimizadas para conversão',
      longDescription: 'Criamos lojas virtuais que vendem. Desenvolvemos e-commerces completos com gestão de produtos, carrinho, checkout seguro, integração de pagamentos e muito mais. Tudo otimizado para máxima conversão.',
      features: [
        'Lojas virtuais completas',
        'Integração de pagamentos',
        'Gestão de estoque',
        'Otimização de conversão',
        'Painel administrativo',
        'Suporte multi-idioma'
      ],
      order: 7,
      active: true,
    },
    {
      slug: 'consultoria-digital',
      title: 'Consultoria Digital',
      description: 'Consultoria estratégica para transformação digital do seu negócio',
      longDescription: 'Ajudamos sua empresa a navegar pela transformação digital com estratégias personalizadas. Analisamos seu negócio, identificamos oportunidades e criamos um roadmap claro para o sucesso digital.',
      features: [
        'Análise de negócio',
        'Estratégia digital',
        'Roadmap de implementação',
        'Acompanhamento contínuo',
        'Otimização de processos',
        'Treinamento de equipe'
      ],
      order: 8,
      active: true,
    },
  ]

  // Criar serviços
  console.log('📦 Criando serviços...')
  for (const service of services) {
    const created = await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
    console.log(`  ✅ ${created.title}`)
  }

  console.log('✨ Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { PrismaClient, LeadStatus, ClientStatus, ContactStatus, ProjectStatus } from '@prisma/client'

// Criar instância do Prisma Client para o seed
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

/**
 * Seed de dados para o Painel Admin
 * 
 * Popula o banco com dados de teste para visualização no painel:
 * - Leads com diferentes status
 * - Clientes (alguns convertidos de leads)
 * - Projetos
 * - Depoimentos
 * - Submissões de contato
 * - Interações
 */

async function main() {
  console.log('🌱 Iniciando seed de dados para o Painel Admin...\n')

  // 1. Criar Leads
  console.log('📊 Criando Leads...')
  const leads = []
  
  const leadData = [
    {
      name: 'João Silva',
      email: 'joao.silva@example.com',
      phone: '+5511999887766',
      company: 'TechCorp',
      service: 'Desenvolvimento Web',
      source: 'formulario_contato',
      status: 'new' as LeadStatus,
      score: 85,
      notes: 'Cliente interessado em site institucional. Orçamento de R$ 15.000.',
    },
    {
      name: 'Maria Santos',
      email: 'maria.santos@example.com',
      phone: '+5511988776655',
      company: 'Design Studio',
      service: 'E-commerce',
      source: 'referencia',
      status: 'contacted' as LeadStatus,
      score: 70,
      notes: 'Já entrou em contato. Aguardando retorno sobre proposta.',
    },
    {
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@example.com',
      phone: '+5511977665544',
      company: 'StartupXYZ',
      service: 'Inteligência Artificial',
      source: 'site',
      status: 'qualified' as LeadStatus,
      score: 90,
      notes: 'Lead qualificado. Necessita de solução com IA para automação.',
    },
    {
      name: 'Ana Costa',
      email: 'ana.costa@example.com',
      phone: '+5511966554433',
      company: 'E-commerce Plus',
      service: 'E-commerce',
      source: 'google_ads',
      status: 'proposal' as LeadStatus,
      score: 75,
      notes: 'Proposta enviada. Aguardando resposta.',
    },
    {
      name: 'Carlos Ferreira',
      email: 'carlos.ferreira@example.com',
      phone: '+5511955443322',
      company: 'Marketing Digital LTDA',
      service: 'Google Ads',
      source: 'formulario_contato',
      status: 'negotiation' as LeadStatus,
      score: 80,
      notes: 'Em negociação. Valor discutido: R$ 8.000/mês.',
    },
    {
      name: 'Fernanda Lima',
      email: 'fernanda.lima@example.com',
      phone: '+5511944332211',
      company: 'Agência Criativa',
      service: 'Marketing de Conteúdo',
      source: 'referencia',
      status: 'won' as LeadStatus,
      score: 95,
      notes: 'Lead convertido em cliente. Contrato assinado.',
    },
    {
      name: 'Ricardo Souza',
      email: 'ricardo.souza@example.com',
      phone: '+5511933221100',
      company: 'Tech Solutions',
      service: 'Sistemas e APIs',
      source: 'site',
      status: 'lost' as LeadStatus,
      score: 40,
      notes: 'Cliente optou por outro fornecedor.',
    },
    {
      name: 'Juliana Alves',
      email: 'juliana.alves@example.com',
      phone: '+5511922110099',
      company: 'Digital Agency',
      service: 'SEO & Otimização',
      source: 'formulario_contato',
      status: 'archived' as LeadStatus,
      score: 30,
      notes: 'Lead arquivado por falta de resposta.',
    },
    {
      name: 'Bruno Rodrigues',
      email: 'bruno.rodrigues@example.com',
      phone: '+5511911009988',
      company: 'Inovação Tech',
      service: 'Consultoria Digital',
      source: 'google_ads',
      status: 'new' as LeadStatus,
      score: 60,
      notes: 'Novo lead. Precisa de consultoria estratégica.',
    },
    {
      name: 'Patrícia Martins',
      email: 'patricia.martins@example.com',
      phone: '+5511900998877',
      company: 'Comércio Online',
      service: 'E-commerce',
      source: 'site',
      status: 'contacted' as LeadStatus,
      score: 65,
      notes: 'Primeiro contato realizado. Interessada em e-commerce completo.',
    },
  ]

  for (const data of leadData) {
    // Verificar se lead já existe
    const existing = await prisma.lead.findFirst({
      where: { email: data.email },
    })
    
    if (!existing) {
      const lead = await prisma.lead.create({
        data,
      })
      leads.push(lead)
      console.log(`  ✅ Lead criado: ${lead.name} (${lead.status})`)
    } else {
      leads.push(existing)
      console.log(`  ⏭️  Lead já existe: ${data.name}`)
    }
  }

  // 2. Criar Clientes (convertidos de alguns leads e alguns diretos)
  console.log('\n👥 Criando Clientes...')
  const clients = []

  // Cliente convertido do lead ganho
  const wonLead = leads.find(l => l.status === 'won')
  if (wonLead) {
    // Verificar se cliente já existe
    const existingClient = await prisma.client.findFirst({
      where: { email: wonLead.email },
    })
    
    if (!existingClient) {
      const client1 = await prisma.client.create({
        data: {
          name: wonLead.name,
          email: wonLead.email,
          phone: wonLead.phone,
          company: wonLead.company,
          status: 'active' as ClientStatus,
          convertedFromLeadId: wonLead.id,
          segment: 'Agências',
          notes: 'Cliente ativo. Contrato iniciado em dezembro/2024.',
        },
      })
      clients.push(client1)
      console.log(`  ✅ Cliente criado: ${client1.name} (convertido de lead)`)
    } else {
      // Atualizar lead para vincular ao cliente
      await prisma.lead.update({
        where: { id: wonLead.id },
        data: { status: 'won' },
      })
      clients.push(existingClient)
      console.log(`  ⏭️  Cliente já existe: ${wonLead.name}`)
    }
  }

  // Clientes diretos
  const clientData = [
    {
      name: 'Empresa ABC Ltda',
      email: 'contato@empresaabc.com.br',
      phone: '+5511888776655',
      company: 'Empresa ABC',
      cnpj: '12.345.678/0001-90',
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      status: 'active' as ClientStatus,
      segment: 'Varejo',
      notes: 'Cliente desde 2023. Múltiplos projetos realizados.',
    },
    {
      name: 'Startup Inovadora',
      email: 'contato@startupinovadora.com.br',
      phone: '+5511877665544',
      company: 'Startup Inovadora',
      cnpj: '98.765.432/0001-10',
      address: 'Rua das Flores, 200',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-000',
      status: 'active' as ClientStatus,
      segment: 'Tecnologia',
      notes: 'Cliente premium. Projeto de IA em desenvolvimento.',
    },
    {
      name: 'Loja Virtual Express',
      email: 'contato@lojaexpress.com.br',
      phone: '+5511866554433',
      company: 'Loja Virtual Express',
      cnpj: '11.222.333/0001-44',
      address: 'Av. Atlântica, 500',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30000-000',
      status: 'active' as ClientStatus,
      segment: 'E-commerce',
      notes: 'E-commerce completo desenvolvido. Em produção.',
    },
    {
      name: 'Agência Publicidade',
      email: 'contato@agenciapub.com.br',
      phone: '+5511855443322',
      company: 'Agência Publicidade',
      cnpj: '55.666.777/0001-88',
      address: 'Rua do Comércio, 300',
      city: 'Curitiba',
      state: 'PR',
      zipCode: '80000-000',
      status: 'inactive' as ClientStatus,
      segment: 'Marketing',
      notes: 'Cliente inativo desde setembro/2024.',
    },
  ]

  for (const data of clientData) {
    // Verificar se cliente já existe
    const existing = await prisma.client.findFirst({
      where: { email: data.email },
    })
    
    if (!existing) {
      const client = await prisma.client.create({
        data,
      })
      clients.push(client)
      console.log(`  ✅ Cliente criado: ${client.name} (${client.status})`)
    } else {
      clients.push(existing)
      console.log(`  ⏭️  Cliente já existe: ${data.name}`)
    }
  }

  // 3. Criar Projetos
  console.log('\n💼 Criando Projetos...')
  const projectsData = [
    {
      slug: 'site-empresa-abc',
      title: 'Site Institucional Empresa ABC',
      description: 'Site institucional moderno e responsivo para empresa do setor varejo',
      longDescription: 'Desenvolvemos um site completo com design moderno, totalmente responsivo e otimizado para SEO. O projeto incluiu integração com sistema de gestão, área administrativa e portal do cliente.',
      category: 'web',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma'],
      images: [
        '/images/projects/empresa-abc-1.jpg',
        '/images/projects/empresa-abc-2.jpg',
      ],
      featuredImage: '/images/projects/empresa-abc-featured.jpg',
      client: 'Empresa ABC',
      year: 2024,
      challenges: 'Necessidade de integração com sistema legado e alto volume de acessos',
      solutions: 'Implementamos API REST moderna com cache e CDN para garantir performance',
      results: 'Site lançado com sucesso. Aumento de 40% em conversões e 60% em velocidade.',
      featured: true,
      status: 'published' as ProjectStatus,
      order: 1,
    },
    {
      slug: 'ecommerce-startup',
      title: 'E-commerce Startup Inovadora',
      description: 'Loja virtual completa com gestão de estoque e integração de pagamentos',
      longDescription: 'E-commerce desenvolvido do zero com todas as funcionalidades necessárias para uma loja online completa. Inclui gestão de produtos, carrinho, checkout seguro, integração com gateway de pagamento e painel administrativo.',
      category: 'ecommerce',
      technologies: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      images: [
        '/images/projects/startup-1.jpg',
        '/images/projects/startup-2.jpg',
        '/images/projects/startup-3.jpg',
      ],
      featuredImage: '/images/projects/startup-featured.jpg',
      client: 'Startup Inovadora',
      year: 2024,
      challenges: 'Escalabilidade e segurança de dados de pagamento',
      solutions: 'Arquitetura serverless com validação de segurança e PCI compliance',
      results: 'E-commerce operacional em 2 meses. Primeira venda em menos de 24h após lançamento.',
      featured: true,
      status: 'published' as ProjectStatus,
      order: 2,
    },
    {
      slug: 'sistema-ia-loja',
      title: 'Sistema de IA para Loja Virtual',
      description: 'Sistema de recomendação e chatbot inteligente para e-commerce',
      longDescription: 'Desenvolvemos um sistema completo de inteligência artificial incluindo chatbot para atendimento, sistema de recomendação de produtos e análise preditiva de vendas.',
      category: 'system',
      technologies: ['Python', 'TensorFlow', 'Next.js', 'OpenAI API', 'PostgreSQL'],
      images: [
        '/images/projects/ia-1.jpg',
        '/images/projects/ia-2.jpg',
      ],
      featuredImage: '/images/projects/ia-featured.jpg',
      client: 'Loja Virtual Express',
      year: 2024,
      challenges: 'Integração de IA com sistema existente e processamento em tempo real',
      solutions: 'API de microserviços com processamento assíncrono e cache inteligente',
      results: 'Aumento de 35% em conversões através de recomendações. 80% de atendimentos automatizados.',
      featured: false,
      status: 'published' as ProjectStatus,
      order: 3,
    },
    {
      slug: 'app-mobile-agencia',
      title: 'App Mobile Agência Publicidade',
      description: 'Aplicativo mobile para gestão de campanhas e relatórios',
      longDescription: 'Aplicativo mobile desenvolvido para iOS e Android com funcionalidades de gestão de campanhas publicitárias, visualização de relatórios em tempo real e notificações push.',
      category: 'system',
      technologies: ['React Native', 'TypeScript', 'GraphQL', 'Firebase'],
      images: [
        '/images/projects/mobile-1.jpg',
      ],
      featuredImage: '/images/projects/mobile-featured.jpg',
      client: 'Agência Publicidade',
      year: 2023,
      challenges: 'Compatibilidade iOS/Android e sincronização em tempo real',
      solutions: 'React Native com GraphQL e WebSockets para atualizações em tempo real',
      results: 'App lançado em ambas plataformas. 90% de satisfação dos usuários.',
      featured: false,
      status: 'published' as ProjectStatus,
      order: 4,
    },
    {
      slug: 'api-integracao',
      title: 'API de Integração de Sistemas',
      description: 'API RESTful para integração entre múltiplos sistemas',
      longDescription: 'API completa desenvolvida para integrar diferentes sistemas de gestão empresarial. Inclui autenticação, webhooks, webhooks reversos e documentação completa.',
      category: 'api',
      technologies: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Redis'],
      images: [],
      featuredImage: '/images/projects/api-featured.jpg',
      client: 'Empresa ABC',
      year: 2024,
      challenges: 'Alta disponibilidade e sincronização de dados entre sistemas',
      solutions: 'Arquitetura de microserviços com queue system e fallback automático',
      results: 'API em produção com 99.9% de uptime. Integração de 5 sistemas diferentes.',
      featured: false,
      status: 'published' as ProjectStatus,
      order: 5,
    },
    {
      slug: 'landing-page-produto',
      title: 'Landing Page para Lançamento',
      description: 'Landing page otimizada para lançamento de produto',
      longDescription: 'Landing page desenvolvida com foco em conversão para lançamento de novo produto. Inclui formulários otimizados, A/B testing e integração com CRM.',
      category: 'web',
      technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
      images: [
        '/images/projects/landing-1.jpg',
      ],
      featuredImage: '/images/projects/landing-featured.jpg',
      client: 'Startup Inovadora',
      year: 2024,
      challenges: 'Conversão máxima e tempo de carregamento mínimo',
      solutions: 'Otimização extrema de performance e UX focada em conversão',
      results: 'Taxa de conversão de 12%. Mais de 1000 leads gerados em 30 dias.',
      featured: false,
      status: 'published' as ProjectStatus,
      order: 6,
    },
  ]

  for (const data of projectsData) {
    const project = await prisma.project.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    })
    console.log(`  ✅ Projeto criado: ${project.title} (${project.status})`)
  }

  // 4. Criar Depoimentos
  console.log('\n💬 Criando Depoimentos...')
  const testimonialsData = [
    {
      name: 'João Silva',
      company: 'TechCorp',
      role: 'Diretor de Tecnologia',
      content: 'A Decyphra transformou nossa presença digital. O site que desenvolveram superou todas as nossas expectativas em termos de design e performance. Profissionalismo total!',
      image: '/images/testimonials/joao-silva.jpg',
      rating: 5,
      featured: true,
      order: 1,
    },
    {
      name: 'Maria Santos',
      company: 'Design Studio',
      role: 'CEO',
      content: 'Excelente trabalho no desenvolvimento do nosso e-commerce. A equipe foi muito profissional, sempre disponível e entregou dentro do prazo. Recomendo!',
      image: '/images/testimonials/maria-santos.jpg',
      rating: 5,
      featured: true,
      order: 2,
    },
    {
      name: 'Pedro Oliveira',
      company: 'StartupXYZ',
      role: 'Fundador',
      content: 'A solução com IA que a Decyphra desenvolveu revolucionou nossos processos. A automação economizou muito tempo e aumentou nossa eficiência significativamente.',
      rating: 5,
      featured: false,
      order: 3,
    },
    {
      name: 'Ana Costa',
      company: 'E-commerce Plus',
      role: 'Diretora Comercial',
      content: 'Profissionais extremamente competentes e dedicados. O projeto foi entregue com qualidade excepcional e superou nossas expectativas. Parabéns!',
      image: '/images/testimonials/ana-costa.jpg',
      rating: 4,
      featured: false,
      order: 4,
    },
    {
      name: 'Carlos Ferreira',
      company: 'Marketing Digital LTDA',
      role: 'Gerente de Marketing',
      content: 'A campanha de Google Ads que a Decyphra criou para nós gerou resultados impressionantes. ROI aumentou 150% em apenas 3 meses.',
      rating: 5,
      featured: false,
      order: 5,
    },
  ]

  // Verificar depoimentos existentes para evitar duplicatas
  const existingTestimonials = await prisma.testimonial.findMany({
    select: { name: true },
  })
  const existingTestimonialNames = new Set(existingTestimonials.map((t: { name: string }) => t.name.toLowerCase()))

  for (const data of testimonialsData) {
    if (!existingTestimonialNames.has(data.name.toLowerCase())) {
      const testimonial = await prisma.testimonial.create({
        data,
      })
      console.log(`  ✅ Depoimento criado: ${testimonial.name} (${testimonial.rating}/5)`)
      existingTestimonialNames.add(data.name.toLowerCase())
    } else {
      console.log(`  ⏭️  Depoimento já existe: ${data.name}`)
    }
  }

  // 5. Criar Submissões de Contato
  console.log('\n📧 Criando Submissões de Contato...')
  const contactData = [
    {
      name: 'Lucas Mendes',
      email: 'lucas.mendes@example.com',
      phone: '+5511811009988',
      service: 'Desenvolvimento Web',
      message: 'Gostaria de saber mais sobre desenvolvimento de site institucional. Tenho interesse em um site moderno e responsivo.',
      status: 'new' as ContactStatus,
    },
    {
      name: 'Camila Rocha',
      email: 'camila.rocha@example.com',
      phone: '+5511800998877',
      service: 'E-commerce',
      message: 'Preciso de um e-commerce completo para minha loja. Podem me passar mais informações sobre prazos e valores?',
      status: 'read' as ContactStatus,
    },
    {
      name: 'Roberto Silva',
      email: 'roberto.silva@example.com',
      phone: '+5511799887766',
      service: 'Google Ads',
      message: 'Quero criar campanhas no Google Ads para aumentar as vendas. Gostaria de uma proposta.',
      status: 'replied' as ContactStatus,
    },
    {
      name: 'Amanda Costa',
      email: 'amanda.costa@example.com',
      phone: '+5511788776655',
      service: 'Inteligência Artificial',
      message: 'Estou interessada em implementar IA na minha empresa. Quais são as possibilidades?',
      status: 'new' as ContactStatus,
    },
    {
      name: 'Felipe Santos',
      email: 'felipe.santos@example.com',
      phone: '+5511777665544',
      service: 'SEO & Otimização',
      message: 'Preciso melhorar o posicionamento do meu site no Google. Vocês fazem esse tipo de trabalho?',
      status: 'read' as ContactStatus,
    },
  ]

  for (const data of contactData) {
    // Verificar se já existe um contato com o mesmo email
    const existing = await prisma.contactSubmission.findFirst({
      where: { email: data.email },
    })
    
    if (!existing) {
      const contact = await prisma.contactSubmission.create({
        data,
      })
      console.log(`  ✅ Contato criado: ${contact.name} (${contact.status})`)
    } else {
      console.log(`  ⏭️  Contato já existe: ${data.name}`)
    }
  }

  // 6. Criar Interações
  console.log('\n📞 Criando Interações...')
  
  // Interação para o lead qualificado
  const qualifiedLead = leads.find(l => l.status === 'qualified')
  if (qualifiedLead) {
    await prisma.interaction.create({
      data: {
        type: 'call',
        subject: 'Primeiro contato telefônico',
        description: 'Ligação realizada para entender melhor a necessidade do cliente. Cliente demonstrou interesse em solução com IA para automação de processos.',
        channel: 'phone',
        leadId: qualifiedLead.id,
        metadata: {
          duration: 15,
          notes: 'Cliente muito receptivo e interessado.',
        },
      },
    })
    console.log(`  ✅ Interação criada: Ligação com ${qualifiedLead.name}`)
  }

  // Interação para cliente ativo
  if (clients.length > 0) {
    const activeClient = clients.find(c => c.status === 'active')
    if (activeClient) {
      await prisma.interaction.create({
        data: {
          type: 'meeting',
          subject: 'Reunião de acompanhamento',
          description: 'Reunião mensal de acompanhamento do projeto. Cliente satisfeito com o progresso.',
          channel: 'video_call',
          clientId: activeClient.id,
          metadata: {
            duration: 30,
            participants: ['Cliente', 'Equipe Decyphra'],
          },
        },
      })
      console.log(`  ✅ Interação criada: Reunião com ${activeClient.name}`)
    }
  }

  // Contar dados criados
  const totalLeads = await prisma.lead.count()
  const totalClients = await prisma.client.count()
  const totalProjects = await prisma.project.count()
  const totalTestimonials = await prisma.testimonial.count()
  const totalContacts = await prisma.contactSubmission.count()
  const totalInteractions = await prisma.interaction.count()

  console.log('\n✨ Seed do Painel Admin concluído com sucesso!')
  console.log('\n📊 Resumo:')
  console.log(`  - ${totalLeads} Leads no banco`)
  console.log(`  - ${totalClients} Clientes no banco`)
  console.log(`  - ${totalProjects} Projetos no banco`)
  console.log(`  - ${totalTestimonials} Depoimentos no banco`)
  console.log(`  - ${totalContacts} Contatos no banco`)
  console.log(`  - ${totalInteractions} Interações no banco`)
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

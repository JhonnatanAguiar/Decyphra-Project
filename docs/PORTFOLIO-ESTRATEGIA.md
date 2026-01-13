# Estratégia de Portfólio - Opção A

## Visão Geral

Esta documentação descreve a estratégia completa para criação e gestão de projetos demonstrativos do portfólio da Decyphra, seguindo a **Opção A: Separação Total entre Site Institucional e Demos**.

## Princípios Fundamentais

### 1. Separação Total
- **Site da Decyphra**: Hub institucional com estudos de caso
- **Projetos Demo**: Sites completos e independentes com identidade própria
- **Nenhuma dependência**: Cada projeto é totalmente autônomo

### 2. Identidade Visual Única
Cada projeto deve ter:
- Cores próprias (não usar tema da Decyphra)
- Header e Footer próprios
- Logo/identidade visual própria
- Tipografia personalizada
- Componentes visuais únicos (botões, cards, etc)

### 3. Autonomia Técnica
- Stack independente (pode usar diferentes frameworks)
- Dependências próprias
- Configurações isoladas
- Build e deploy independentes

### 4. Domínio Unificado
- Projetos em subdomínios: `demo-x.decyphra.com.br`
- Mantém autoridade de marca
- Percepção de ecossistema profissional

---

## Estrutura de Arquivos Recomendada

### Opção 1: Repositórios Separados (Recomendado para início)

```
decyphra-site/              # Site principal da Decyphra
  ├── app/
  ├── src/
  └── ...

portfolio-startup-tech/     # Projeto demo 1 (repositório separado)
  ├── app/
  ├── src/
  ├── public/
  └── ...

portfolio-clinica-medica/   # Projeto demo 2 (repositório separado)
  ├── app/
  ├── src/
  ├── public/
  └── ...
```

### Opção 2: Monorepo (Para quando houver múltiplos projetos)

```
decyphra-monorepo/
  ├── apps/
  │   ├── decyphra-site/        # Site principal
  │   ├── portfolio-startup/    # Demo 1
  │   ├── portfolio-clinica/    # Demo 2
  │   └── ...
  ├── packages/
  │   ├── ui/                   # Componentes compartilhados (opcional)
  │   └── config/               # Configs compartilhadas (eslint, tsconfig)
  └── package.json              # Workspace root
```

---

## Checklist de Criação de Projeto Demo

### 1. Configuração Inicial

- [ ] Criar repositório separado ou pasta no monorepo
- [ ] Inicializar projeto Next.js (ou framework escolhido)
- [ ] Configurar TypeScript
- [ ] Configurar ESLint/Prettier
- [ ] Configurar Git e .gitignore

### 2. Design System Próprio

- [ ] Definir paleta de cores única
- [ ] Escolher tipografia (fontes)
- [ ] Definir espaçamentos e grid
- [ ] Criar componentes base (Button, Card, Input, etc)
- [ ] Configurar Tailwind CSS com tema personalizado

### 3. Estrutura de Páginas

- [ ] Header próprio (com logo/nome do projeto)
- [ ] Footer próprio
- [ ] Hero section
- [ ] Seções principais (Sobre, Serviços, Features, etc)
- [ ] Página de contato (opcional)
- [ ] 404 customizado

### 4. Conteúdo e Identidade

- [ ] Nome/marca do projeto
- [ ] Logo ou identidade visual
- [ ] Copywriting próprio
- [ ] Imagens/ilustrações
- [ ] Favicon e meta tags

### 5. Funcionalidades

- [ ] Animações e interatividade
- [ ] Responsividade mobile-first
- [ ] Performance otimizada
- [ ] SEO básico
- [ ] Acessibilidade (WCAG básico)

### 6. Deploy e Integração

- [ ] Deploy em subdomínio (ex: `startup-tech.decyphra.com.br`)
- [ ] Configurar domínio no Vercel/plataforma
- [ ] Testar em produção
- [ ] Adicionar link no estudo de caso no site da Decyphra

---

## Template de Projeto Demo - Next.js

### Estrutura Base

```
portfolio-projeto-nome/
├── app/
│   ├── layout.tsx              # Layout raiz (sem Header/Footer da Decyphra)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Estilos globais próprios
│   └── not-found.tsx           # 404 customizado
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Header próprio
│   │   │   └── Footer.tsx      # Footer próprio
│   │   ├── ui/                 # Componentes UI próprios
│   │   └── sections/           # Seções da página
│   ├── lib/
│   │   └── constants/          # Constantes do projeto
│   └── styles/
│       └── theme.ts            # Tema/tokens de design
├── public/
│   ├── images/
│   ├── logo.svg                # Logo do projeto
│   └── favicon.ico
├── tailwind.config.ts          # Config com cores próprias
├── package.json
└── README.md                   # Documentação do projeto
```

### Exemplo de tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cores próprias do projeto (NÃO usar tema Decyphra)
        brand: {
          primary: '#FF6B6B',      // Exemplo: vermelho
          secondary: '#4ECDC4',    // Exemplo: turquesa
          accent: '#FFE66D',
          dark: '#1A1A2E',
          light: '#F5F5F5',
        },
      },
      fontFamily: {
        // Tipografia própria
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

### Exemplo de Header Próprio

```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="bg-brand-dark border-b border-brand-primary/20">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo do projeto */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Nome do Projeto"
            width={120}
            height={40}
          />
        </Link>
        
        {/* Menu */}
        <ul className="flex gap-6">
          <li><Link href="#sobre">Sobre</Link></li>
          <li><Link href="#servicos">Serviços</Link></li>
          <li><Link href="#contato">Contato</Link></li>
        </ul>
      </nav>
    </header>
  )
}
```

---

## Estudos de Caso no Site da Decyphra

No site principal da Decyphra, cada projeto do portfólio deve ter uma **página de estudo de caso** que inclui:

### Conteúdo do Estudo de Caso

1. **Visão Geral**
   - Nome do projeto
   - Categoria (Landing Page, E-commerce, SaaS, etc)
   - Ano de desenvolvimento
   - Link para demo

2. **O Desafio**
   - Problema ou cenário simulado
   - Objetivos do projeto
   - Contexto do negócio

3. **A Solução**
   - Estratégia adotada
   - Decisões de design
   - Tecnologias utilizadas
   - Arquitetura técnica

4. **Destaques**
   - Features principais
   - Inovações implementadas
   - Elementos únicos

5. **Resultados**
   - Métricas (se aplicável)
   - Benefícios alcançados
   - Aprendizados

6. **Screenshots/Galeria**
   - Imagens do projeto
   - Destaques visuais
   - Responsividade

7. **Call-to-Action**
   - Botão para acessar demo
   - Link para contato

### Estrutura no Site Decyphra

```
app/(routes)/portfolio/
├── page.tsx                    # Lista de projetos
├── PortfolioPageClient.tsx
└── [slug]/
    ├── page.tsx                # Estudo de caso individual
    └── CaseStudyClient.tsx     # Componente do estudo de caso
```

---

## Variabilidade Visual - Guia

### Paletas de Cores por Tipo de Projeto

**Startup Tecnológica / SaaS:**
- Azuis modernos, gradientes
- Estilo futurista, tech
- Ex: `#0066FF`, `#00D4FF`, `#1A1A2E`

**Clínica Médica:**
- Azuis suaves, verdes calmantes
- Estilo clean, confiável
- Ex: `#2E86AB`, `#A23B72`, `#F18F01`

**E-commerce Fashion:**
- Cores vibrantes, contrastes
- Estilo elegante, moderno
- Ex: `#FF6B6B`, `#4ECDC4`, `#FFE66D`

**Restaurante Gourmet:**
- Cores quentes, terrosas
- Estilo sofisticado, acolhedor
- Ex: `#D4A574`, `#8B4513`, `#F5DEB3`

**Consultoria Empresarial:**
- Azuis escuros, cinzas
- Estilo profissional, sério
- Ex: `#1E3A5F`, `#4A90E2`, `#7F8C8D`

**Academia Fitness:**
- Laranjas, vermelhos energéticos
- Estilo dinâmico, motivacional
- Ex: `#FF6B35`, `#F7931E`, `#2C3E50`

### Elementos Visuais Únicos

Cada projeto deve ter:

1. **Botões únicos**
   - Formato, cor, hover effects
   - Não reutilizar componentes da Decyphra

2. **Cards próprios**
   - Estilo, sombras, bordas
   - Animações específicas

3. **Tipografia**
   - Fontes diferentes
   - Hierarquia própria

4. **Espaçamentos**
   - Grid próprio
   - Padding/margin customizados

5. **Animações**
   - Efeitos únicos
   - Timing próprio

---

## Workflow de Criação

### Passo 1: Planejamento
1. Definir tipo de projeto (E-commerce, SaaS, etc)
2. Escolher paleta de cores única
3. Definir identidade visual
4. Criar wireframes/mockups

### Passo 2: Setup Técnico
1. Criar repositório/pasta
2. Configurar projeto Next.js
3. Configurar tema/cores próprias
4. Criar estrutura de pastas

### Passo 3: Desenvolvimento
1. Criar Header e Footer próprios
2. Desenvolver seções principais
3. Implementar animações
4. Testar responsividade

### Passo 4: Polimento
1. Otimizar performance
2. Ajustar detalhes visuais
3. Testar em diferentes dispositivos
4. Revisar acessibilidade

### Passo 5: Deploy e Integração
1. Fazer deploy em subdomínio
2. Criar estudo de caso no site Decyphra
3. Adicionar link e screenshots
4. Testar fluxo completo

---

## Boas Práticas

### ✅ Fazer

- Criar identidade visual única para cada projeto
- Manter projetos completamente isolados
- Documentar cada projeto (README próprio)
- Testar performance de cada demo
- Manter código limpo e organizado
- Usar TypeScript para type safety
- Otimizar imagens e assets
- Implementar SEO básico

### ❌ Evitar

- Reutilizar componentes da Decyphra
- Usar cores/tema da Decyphra
- Criar dependências entre projetos
- Misturar código de projetos diferentes
- Deixar projetos sem documentação
- Ignorar performance
- Criar projetos genéricos/templates

---

## Exemplos de Nomenclatura

### Repositórios
- `portfolio-startup-tech-demo`
- `portfolio-clinica-medica-demo`
- `portfolio-ecommerce-fashion-demo`

### Subdomínios
- `startup-tech.decyphra.com.br`
- `clinica-medica.decyphra.com.br`
- `fashion-store.decyphra.com.br`

### Slugs (Site Decyphra)
- `/portfolio/startup-tecnologica`
- `/portfolio/clinica-medica-digital`
- `/portfolio/ecommerce-fashion`

---

## Checklist de Qualidade

Antes de considerar um projeto completo:

- [ ] Identidade visual única e consistente
- [ ] Header e Footer próprios
- [ ] Responsivo em todos os dispositivos
- [ ] Performance otimizada (Lighthouse > 80)
- [ ] Acessibilidade básica (WCAG AA)
- [ ] SEO configurado (meta tags, sitemap)
- [ ] Deploy funcionando
- [ ] Estudo de caso criado no site Decyphra
- [ ] Documentação completa (README)
- [ ] Código limpo e organizado

---

## Recursos e Referências

### Ferramentas Úteis
- **Paletas**: Coolors.co, Adobe Color
- **Fontes**: Google Fonts, FontPair
- **Ícones**: Lucide Icons, Heroicons
- **Ilustrações**: Undraw, Illustrations
- **Imagens**: Unsplash, Pexels

### Frameworks Recomendados
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion (animações)

---

## Conclusão

Esta estratégia permite criar um portfólio profissional e escalável, onde cada projeto demonstra capacidade técnica real sem comprometer o site institucional. A separação total garante autonomia, performance e facilidade de manutenção.

Cada projeto deve ser tratado como um produto real entregue a um cliente real, com identidade própria e qualidade profissional.
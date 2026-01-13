# Guia Rápido - Criar Novo Projeto Demo

Este guia fornece passos práticos para criar um novo projeto demonstrativo seguindo a estratégia Opção A.

## Pré-requisitos

- Node.js 18+
- Conhecimento básico de Next.js/React
- Git configurado
- Acesso ao Vercel (para deploy)

---

## Passo 1: Criar Repositório

### Opção A: Repositório Separado (Recomendado)

```bash
# Criar novo repositório no GitHub
# Nome: portfolio-{nome-projeto}-demo
# Exemplo: portfolio-startup-tech-demo

# Clonar e inicializar
git clone https://github.com/seu-usuario/portfolio-startup-tech-demo.git
cd portfolio-startup-tech-demo
```

### Opção B: Monorepo

Se estiver usando monorepo:

```bash
cd apps/
mkdir portfolio-{nome-projeto}
cd portfolio-{nome-projeto}
```

---

## Passo 2: Inicializar Projeto Next.js

```bash
# Criar projeto Next.js
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Ou usando o template completo:
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --eslint
```

---

## Passo 3: Configurar Design System Próprio

### 3.1. Escolher Paleta de Cores

Use ferramentas como [Coolors.co](https://coolors.co) ou [Adobe Color](https://color.adobe.com) para criar paleta única.

Exemplo para projeto SaaS:
```typescript
// tailwind.config.ts
colors: {
  brand: {
    primary: '#0066FF',      // Azul principal
    secondary: '#00D4FF',    // Azul claro
    accent: '#FF6B35',       // Laranja accent
    dark: '#1A1A2E',         // Fundo escuro
    light: '#F5F7FA',        // Fundo claro
  }
}
```

### 3.2. Escolher Tipografia

[Google Fonts](https://fonts.google.com) - Escolha 2-3 fontes:
- Display (títulos)
- Body (texto)

Exemplo:
```typescript
// tailwind.config.ts
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  display: ['Poppins', 'sans-serif'],
}
```

Adicionar ao `app/layout.tsx`:
```tsx
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins' 
})
```

### 3.3. Configurar Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Suas cores aqui
      },
      fontFamily: {
        // Suas fontes aqui
      },
    },
  },
  plugins: [],
}
export default config
```

---

## Passo 4: Criar Estrutura Base

```
portfolio-{nome}/
├── app/
│   ├── layout.tsx          # Layout raiz (SEM Header/Footer Decyphra)
│   ├── page.tsx            # Home
│   ├── globals.css         # Estilos globais
│   └── not-found.tsx       # 404
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Header PRÓPRIO
│   │   └── Footer.tsx      # Footer PRÓPRIO
│   ├── ui/                 # Componentes UI próprios
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   └── sections/           # Seções da página
│       ├── Hero.tsx
│       ├── Features.tsx
│       └── ...
├── public/
│   ├── logo.svg            # Logo do projeto
│   ├── images/
│   └── favicon.ico
└── README.md
```

---

## Passo 5: Criar Componentes Base

### Header Próprio

```tsx
// components/layout/Header.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="bg-brand-dark border-b border-brand-primary/20 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={120} height={40} />
        </Link>
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

### Footer Próprio

```tsx
// components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-brand-light/60">
          <p>&copy; {new Date().getFullYear()} Nome do Projeto. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
```

### Button Próprio

```tsx
// components/ui/Button.tsx
'use client'

import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg font-semibold transition-all',
        variant === 'primary' && 'bg-brand-primary text-white hover:bg-brand-primary/90',
        variant === 'secondary' && 'bg-brand-secondary text-brand-dark hover:bg-brand-secondary/90',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3',
        size === 'lg' && 'px-8 py-4 text-lg',
        className
      )}
      {...props}
    />
  )
}
```

---

## Passo 6: Criar Página Principal

```tsx
// app/page.tsx
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
// ... outras seções

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        {/* ... outras seções */}
      </main>
      <Footer />
    </>
  )
}
```

---

## Passo 7: Adicionar Animações

Instalar Framer Motion:
```bash
npm install framer-motion
```

Exemplo de animação:
```tsx
'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-bold">Título</h1>
      </motion.div>
    </section>
  )
}
```

---

## Passo 8: Deploy

### 8.1. Vercel

1. Conectar repositório ao Vercel
2. Configurar projeto
3. Adicionar variáveis de ambiente (se necessário)
4. Deploy automático

### 8.2. Configurar Subdomínio

No Vercel:
1. Vá em Settings > Domains
2. Adicione domínio: `{nome-projeto}.decyphra.com.br`
3. Configure DNS no provedor de domínio

---

## Passo 9: Criar Estudo de Caso no Site Decyphra

1. Acessar admin do site Decyphra
2. Criar novo projeto
3. Preencher campos:
   - Título
   - Slug
   - Descrição
   - Categoria
   - Tecnologias
   - Challenges (O Desafio)
   - Solutions (A Solução)
   - Results (Resultados)
   - Featured Image
   - Screenshots (Galeria)
   - Demo URL (link para o subdomínio)
4. Status: Published
5. Salvar

---

## Checklist Final

- [ ] Repositório criado
- [ ] Projeto Next.js inicializado
- [ ] Design system configurado (cores, fontes)
- [ ] Header e Footer próprios criados
- [ ] Componentes UI básicos criados
- [ ] Página principal desenvolvida
- [ ] Responsividade testada
- [ ] Performance otimizada (Lighthouse)
- [ ] Deploy realizado
- [ ] Subdomínio configurado
- [ ] Estudo de caso criado no site Decyphra
- [ ] README documentado

---

## Recursos Úteis

- **Cores**: [Coolors.co](https://coolors.co), [Adobe Color](https://color.adobe.com)
- **Fontes**: [Google Fonts](https://fonts.google.com)
- **Ícones**: [Lucide Icons](https://lucide.dev), [Heroicons](https://heroicons.com)
- **Ilustrações**: [Undraw](https://undraw.co), [Storyset](https://storyset.com)
- **Imagens**: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
- **Animações**: [Framer Motion Docs](https://www.framer.com/motion/)

---

## Dicas

1. **Comece Simples**: Crie primeiro a estrutura básica, depois adicione complexidade
2. **Teste Mobile**: Sempre teste em dispositivos móveis primeiro
3. **Performance**: Use Next.js Image, lazy loading, code splitting
4. **SEO Básico**: Meta tags, títulos, descrições
5. **Acessibilidade**: Alt texts, contraste, estrutura semântica
6. **Documentação**: Mantenha README atualizado
7. **Versionamento**: Commits descritivos e organizados

---

## Próximos Passos

Após criar o projeto:
1. Testar em diferentes dispositivos
2. Otimizar performance
3. Adicionar mais interatividade
4. Criar estudo de caso completo
5. Compartilhar e coletar feedback
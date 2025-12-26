# 🧪 Guia de Testes - Decyphra Website

Este documento descreve a estratégia de testes do projeto e como executá-los.

---

## 📊 Estrutura de Testes

### Framework

- **Vitest**: Framework de testes rápido e moderno
- **Configuração**: `vitest.config.ts`
- **Ambiente**: Node.js

### Tipos de Testes

1. **Testes de Integração** ✅
   - APIs e endpoints
   - Integração com banco de dados
   - Serviços e lógica de negócio

2. **Testes de Funcionalidade** ⏳
   - Fluxos completos do usuário
   - Formulários e validações
   - Navegação e interações

3. **Testes de Componentes** ⏳
   - Componentes React isolados
   - Props e estados
   - Interações do usuário

---

## 🚀 Como Executar

### Testes Existentes

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test -- --watch

# Executar testes com coverage
npm run test -- --coverage
```

### Testes Específicos

```bash
# Executar um arquivo específico
npm run test tests/contact.integration.test.ts

# Executar testes que correspondem a um padrão
npm run test -- contact
```

---

## ✅ Testes Implementados

### Testes de Integração

#### 1. **Formulário de Contato** ✅

**Arquivo:** `tests/contact.integration.test.ts`

**O que testa:**
- Validação de campos obrigatórios
- Validação de formato de email
- Envio bem-sucedido do formulário
- Tratamento de erros
- Integração com API `/api/v1/contact`

**Como executar:**
```bash
npm run test tests/contact.integration.test.ts
```

#### 2. **Status da API** ✅

**Arquivo:** `tests/api-status.integration.test.ts`

**O que testa:**
- Retorno de status 200
- Estrutura correta dos dados de status
- Valores válidos (operational, degraded, down)
- Tempos de resposta numéricos
- Status de conexão do banco de dados (boolean)
- Timestamp ISO válido

**Como executar:**
```bash
npm run test tests/api-status.integration.test.ts
```

#### 3. **Listagem de Projetos** ✅

**Arquivo:** `tests/api-projects.integration.test.ts`

**O que testa:**
- Retorno de status 200
- Estrutura correta dos dados (projects, total, page, limit)
- Campos obrigatórios nos projetos (id, title, slug, description)
- Paginação (query params page e limit)
- Busca (query param search)
- Total count consistente com array de projetos

**Como executar:**
```bash
npm run test tests/api-projects.integration.test.ts
```

#### 4. **Detalhes de Projeto** ✅

**Arquivo:** `tests/api-projects-slug.integration.test.ts`

**O que testa:**
- Retorno 404 para slug inexistente
- Retorno 200 para slug válido
- Estrutura correta dos dados do projeto
- Campos obrigatórios (id, title, slug, description)
- Slug retornado corresponde ao solicitado

**Como executar:**
```bash
npm run test tests/api-projects-slug.integration.test.ts
```

#### 5. **Listagem de Serviços** ✅

**Arquivo:** `tests/api-services.integration.test.ts`

**O que testa:**
- Retorno de status 200
- Estrutura correta dos dados (services, total, page, limit)
- Campos obrigatórios nos serviços (id, title, slug, description)
- Paginação (query params page e limit)
- Busca (query param search)
- Total count consistente com array de serviços

**Como executar:**
```bash
npm run test tests/api-services.integration.test.ts
```

#### 6. **Listagem de Depoimentos** ✅

**Arquivo:** `tests/api-testimonials.integration.test.ts`

**O que testa:**
- Retorno de status 200
- Estrutura correta dos dados (testimonials, total, page, limit)
- Campos obrigatórios nos depoimentos (id, name, message)
- Paginação (query params page e limit)
- Busca (query param search)
- Total count consistente com array de depoimentos

**Como executar:**
```bash
npm run test tests/api-testimonials.integration.test.ts
```

---

## 📝 Testes Planejados

### Testes de Funcionalidade

#### 1. **Navegação entre Páginas**

- [ ] Navegação pelo menu desktop
- [ ] Navegação pelo menu mobile
- [ ] Links de rodapé funcionam
- [ ] Botões CTA redirecionam corretamente
- [ ] Transições entre páginas funcionam

#### 2. **Formulários**

- [ ] Formulário de contato valida campos
- [ ] Mensagens de erro aparecem corretamente
- [ ] Submissão bem-sucedida mostra feedback
- [ ] Campos limpos após submissão
- [ ] Prevenção de múltiplos envios

#### 3. **Componentes Interativos**

- [ ] Botões respondem a cliques
- [ ] Modais abrem e fecham
- [ ] Menus dropdown funcionam
- [ ] Cards 3D respondem a hover
- [ ] Animações de scroll funcionam

#### 4. **Responsividade**

- [ ] Layout adapta-se a mobile
- [ ] Menu mobile funciona corretamente
- [ ] Imagens carregam tamanhos apropriados
- [ ] Textos legíveis em todas as telas
- [ ] Navegação funciona em touch devices

#### 5. **Performance**

- [ ] Imagens carregam com lazy loading
- [ ] Componentes pesados não bloqueiam renderização
- [ ] Animações não causam jank
- [ ] Bundle size dentro dos limites

### Testes de API

#### 1. **Endpoints de Leitura** ✅

- [x] `GET /api/v1/status` retorna status correto - ✅ Implementado
- [x] `GET /api/v1/projects` lista projetos - ✅ Implementado
- [x] `GET /api/v1/projects/[slug]` retorna projeto específico - ✅ Implementado
- [x] `GET /api/v1/services` lista serviços - ✅ Implementado
- [x] `GET /api/v1/testimonials` lista depoimentos - ✅ Implementado
- [x] Filtros e paginação funcionam - ✅ Implementado (testado nos testes de listagem)

#### 2. **Endpoints de Escrita**

- [x] `POST /api/v1/contact` valida dados - ✅ Implementado (contact.integration.test.ts)
- [x] `POST /api/v1/contact` persiste no banco - ✅ Implementado (contact.integration.test.ts)
- [ ] `POST /api/v1/contact` envia email (quando configurado) - ⏳ Pendente (requer configuração de email)
- [x] Erros são tratados apropriadamente - ✅ Implementado (contact.integration.test.ts)

### Testes de Componentes

#### 1. **Componentes UI**

- [ ] Button renderiza corretamente
- [ ] Button responde a props (variant, size)
- [ ] Input valida e atualiza valor
- [ ] Modal abre e fecha
- [ ] Toast aparece e desaparece

#### 2. **Componentes de Layout**

- [ ] Header renderiza links corretos
- [ ] Footer renderiza informações corretas
- [ ] Container aplica tamanhos corretos
- [ ] Section aplica variantes corretas

---

## 🔧 Configuração

### Vitest Config

**Arquivo:** `vitest.config.ts`

```typescript
export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    hookTimeout: 120000,
  },
})
```

### Variáveis de Ambiente para Testes

Certifique-se de ter `.env.local` configurado com:
- `DATABASE_URL`
- `RESEND_API_KEY` (opcional)
- `EMAIL_FROM` (opcional)
- `EMAIL_TO` (opcional)

---

## 📊 Coverage (Cobertura)

Para gerar relatório de cobertura:

```bash
npm run test -- --coverage
```

**Meta de cobertura:**
- **APIs:** > 80%
- **Services:** > 80%
- **Componentes críticos:** > 70%
- **Cobertura geral:** > 75%

---

## 🧪 Exemplos de Testes

### Teste de API

```typescript
import { describe, it, expect } from 'vitest'

describe('GET /api/v1/status', () => {
  it('deve retornar status 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status')
    expect(response.status).toBe(200)
  })

  it('deve retornar dados de status', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status')
    const data = await response.json()
    expect(data).toHaveProperty('api')
    expect(data).toHaveProperty('database')
  })
})
```

### Teste de Componente

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/views/components/ui/Button'

describe('Button', () => {
  it('deve renderizar texto correto', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByText('Clique aqui')).toBeInTheDocument()
  })

  it('deve aplicar variante primary', () => {
    render(<Button variant="primary">Botão</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary-500')
  })
})
```

---

## 🔍 Ferramentas de Teste

### Para Testes E2E (Futuro)

- **Playwright**: Recomendado para testes E2E
- **Cypress**: Alternativa popular

### Para Testes de Componentes

- **@testing-library/react**: Já disponível via Vitest
- **@testing-library/jest-dom**: Para matchers adicionais

---

## 📋 Checklist de Testes

### Antes do Deploy

- [ ] Todos os testes passam (`npm run test`)
- [ ] Coverage acima da meta
- [ ] Testes de integração funcionam
- [ ] APIs retornam dados corretos
- [ ] Formulários validam corretamente

### Após Deploy

- [ ] Testar manualmente fluxos principais
- [ ] Verificar que APIs funcionam em produção
- [ ] Testar formulários em produção
- [ ] Verificar responsividade em dispositivos reais

---

## 🔗 Referências

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Next.js Testing](https://nextjs.org/docs/app/building-your-application/testing)

---

## 📊 Status Atual

**Testes Implementados:**
- ✅ Testes de integração: Formulário de contato
- ✅ Testes de integração: Status da API (`/api/v1/status`)
- ✅ Testes de integração: Projetos (`/api/v1/projects` e `/api/v1/projects/[slug]`)
- ✅ Testes de integração: Serviços (`/api/v1/services`)
- ✅ Testes de integração: Depoimentos (`/api/v1/testimonials`)

**Testes Pendentes:**
- ⏳ Testes de funcionalidade (navegação, componentes)
- ⏳ Testes de componentes React
- ⏳ Testes E2E (futuro)

---

**Última atualização:** 26/12/2025

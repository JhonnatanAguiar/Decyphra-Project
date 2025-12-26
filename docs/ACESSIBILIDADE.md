# ♿ Guia de Acessibilidade - Decyphra Website

Este documento descreve as práticas de acessibilidade implementadas no site e como manter a conformidade.

---

## 📊 Melhorias Implementadas

### 1. **Navegação por Teclado** ✅

- **Skip to Main Content**: Link oculto visível no foco para pular navegação
- **Focus States**: Todos os elementos interativos têm estados de foco visíveis
- **Menu Mobile**: Suporte completo para navegação por teclado
- **ARIA Controls**: Menus expansíveis com `aria-controls` e `aria-expanded`

**Localização:**
- Skip link: `src/views/components/layout/Header.tsx`
- ID do conteúdo principal: `app/(routes)/layout.tsx` (`id="main-content"`)

### 2. **ARIA Labels e Roles** ✅

- **Botões**: Estados `aria-disabled`, `aria-busy` para carregamento
- **Menus**: `aria-expanded`, `aria-controls`, `aria-labelledby`
- **Notificações**: `role="alert"` em toasts
- **Loading States**: `role="status"`, `aria-label="Carregando"`
- **Modais**: `aria-label` em botões de fechar
- **Ícones Decorativos**: `aria-hidden="true"` quando apropriado

**Componentes com ARIA:**
- `src/views/components/ui/Button.tsx`
- `src/views/components/ui/Modal.tsx`
- `src/views/components/ui/Toast.tsx`
- `src/views/components/ui/LoadingSpinner.tsx`
- `src/views/components/layout/Header.tsx`
- `src/views/components/layout/Footer.tsx`

### 3. **Alt Texts em Imagens** ✅

Todas as imagens têm `alt` descritivo:
- Imagens de projetos: `alt={project.title}`
- Avatares: `alt={testimonial.name}`
- Logos de plataformas: `alt={`${platform.name} logo`}`
- Imagens decorativas: `alt` descritivo

**Localização:** Componentes que usam `next/image`

### 4. **Estados de Foco Visíveis** ✅

- **Ring de Foco**: `focus:ring-2` com cor primária em todos os elementos interativos
- **Offset**: `focus:ring-offset-2` para melhor visibilidade
- **Botões**: Focus ring sempre visível (não removido)
- **Links**: Focus ring implementado

**Padrão:**
```tsx
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950"
```

### 5. **Contraste de Cores** ✅

- **Design System**: Cores seguem WCAG AA mínimo
- **Texto sobre Fundo Escuro**: `text-light-50` (#E6F0F3) sobre `bg-dark-950` (#01080E)
- **Texto sobre Fundo Claro**: `text-dark-950` sobre `bg-primary-500` (#00FF88)
- **Ratios Verificados**: Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande

**Cores Principais:**
- Verde Neon: `#00FF88` (primary-500)
- Texto Claro: `#E6F0F3` (light-50)
- Fundo Escuro: `#01080E` (dark-950)

### 6. **Estrutura Semântica** ✅

- **Landmarks**: `<header>`, `<main>`, `<footer>`, `<nav>`
- **Headings**: Hierarquia correta (h1 → h2 → h3)
- **Listas**: Uso correto de `<ul>`, `<ol>` quando apropriado
- **Botões vs Links**: Distinção semântica correta

---

## 🔍 Checklist de Acessibilidade

### Páginas Novas

- [ ] Verificar que todas as imagens têm `alt` descritivo
- [ ] Garantir que botões têm texto descritivo ou `aria-label`
- [ ] Verificar que links têm `href` válido
- [ ] Testar navegação por teclado (Tab, Enter, Esc)
- [ ] Verificar que elementos interativos têm focus states visíveis
- [ ] Garantir hierarquia correta de headings (h1 → h2 → h3)
- [ ] Testar com screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verificar contraste de cores (mínimo 4.5:1)

### Componentes Novos

- [ ] Adicionar `aria-label` em botões sem texto
- [ ] Adicionar `aria-expanded` em menus expansíveis
- [ ] Adicionar `aria-controls` quando apropriado
- [ ] Adicionar `role` quando necessário (alert, status, etc.)
- [ ] Garantir focus states visíveis
- [ ] Testar com navegação por teclado

### Formulários

- [ ] Associar `label` com `htmlFor` ao `id` do input
- [ ] Adicionar mensagens de erro com `aria-describedby`
- [ ] Marcar campos obrigatórios com `aria-required` ou `required`
- [ ] Adicionar feedback visual e textual para erros
- [ ] Garantir que validação funciona sem JavaScript

---

## 🧪 Ferramentas de Teste

### Screen Readers

1. **NVDA** (Windows, grátis)
   - Download: https://www.nvaccess.org/
   - Uso: Testar navegação e leitura de conteúdo

2. **JAWS** (Windows, pago)
   - Uso: Testar compatibilidade com leitores comerciais

3. **VoiceOver** (macOS/iOS, built-in)
   - Ativar: Cmd + F5
   - Uso: Testar experiência em dispositivos Apple

### Ferramentas Online

1. **WAVE** (Web Accessibility Evaluation Tool)
   - URL: https://wave.webaim.org/
   - Uso: Avaliação automática de acessibilidade

2. **axe DevTools** (Extensão Chrome/Firefox)
   - Uso: Auditoria direto no navegador

3. **Lighthouse** (Chrome DevTools)
   - Uso: Auditoria de acessibilidade incluída
   - Executar: `npm run lighthouse`

### Verificação de Contraste

1. **WebAIM Contrast Checker**
   - URL: https://webaim.org/resources/contrastchecker/
   - Uso: Verificar ratios de contraste

2. **Colour Contrast Analyser**
   - Download: https://www.tpgi.com/color-contrast-checker/
   - Uso: Ferramenta desktop para verificação

---

## 📝 Padrões de Código

### Botões

```tsx
// ✅ Bom: Texto descritivo
<Button>Abrir modal</Button>

// ✅ Bom: ARIA label quando necessário
<Button aria-label="Fechar menu">
  <XIcon aria-hidden="true" />
</Button>

// ✅ Bom: Estados acessíveis
<Button 
  disabled={isLoading}
  aria-disabled={isLoading}
  aria-busy={isLoading}
>
  {isLoading ? 'Carregando...' : 'Enviar'}
</Button>
```

### Links

```tsx
// ✅ Bom: Texto descritivo
<Link href="/servicos">Ver todos os serviços</Link>

// ❌ Evitar: "Clique aqui"
<Link href="/servicos">Clique aqui</Link>
```

### Imagens

```tsx
// ✅ Bom: Alt descritivo
<Image src={project.image} alt={project.title} />

// ✅ Bom: Decorative image
<Image src={decorative} alt="" role="presentation" />

// ❌ Evitar: Alt vazio sem motivo
<Image src={important} alt="" />
```

### Formulários

```tsx
// ✅ Bom: Label associado
<label htmlFor="email">Email</label>
<Input id="email" type="email" required />

// ✅ Bom: Erro acessível
<Input 
  id="email" 
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <span id="email-error" role="alert">
    Email inválido
  </span>
)}
```

---

## 🎯 Conformidade

### WCAG 2.1 Níveis

- **Nível A**: ✅ Conformidade básica
- **Nível AA**: ✅ Conformidade padrão (meta)
- **Nível AAA**: ⏳ Parcial (algumas melhorias)

### Critérios Principais

- ✅ **1.1.1** Texto alternativo não-texto
- ✅ **1.3.1** Informação e relações
- ✅ **1.4.3** Contraste (mínimo)
- ✅ **2.1.1** Teclado
- ✅ **2.1.2** Sem armadilha de teclado
- ✅ **2.4.1** Mecanismos de bypass
- ✅ **2.4.2** Títulos de página
- ✅ **2.4.3** Ordem de foco
- ✅ **2.4.4** Propósito do link
- ✅ **3.2.1** Ao focar
- ✅ **4.1.2** Nome, função, valor

---

## 🔗 Referências

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

## 📊 Status Atual

**Acessibilidade Geral:** ✅ **Boa** (WCAG AA)

### Áreas Fortes
- ✅ Navegação por teclado
- ✅ ARIA labels e roles
- ✅ Estados de foco
- ✅ Estrutura semântica
- ✅ Alt texts

### Áreas para Melhoria
- ✅ Testes automatizados implementados (`npm run a11y:test`)
- ⏳ Testes regulares com screen readers (guia disponível)
- ⏳ Validação automática em CI/CD (futuro)

---

## 🧪 Testes de Acessibilidade

Veja o guia completo em [`docs/A11Y-TESTES.md`](./A11Y-TESTES.md) para:
- Testes automatizados (Lighthouse, Pa11y, axe-core)
- Checklist de testes manuais com screen readers
- Comandos do NVDA e VoiceOver
- Template de relatório de testes

**Executar testes:**
```bash
npm run a11y:test      # Testes automatizados com Pa11y
npm run lighthouse     # Lighthouse (inclui acessibilidade)
npm run a11y:axe       # Testes com axe-core (opcional)
```

---

**Última atualização:** 19/12/2025

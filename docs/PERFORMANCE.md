# 🚀 Guia de Performance - Decyphra Website

Este documento descreve as otimizações de performance implementadas e como usar as ferramentas de análise.

---

## 📊 Otimizações Implementadas

### 1. **Otimização de Fontes** ✅

- **Fonte Inter via `next/font/google`**: Otimização automática com subsetting e self-hosting
- **Display Swap**: Evita FOIT (Flash of Invisible Text)
- **Preload**: Pré-carregamento da fonte para melhor performance inicial

**Localização:** `app/layout.tsx`

```typescript
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Evita FOIT
  preload: true, // Preload da fonte
})
```

### 2. **Otimização de Imagens** ✅

- **Formatos Modernos**: AVIF (prioritário) e WebP como fallback
- **Lazy Loading**: Habilitado por padrão no componente `Image` do Next.js
- **Responsive Images**: Tamanhos otimizados para diferentes dispositivos
- **Cache**: TTL de 60 segundos para imagens otimizadas
- **Segurança SVG**: CSP configurado para SVGs

**Localização:** `next.config.js`

### 3. **Otimização de Bundle** ✅

- **Tree Shaking**: Automático via Next.js 14
- **Code Splitting**: Automático por rota
- **Package Imports Otimizados**: `framer-motion`, `lucide-react`, `gsap`
- **Console Removal**: Remove `console.log` em produção (exceto `error` e `warn`)

**Localização:** `next.config.js`

### 4. **SEO e Metadata** ✅

- **Metadata Centralizada**: Todas as páginas com metadata otimizada
- **Schema.org**: Dados estruturados para melhor indexação
- **Sitemap.xml**: Dinâmico com todas as rotas
- **Robots.txt**: Configurado para indexação otimizada

---

## 🔧 Ferramentas de Análise

### Lighthouse Audit

Executa uma auditoria completa de performance, acessibilidade, best practices e SEO.

#### Pré-requisitos

```bash
# Opção 1: Instalar globalmente (opcional)
npm install -g lighthouse

# Opção 2: Usar via npx (recomendado, sem instalação)
# Não requer instalação
```

#### Uso

```bash
# 1. Inicie o servidor de desenvolvimento
npm run dev

# 2. Em outro terminal, execute o Lighthouse audit
npm run lighthouse

# 3. Ou especifique uma URL customizada
npm run lighthouse http://localhost:3000/servicos
```

#### Output

- Relatório HTML salvo em `.lighthouse/lighthouse-report-[timestamp].html`
- O relatório será aberto automaticamente no navegador
- Analisa:
  - ⚡ **Performance**: Core Web Vitals (LCP, FID, CLS)
  - ♿ **Acessibilidade**: ARIA labels, contraste, navegação por teclado
  - ✅ **Best Practices**: HTTPS, console errors, segurança
  - 🔍 **SEO**: Meta tags, structured data, sitemap

### Bundle Analysis

Analisa o tamanho dos bundles JavaScript e identifica oportunidades de otimização.

#### Pré-requisitos

```bash
# Instalar dependência (opcional, mas recomendado para análise detalhada)
npm install --save-dev webpack-bundle-analyzer
```

**Nota:** O script está configurado. Se a dependência não estiver instalada, um aviso será exibido mas o build continuará normalmente.

#### Uso

```bash
# Executar análise de bundle
npm run analyze

# Isso irá:
# 1. Fazer build da aplicação em modo análise
# 2. Abrir automaticamente o relatório de bundle
# 3. Gerar relatórios em:
#    - .next/analyze/client.html (cliente)
#    - .next/analyze/server.html (servidor)
```

#### Interpretação

- **Tamanhos grandes**: Considere code splitting ou lazy loading
- **Duplicações**: Identifique dependências duplicadas
- **Oportunidades**: Componentes pesados podem usar dynamic imports

---

## 📈 Core Web Vitals

### Métricas Importantes

1. **LCP (Largest Contentful Paint)**
   - **Meta:** < 2.5s
   - **Otimizações:** Imagens otimizadas, fontes com display swap, CSS crítico

2. **FID (First Input Delay)**
   - **Meta:** < 100ms
   - **Otimizações:** JavaScript otimizado, code splitting, lazy loading

3. **CLS (Cumulative Layout Shift)**
   - **Meta:** < 0.1
   - **Otimizações:** Dimensões explícitas em imagens, fontes otimizadas

### Como Medir

```bash
# Via Lighthouse (incluído no audit)
npm run lighthouse

# Via Chrome DevTools
# 1. Abra DevTools (F12)
# 2. Vá para a aba "Performance"
# 3. Clique em "Record" e recarregue a página
# 4. Analise as métricas no relatório

# Via PageSpeed Insights
# Acesse: https://pagespeed.web.dev/
# Insira a URL do site e analise
```

---

## 🎯 Próximas Otimizações

### Em Progresso

- [ ] Análise inicial de Lighthouse audit
- [ ] Otimização baseada nos resultados do audit
- [ ] Implementação de lazy loading para componentes pesados
- [ ] Otimização adicional de imagens (compressão, srcset)

### Planejadas

- [ ] Service Worker para cache offline (PWA)
- [ ] Prefetch de rotas críticas
- [ ] Otimização de animações (reduzir repaints)
- [ ] Implementação de Virtual Scrolling para listas longas

---

## 📝 Checklist de Performance

### Antes do Deploy

- [ ] Executar Lighthouse audit e garantir score > 90
- [ ] Verificar Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Analisar bundle size (client < 250KB gzipped)
- [ ] Testar em dispositivos móveis (3G throttling)
- [ ] Verificar que todas as imagens estão otimizadas
- [ ] Confirmar que fontes estão com display swap
- [ ] Validar que console.log foi removido em produção

### Monitoramento Contínuo

- [ ] Lighthouse CI em pipeline de CI/CD (futuro)
- [ ] Monitoring de Core Web Vitals em produção
- [ ] Alertas para degradação de performance

---

## 🔗 Referências

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

---

**Última atualização:** 19/12/2025

# 📊 Core Web Vitals - Decyphra Website

Este documento descreve as métricas Core Web Vitals e como monitorá-las.

---

## 🎯 O que são Core Web Vitals?

Core Web Vitals são um conjunto de métricas específicas que o Google considera importantes para a experiência do usuário em uma página web. Elas são parte do algoritmo de ranking do Google.

### As 3 Métricas Principais

1. **LCP (Largest Contentful Paint)**
   - **O que mede:** Quanto tempo leva para o maior elemento de conteúdo visível carregar
   - **Meta:** < 2.5 segundos
   - **Ação se falhar:** Otimizar imagens, reduzir JavaScript bloqueante, melhorar servidor/CDN

2. **FID (First Input Delay)**
   - **O que mede:** Quanto tempo leva para a página responder à primeira interação do usuário
   - **Meta:** < 100 milissegundos
   - **Ação se falhar:** Reduzir JavaScript, usar code splitting, otimizar bundle

3. **CLS (Cumulative Layout Shift)**
   - **O que mede:** Quantidade de movimento inesperado de conteúdo durante o carregamento
   - **Meta:** < 0.1
   - **Ação se falhar:** Definir dimensões de imagens, reservar espaço para elementos dinâmicos

---

## 🔍 Como Medir

### 1. Lighthouse (Recomendado para Desenvolvimento)

```bash
# Executar Lighthouse audit
npm run lighthouse

# O relatório incluirá:
# - Performance Score (inclui Core Web Vitals)
# - Métricas individuais (LCP, FID, CLS)
# - Recomendações específicas
```

**Onde ver no relatório:**
- Aba "Performance"
- Seção "Core Web Vitals"
- Métricas individuais com status (passou/falhou)

### 2. Chrome DevTools

1. Abrir DevTools (F12)
2. Aba "Performance"
3. Gravar sessão (Record)
4. Recarregar página
5. Parar gravação
6. Verificar métricas na timeline

### 3. PageSpeed Insights (Online)

**URL:** https://pagespeed.web.dev/

1. Inserir URL do site
2. Clicar em "Analisar"
3. Ver relatório completo com Core Web Vitals
4. Receber recomendações específicas

**Vantagens:**
- Testa com dados reais de usuários (Field Data)
- Compara com dados de laboratório (Lab Data)
- Recomendações específicas e acionáveis

### 4. Chrome User Experience Report (CrUX)

**URL:** https://developers.google.com/web/tools/chrome-user-experience-report

- Dados agregados de usuários reais do Chrome
- Requer tráfego suficiente (milhares de visitantes)
- Mais preciso que testes de laboratório

---

## 📈 Métricas Atuais

### Baseline (Antes das Otimizações)

Execute o Lighthouse audit inicial para estabelecer baseline:

```bash
npm run lighthouse http://localhost:3000
```

**Anotar:**
- LCP: ___ segundos
- FID: ___ milissegundos  
- CLS: ___ (score)
- Performance Score: ___ / 100

### Após Otimizações

Repetir após cada otimização para medir melhorias.

---

## ✅ Otimizações Implementadas

### Para Melhorar LCP

- ✅ **Imagens Otimizadas:**
  - Uso de `next/image` com AVIF/WebP
  - Lazy loading em imagens abaixo do fold
  - Tamanhos responsivos (deviceSizes e imageSizes)

- ✅ **Fontes Otimizadas:**
  - `next/font/google` com subsetting
  - `display: 'swap'` para evitar FOIT
  - `preload: true` para fontes críticas

- ⏳ **Pendentes:**
  - Preconnect a fontes externas (se necessário)
  - Otimizar CSS crítico inline
  - Reduzir JavaScript bloqueante

### Para Melhorar FID

- ✅ **Code Splitting:**
  - Automático no Next.js 14+
  - `optimizePackageImports` para libs grandes
  - Dynamic imports para componentes pesados

- ✅ **Bundle Otimizado:**
  - Remoção de console.log em produção
  - Tree shaking automático
  - Otimização de imports

- ⏳ **Pendentes:**
  - Reduzir tamanho inicial de JavaScript
  - Defer scripts não críticos
  - Usar service workers para cache

### Para Melhorar CLS

- ✅ **Dimensões de Imagens:**
  - Uso de `next/image` com dimensões explícitas
  - `sizes` apropriado para responsive images
  - Aspect ratio preservado

- ✅ **Fontes:**
  - `display: 'swap'` evita layout shift durante carregamento

- ⏳ **Pendentes:**
  - Reservar espaço para elementos dinâmicos
  - Evitar inserção de conteúdo acima do fold após carregamento
  - Definir dimensões explícitas para embeds/vídeos

---

## 🎯 Metas por Métrica

| Métrica | Meta | Bom | Precisa Melhorar |
|---------|------|-----|------------------|
| LCP | < 2.5s | < 2.5s | > 2.5s |
| FID | < 100ms | < 100ms | > 100ms |
| CLS | < 0.1 | < 0.1 | > 0.1 |
| Performance Score | > 90 | > 90 | < 90 |

---

## 🛠️ Ferramentas Recomendadas

### Durante Desenvolvimento

1. **Lighthouse CLI**
   ```bash
   npm run lighthouse
   ```

2. **Chrome DevTools Performance Tab**
   - Análise detalhada de renderização
   - Timeline de eventos
   - Waterfall de recursos

3. **React DevTools Profiler**
   - Análise de componentes React
   - Identificar re-renders desnecessários
   - Otimização de componentes

### Em Produção

1. **PageSpeed Insights**
   - Testes com dados reais
   - Comparação com concorrentes
   - Relatórios detalhados

2. **Google Search Console**
   - Relatório Core Web Vitals
   - Dados agregados de usuários
   - Identificação de páginas problemáticas

3. **Vercel Analytics** (se configurado)
   - Core Web Vitals em tempo real
   - Métricas por página
   - Tendências ao longo do tempo

---

## 📝 Checklist de Otimização

### Antes do Deploy

- [ ] Executar Lighthouse audit
- [ ] Verificar LCP < 2.5s
- [ ] Verificar FID < 100ms (ou TBT < 200ms no Lighthouse)
- [ ] Verificar CLS < 0.1
- [ ] Performance Score > 90
- [ ] Testar em conexão 3G (Lighthouse throttling)
- [ ] Testar em dispositivos móveis

### Após Deploy

- [ ] Verificar PageSpeed Insights
- [ ] Analisar Core Web Vitals no Google Search Console
- [ ] Monitorar métricas por 2-4 semanas
- [ ] Identificar páginas problemáticas
- [ ] Implementar melhorias baseadas em dados reais

---

## 🔧 Otimizações Avançadas (Futuro)

### LCP

- [ ] Preload de recursos críticos (`<link rel="preload">`)
- [ ] Resource Hints (preconnect, dns-prefetch)
- [ ] HTTP/2 Server Push (se aplicável)
- [ ] Otimização de fontes (self-hosted, subsetting avançado)
- [ ] CSS crítico inline
- [ ] Otimização de hero images (prioridade máxima)

### FID / TBT

- [ ] Service Worker para cache agressivo
- [ ] Lazy load de componentes não críticos
- [ ] Code splitting mais agressivo
- [ ] Redução de JavaScript de terceiros
- [ ] Web Workers para processamento pesado
- [ ] Otimização de React (memo, useMemo, useCallback)

### CLS

- [ ] Aspect ratio boxes para imagens
- [ ] Reservar espaço para anúncios (se aplicável)
- [ ] Evitar inserção dinâmica acima do fold
- [ ] Skeleton screens para loading states
- [ ] Web fonts com font-display: swap (já implementado)

---

## 📊 Monitoramento Contínuo

### Configurar Alertas

1. **Google Search Console**
   - Acessar "Core Web Vitals"
   - Configurar notificações por email

2. **Vercel Analytics** (se configurado)
   - Configurar alertas para degradação

3. **Lighthouse CI** (futuro)
   - Integrar no pipeline CI/CD
   - Bloquear deploys se métricas degradarem

### Revisão Regular

- **Semanal:** Verificar PageSpeed Insights
- **Mensal:** Analisar tendências no Search Console
- **Trimestral:** Auditoria completa e otimizações

---

## 🔗 Referências

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Scoring Guide](https://web.dev/performance-scoring/)
- [Optimize Core Web Vitals](https://web.dev/vitals-tools/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report)

---

## 📝 Histórico de Otimizações

### 19/12/2025 - Baseline Inicial

**Próximo passo:** Executar auditoria inicial do Lighthouse para estabelecer baseline das métricas Core Web Vitals.

---

**Última atualização:** 19/12/2025

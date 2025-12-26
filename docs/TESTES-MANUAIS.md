# ✅ Checklist de Testes Manuais - Decyphra Website

Este documento contém checklists de testes manuais para garantir que todas as funcionalidades do site estão funcionando corretamente.

---

## 🔄 Testes de Navegação

### Menu Desktop

- [ ] Logo clicável redireciona para Home
- [ ] Link "Home" redireciona para `/`
- [ ] Link "Serviços" abre dropdown com submenu
- [ ] Todos os serviços no submenu são clicáveis
- [ ] Link "Portfólio" redireciona para `/portfolio`
- [ ] Link "Sobre" redireciona para `/sobre`
- [ ] Link "Depoimentos" redireciona para `/depoimentos`
- [ ] Botão "Contato" redireciona para `/contato`

### Menu Mobile

- [ ] Botão hamburger abre menu mobile
- [ ] Menu mobile fecha ao clicar em um link
- [ ] Menu de serviços expande/contrai no mobile
- [ ] Todos os links funcionam no menu mobile
- [ ] Menu fecha ao clicar fora (se implementado)

### Footer

- [ ] Links do footer funcionam
- [ ] Emails são clicáveis (mailto:)
- [ ] Links de redes sociais abrem em nova aba
- [ ] Newsletter funciona (se implementado)

---

## 📄 Testes de Páginas

### Home Page (`/`)

- [ ] Hero section carrega corretamente
- [ ] Badge "Soluções Digitais Inovadoras" aparece
- [ ] Título principal renderiza
- [ ] Botões CTA funcionam
- [ ] Cards de serviços são clicáveis
- [ ] Seção de depoimentos exibe cards
- [ ] Seção de processo aparece
- [ ] Animações funcionam suavemente
- [ ] Background animado renderiza

### Página de Serviços (`/servicos`)

- [ ] Lista de serviços exibe corretamente
- [ ] Cards de serviços são clicáveis
- [ ] Links "Saiba mais" redirecionam para páginas individuais
- [ ] Seção de processo aparece
- [ ] CTAs funcionam

### Páginas Individuais de Serviços

Testar cada uma das páginas:

- [ ] `/servicos/desenvolvimento-web`
- [ ] `/servicos/seo-otimizacao`
- [ ] `/servicos/google-ad`
- [ ] `/servicos/marketing-de-conteudo`
- [ ] `/servicos/inteligencia-artificial`
- [ ] `/servicos/ecommerce-completo`
- [ ] `/servicos/consultoria-digital`

**Para cada página, verificar:**
- [ ] Hero section carrega
- [ ] Título principal aparece
- [ ] Conteúdo renderiza corretamente
- [ ] Cards/informações exibem
- [ ] CTAs funcionam
- [ ] Background animado funciona

### Portfólio (`/portfolio`)

- [ ] Grid de projetos exibe
- [ ] Cards de projetos são clicáveis (se implementado)
- [ ] Imagens carregam
- [ ] CTAs funcionam

### Sobre (`/sobre`)

- [ ] Hero section carrega
- [ ] História/Missão aparece
- [ ] Cards de abordagem exibem
- [ ] CTAs funcionam

### Depoimentos (`/depoimentos`)

- [ ] Grid de depoimentos exibe
- [ ] Cards de depoimentos renderizam
- [ ] Avatares carregam
- [ ] Estrelas aparecem
- [ ] CTAs funcionam

### Contato (`/contato`)

- [ ] Formulário aparece
- [ ] Todos os campos são editáveis
- [ ] Validação funciona
- [ ] Mensagens de erro aparecem
- [ ] Submissão funciona
- [ ] Feedback de sucesso aparece
- [ ] Informações de contato exibem
- [ ] Horários de atendimento aparecem

### Status (`/status`)

- [ ] Cards de status aparecem
- [ ] Indicadores de status funcionam
- [ ] Dados da API exibem
- [ ] Atualização automática funciona (se implementado)

---

## 📝 Testes de Formulários

### Formulário de Contato

#### Validação

- [ ] Campo nome obrigatório valida
- [ ] Campo email obrigatório valida
- [ ] Campo email valida formato
- [ ] Campo telefone opcional
- [ ] Campo empresa opcional
- [ ] Campo serviço opcional (dropdown)
- [ ] Campo mensagem obrigatório valida

#### Comportamento

- [ ] Mensagens de erro aparecem ao enviar vazio
- [ ] Mensagens de erro desaparecem ao corrigir
- [ ] Botão desabilitado durante envio
- [ ] Feedback de sucesso aparece após envio
- [ ] Formulário limpa após sucesso
- [ ] Prevenção de múltiplos envios

#### Envio

- [ ] Envio bem-sucedido com dados válidos
- [ ] Mensagem de sucesso aparece
- [ ] Email é enviado (verificar inbox)
- [ ] Dados são salvos no banco (verificar via db:studio)

---

## 🎨 Testes de UI/UX

### Animações

- [ ] Animações de scroll funcionam
- [ ] Cards 3D respondem a hover
- [ ] Botões 3D funcionam
- [ ] Transições entre páginas são suaves
- [ ] Loading states aparecem quando necessário

### Interatividade

- [ ] Hover effects funcionam
- [ ] Focus states são visíveis
- [ ] Click/tap funciona em todos os elementos
- [ ] Scroll suave funciona
- [ ] Modais abrem e fecham
- [ ] Toasts aparecem e desaparecem

### Visual

- [ ] Cores aplicadas corretamente
- [ ] Fontes carregam
- [ ] Imagens não quebram
- [ ] Layout não quebra
- [ ] Glow effects aparecem onde necessário
- [ ] Backgrounds animados funcionam

---

## 📱 Testes de Responsividade

### Mobile (< 768px)

**Dispositivos para testar:**
- iPhone SE (375px)
- iPhone 12/13 (390px)
- Android padrão (360px)

**Verificar:**
- [ ] Layout adapta corretamente
- [ ] Menu mobile funciona
- [ ] Textos são legíveis
- [ ] Botões têm tamanho adequado
- [ ] Imagens carregam tamanhos apropriados
- [ ] Formulários são usáveis
- [ ] Scroll funciona
- [ ] Touch targets têm tamanho adequado (mínimo 44x44px)

### Tablet (768px - 1024px)

**Dispositivos para testar:**
- iPad (768px)
- iPad Pro (1024px)

**Verificar:**
- [ ] Layout adapta corretamente
- [ ] Menu desktop aparece
- [ ] Grids adaptam (2 colunas, etc.)
- [ ] Espaçamentos são adequados
- [ ] Imagens não ficam muito grandes

### Desktop (> 1024px)

**Resoluções para testar:**
- 1280px (HD)
- 1920px (Full HD)
- 2560px (2K)

**Verificar:**
- [ ] Layout não fica muito largo
- [ ] Container limita largura
- [ ] Animações funcionam
- [ ] Hover effects funcionam
- [ ] Menu desktop funciona

---

## 🌐 Testes de Navegadores

Testar funcionalidades principais em:

### Chrome

- [ ] Todas as páginas carregam
- [ ] Formulários funcionam
- [ ] Animações funcionam
- [ ] JavaScript executa
- [ ] Sem erros no console

### Firefox

- [ ] Todas as páginas carregam
- [ ] Formulários funcionam
- [ ] Animações funcionam
- [ ] JavaScript executa
- [ ] Sem erros no console

### Safari

- [ ] Todas as páginas carregam
- [ ] Formulários funcionam
- [ ] Animações funcionam
- [ ] JavaScript executa
- [ ] Sem erros no console
- [ ] WebGL funciona (backgrounds)

### Edge

- [ ] Todas as páginas carregam
- [ ] Formulários funcionam
- [ ] Animações funcionam
- [ ] JavaScript executa
- [ ] Sem erros no console

---

## ⚡ Testes de Performance

### Carregamento

- [ ] Página inicial carrega em < 3s (3G throttling)
- [ ] Imagens carregam progressivamente
- [ ] Sem layout shift durante carregamento
- [ ] JavaScript não bloqueia renderização

### Interação

- [ ] Resposta a cliques é instantânea
- [ ] Scroll é suave (60fps)
- [ ] Animações não causam lag
- [ ] Formulários respondem rapidamente

### Lighthouse

- [ ] Performance Score > 90
- [ ] Accessibility Score > 90
- [ ] Best Practices Score > 90
- [ ] SEO Score > 90

---

## 🔍 Testes de Acessibilidade

### Navegação por Teclado

- [ ] Tab navega por todos os elementos
- [ ] Enter ativa links e botões
- [ ] Esc fecha modais
- [ ] Skip link funciona
- [ ] Focus states são visíveis
- [ ] Não há armadilhas de teclado

### Screen Reader

- [ ] Conteúdo é anunciado corretamente
- [ ] Links têm texto descritivo
- [ ] Imagens têm alt texts
- [ ] Headings seguem hierarquia
- [ ] Formulários são anunciados

### Contraste

- [ ] Texto sobre fundo tem contraste adequado
- [ ] Links têm contraste adequado
- [ ] Botões têm contraste adequado
- [ ] Ícones têm contraste adequado

---

## 📊 Testes de API

### Status

- [ ] `GET /api/v1/status` retorna 200
- [ ] Resposta contém dados esperados
- [ ] Status é atualizado corretamente

### Projetos

- [ ] `GET /api/v1/projects` retorna 200
- [ ] Lista de projetos aparece
- [ ] Filtros funcionam (se implementados)
- [ ] Paginação funciona (se implementada)
- [ ] `GET /api/v1/projects/[slug]` retorna projeto específico

### Serviços

- [ ] `GET /api/v1/services` retorna 200
- [ ] Lista de serviços aparece
- [ ] Dados são corretos

### Depoimentos

- [ ] `GET /api/v1/testimonials` retorna 200
- [ ] Lista de depoimentos aparece
- [ ] Dados são corretos

### Contato

- [ ] `POST /api/v1/contact` aceita dados válidos
- [ ] Retorna 200 com sucesso
- [ ] Valida campos obrigatórios
- [ ] Retorna erro 400 para dados inválidos
- [ ] Persiste no banco de dados
- [ ] Envia email (se configurado)

---

## 🐛 Testes de Erros

### Páginas Não Encontradas

- [ ] 404 page aparece para rotas inválidas
- [ ] 404 page tem link de volta para home
- [ ] 404 page tem design consistente

### Erros de API

- [ ] Erros são tratados graciosamente
- [ ] Mensagens de erro são amigáveis
- [ ] Usuário não vê detalhes técnicos
- [ ] Logs são gerados no servidor

### Offline

- [ ] Comportamento quando offline (se implementado)
- [ ] Mensagens apropriadas
- [ ] Funcionalidades críticas ainda funcionam

---

## 📋 Checklist de Pré-Deploy

Antes de fazer deploy para produção:

- [ ] Todos os testes manuais acima passaram
- [ ] Testes automatizados passam (`npm run test`)
- [ ] Build funciona (`npm run build`)
- [ ] TypeScript compila sem erros (`npm run type-check`)
- [ ] ESLint passa (`npm run lint`)
- [ ] Lighthouse audit passa (Performance > 90)
- [ ] Não há erros no console do navegador
- [ ] Todas as imagens carregam
- [ ] Todas as rotas funcionam
- [ ] Formulários funcionam
- [ ] APIs respondem corretamente

---

## 📝 Template de Relatório de Testes

```markdown
## Teste Manual - [Data]

**Testador:** [Nome]
**Ambiente:** [Chrome/Firefox/Safari/Edge] [Versão]
**Dispositivo:** [Desktop/Mobile/Tablet] [Resolução]

### Resultados

#### Navegação
- ✅ Menu desktop funciona
- ✅ Menu mobile funciona
- ⚠️ Link X não funciona

#### Formulários
- ✅ Validação funciona
- ✅ Envio funciona

#### Responsividade
- ✅ Mobile funciona
- ✅ Desktop funciona

### Problemas Encontrados

1. [Descrição do problema]
   - **Severidade:** Alta/Média/Baixa
   - **Página:** [URL]
   - **Passos para reproduzir:** [Instruções]

### Notas

[Observações adicionais]
```

---

**Última atualização:** 19/12/2025

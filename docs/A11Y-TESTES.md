# 🧪 Guia de Testes de Acessibilidade

Este documento descreve como executar testes de acessibilidade no site, tanto automatizados quanto manuais.

---

## 🤖 Testes Automatizados

### 1. Lighthouse Audit (Recomendado)

O Lighthouse inclui uma auditoria completa de acessibilidade.

```bash
# 1. Inicie o servidor
npm run dev

# 2. Execute o Lighthouse audit
npm run lighthouse

# Ou especifique uma URL customizada
npm run lighthouse http://localhost:3000/servicos
```

**O que testa:**
- ✅ ARIA labels e roles
- ✅ Contraste de cores
- ✅ Nomes de elementos acessíveis
- ✅ Hierarquia de headings
- ✅ Alt texts em imagens
- ✅ Navegação por teclado

**Output:**
- Relatório HTML em `.lighthouse/`
- Score de acessibilidade (0-100)
- Recomendações detalhadas

---

### 2. Pa11y (CLI)

Testa acessibilidade seguindo padrões WCAG2AA.

```bash
# 1. Inicie o servidor
npm run dev

# 2. Execute testes automatizados
npm run a11y:test

# Ou especifique uma URL customizada
npm run a11y:test http://localhost:3000
```

**O que testa:**
- ✅ Conformidade WCAG2AA
- ✅ Múltiplas páginas automaticamente
- ✅ Relatórios JSON e HTML

**Output:**
- Relatórios em `.a11y-reports/`
- Resumo JSON com todas as páginas
- Relatórios HTML individuais por página

**Páginas testadas:**
- Home
- Serviços
- Portfólio
- Sobre
- Depoimentos
- Contato
- Desenvolvimento Web

---

### 3. axe-core (Opcional)

Teste usando axe-core via Puppeteer.

```bash
# 1. Instalar dependências (apenas uma vez)
npm install --save-dev @axe-core/cli puppeteer

# 2. Inicie o servidor
npm run dev

# 3. Execute o teste
npm run a11y:axe
```

**O que testa:**
- ✅ Violações WCAG2A e WCAG2AA
- ✅ Impacto de cada violação
- ✅ Elementos específicos afetados

**Output:**
- Relatório JSON em `.a11y-reports/`
- Detalhes de cada violação encontrada

---

## 👤 Testes Manuais com Screen Readers

### Preparação

1. **Instalar Screen Reader:**
   - **NVDA** (Windows, grátis): https://www.nvaccess.org/
   - **JAWS** (Windows, pago): Teste de compatibilidade comercial
   - **VoiceOver** (macOS/iOS, built-in): Cmd + F5

2. **Iniciar o servidor:**
   ```bash
   npm run dev
   ```

3. **Abrir o site no navegador:**
   - Chrome ou Firefox recomendados
   - Desabilitar extensões que podem interferir

---

### Checklist de Testes Manuais

#### 1. Navegação Geral

- [ ] **Skip Link**
  - Pressionar Tab na página inicial
  - Verificar que o link "Pular para o conteúdo principal" aparece
  - Pressionar Enter
  - Verificar que o foco vai para o conteúdo principal

- [ ] **Navegação por Teclado**
  - Navegar toda a página apenas com Tab
  - Verificar que todos os elementos interativos são focáveis
  - Verificar que a ordem de foco é lógica
  - Verificar que não há "armadilhas de teclado"

- [ ] **Menu de Navegação**
  - Navegar pelos links do menu
  - Abrir menu mobile com Enter
  - Navegar pelos itens do menu mobile
  - Fechar menu com Esc ou clicando fora

#### 2. Conteúdo

- [ ] **Headings**
  - Navegar pelos headings (H, Shift+H no NVDA)
  - Verificar que a hierarquia está correta (h1 → h2 → h3)
  - Verificar que os headings são descritivos

- [ ] **Links**
  - Navegar pelos links (K, Shift+K no NVDA)
  - Verificar que os links têm texto descritivo
  - Verificar que links não dizem apenas "clique aqui" ou "leia mais"

- [ ] **Imagens**
  - Navegar pelas imagens (G, Shift+G no NVDA)
  - Verificar que todas têm alt text descritivo
  - Verificar que imagens decorativas têm alt vazio ou `aria-hidden="true"`

- [ ] **Listas**
  - Verificar que listas são anunciadas corretamente
  - Verificar contagem de itens nas listas

#### 3. Formulários

- [ ] **Campos de Input**
  - Navegar pelos campos do formulário de contato
  - Verificar que cada campo tem label associado
  - Verificar que campos obrigatórios são anunciados
  - Preencher formulário apenas com teclado
  - Verificar mensagens de erro são anunciadas

- [ ] **Botões**
  - Verificar que botões têm texto descritivo
  - Verificar que botões de loading são anunciados corretamente
  - Verificar que botões desabilitados são anunciados

#### 4. Componentes Interativos

- [ ] **Modais**
  - Abrir modal
  - Verificar que foco vai para dentro do modal
  - Verificar que conteúdo atrás do modal é anunciado como bloqueado
  - Fechar modal com Esc
  - Verificar que foco volta para elemento que abriu o modal

- [ ] **Toasts/Notificações**
  - Disparar uma notificação
  - Verificar que é anunciada como alerta
  - Verificar que o conteúdo é lido corretamente

- [ ] **Menus Dropdown**
  - Abrir menu de serviços
  - Navegar pelos itens
  - Verificar que estado "aberto" é anunciado
  - Fechar menu
  - Verificar que estado "fechado" é anunciado

#### 5. Páginas Específicas

- [ ] **Home Page**
  - Verificar que h1 principal é anunciado
  - Verificar navegação pelos cards de serviços
  - Verificar CTAs são acessíveis

- [ ] **Página de Serviços**
  - Verificar navegação pelos cards
  - Verificar links "Saiba mais" são descritivos
  - Verificar imagens têm alt apropriado

- [ ] **Página de Contato**
  - Testar formulário completo
  - Verificar validações são anunciadas
  - Verificar mensagem de sucesso/erro

---

## 📊 Comandos do Screen Reader

### NVDA (Windows)

| Comando | Ação |
|---------|------|
| Tab | Próximo elemento |
| Shift+Tab | Elemento anterior |
| Enter | Ativar link/botão |
| H | Próximo heading |
| Shift+H | Heading anterior |
| K | Próximo link |
| Shift+K | Link anterior |
| G | Próxima imagem |
| Shift+G | Imagem anterior |
| F | Próximo formulário |
| B | Próximo botão |
| L | Próxima lista |
| Insert+Q | Repetir último anúncio |
| Insert+Tab | Ir para próximo landmark |
| Esc | Fechar menu/modal |

### VoiceOver (macOS)

| Comando | Ação |
|---------|------|
| Cmd+F5 | Ativar/desativar VoiceOver |
| Ctrl+Option+→ | Próximo elemento |
| Ctrl+Option+← | Elemento anterior |
| Ctrl+Option+Space | Ativar elemento |
| Ctrl+Option+H | Próximo heading |
| Ctrl+Option+Shift+H | Heading anterior |
| Ctrl+Option+L | Próximo link |
| Ctrl+Option+G | Próxima imagem |
| Ctrl+Option+J | Próximo formulário |
| Ctrl+Option+B | Próximo botão |
| Ctrl+Option+X | Ir para próximo landmark |

---

## 🔍 Ferramentas de Teste Adicionais

### Extensões do Navegador

1. **axe DevTools** (Chrome/Firefox)
   - URL: https://www.deque.com/axe/devtools/
   - Uso: Auditoria rápida diretamente no navegador
   - Ativação: F12 → Aba "axe DevTools"

2. **WAVE** (Chrome/Firefox)
   - URL: https://wave.webaim.org/extension/
   - Uso: Visualização de elementos de acessibilidade na página

3. **Lighthouse** (Chrome DevTools built-in)
   - Ativação: F12 → Aba "Lighthouse" → Marcar "Accessibility"

### Ferramentas Online

1. **WAVE Web Accessibility Evaluator**
   - URL: https://wave.webaim.org/
   - Uso: Insira a URL e receba um relatório visual

2. **ASLINT**
   - URL: https://aslint.org/
   - Uso: Análise de HTML/CSS para problemas de acessibilidade

---

## 📝 Relatório de Testes

Após executar os testes, documente:

1. **Data do teste:**
2. **Screen reader usado:** (NVDA, JAWS, VoiceOver, etc.)
3. **Navegador:** (Chrome, Firefox, Safari, etc.)
4. **Versão:**
5. **Problemas encontrados:**
   - Descrição do problema
   - Página onde ocorreu
   - Severidade (Crítica, Alta, Média, Baixa)
   - Screenshot ou descrição detalhada
6. **Status:** (✅ Passou, ⚠️ Problemas encontrados, ❌ Falhou)

**Template:**

```markdown
## Teste de Acessibilidade - [Data]

**Configuração:**
- Screen Reader: NVDA 2023.1
- Navegador: Chrome 120
- Sistema: Windows 11

**Resultados:**

### Home Page
- [✅] Navegação por teclado funciona corretamente
- [✅] Skip link funciona
- [⚠️] Card de serviço X: falta aria-label no ícone

### Página de Contato
- [✅] Formulário acessível
- [✅] Labels associados corretamente
- [✅] Mensagens de erro são anunciadas

**Problemas encontrados:**
1. [Crítica] [Página: Home] [Descrição: ...]
2. [Alta] [Página: Serviços] [Descrição: ...]
```

---

## ✅ Critérios de Sucesso

Um teste é considerado bem-sucedido se:

- ✅ Todas as páginas são navegáveis apenas com teclado
- ✅ Skip link funciona corretamente
- ✅ Todos os elementos interativos são anunciados
- ✅ Formulários são preenchíveis e validáveis
- ✅ Imagens têm alt texts apropriados
- ✅ Headings seguem hierarquia correta
- ✅ Links são descritivos
- ✅ Nenhum erro crítico de acessibilidade

---

## 🔗 Referências

- [NVDA User Guide](https://www.nvaccess.org/about-nvda/)
- [VoiceOver Guide](https://support.apple.com/guide/voiceover/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)

---

**Última atualização:** 19/12/2025

# 📊 Guia de Monitoramento - Decyphra Website

Guia completo sobre ferramentas e configurações de monitoramento do site.

---

## 🎯 Ferramentas de Monitoramento

### 1. Vercel Speed Insights ✅

**Status:** Configurado e ativo

**O que monitora:**
- Performance (LCP, FID, CLS)
- Velocidade de carregamento
- Métricas Core Web Vitals

**Acesso:**
- Dashboard Vercel → Projeto → Analytics
- Automático, sem configuração adicional

**Mais informações:** [Vercel Speed Insights](https://vercel.com/docs/analytics/speed-insights)

---

### 2. Google Analytics 4 (GA4) ✅

**Status:** Configurado e ativo

**O que monitora:**
- Visitas e usuários
- Páginas mais visitadas
- Eventos customizados
- Conversões

**Configuração:**
- ID: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Componente: `src/views/components/analytics/GoogleAnalytics.tsx`
- Utilitários: `src/lib/utils/analytics.ts`

**Acesso:**
- [analytics.google.com](https://analytics.google.com)

**Eventos Customizados:**
```typescript
import { trackButtonClick, trackFormSubmit } from '@/lib/utils/analytics'

// Track de clique
trackButtonClick('CTA Principal', 'hero-section')

// Track de formulário
trackFormSubmit('contact', true)
```

---

### 3. Sentry (Error Tracking) ✅

**Status:** Configurado (requer DSN para ativar)

**O que monitora:**
- Erros JavaScript (cliente e servidor)
- Performance de transações
- Session Replay (para erros)
- Stack traces com source maps

**Configuração:**

1. **Criar conta no Sentry:**
   - Acesse [sentry.io](https://sentry.io)
   - Crie um projeto para Next.js

2. **Obter DSN:**
   - Projeto → Settings → Client Keys (DSN)
   - Copie o DSN público (para cliente)

3. **Configurar Variáveis de Ambiente:**

```env
# Cliente (público)
NEXT_PUBLIC_SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"

# Servidor (privado)
SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"

# Para upload de source maps (opcional)
SENTRY_ORG="sua-org"
SENTRY_PROJECT="decyphra-website"
SENTRY_AUTH_TOKEN="sentry_auth_token"
```

4. **Ativar:**
   - O Sentry já está configurado no código
   - Basta adicionar as variáveis de ambiente
   - Automaticamente captura erros em produção

**Arquivos de Configuração:**
- `sentry.client.config.ts` - Cliente (browser)
- `sentry.server.config.ts` - Servidor (Node.js)
- `sentry.edge.config.ts` - Edge Runtime (futuro)
- `instrumentation.ts` - Inicialização

**Acesso:**
- Dashboard: [sentry.io](https://sentry.io)
- Ver erros, performance, releases

---

### 4. Uptime Monitoring ⚠️

**Status:** Recomendado (não configurado ainda)

**O que monitora:**
- Disponibilidade do site
- Tempo de resposta
- Status HTTP
- Alertas quando site está offline

**Opções de Serviços:**

#### A) UptimeRobot (Gratuito)

**Como configurar:**
1. Acesse [uptimerobot.com](https://uptimerobot.com)
2. Crie conta gratuita
3. Adicione monitor:
   - Tipo: HTTP(s)
   - URL: `https://decyphra.com.br`
   - Intervalo: 5 minutos
   - Alertas: Email

**Limites gratuitos:**
- 50 monitores
- Intervalo mínimo: 5 minutos
- Alertas por email

#### B) Vercel Status Page (Recomendado)

**Como configurar:**
1. Acesse dashboard Vercel
2. Projeto → Settings → Status Page
3. Ative Status Page pública
4. Configure alertas

#### C) Pingdom (Pago)

**Recursos:**
- Monitoramento mais frequente
- Alertas por SMS/Telefone
- Relatórios detalhados
- Mais caro

#### D) Better Uptime

**Recursos:**
- Gratuito para 1 monitor
- Status page pública
- Alertas por múltiplos canais
- [betteruptime.com](https://betteruptime.com)

**Recomendação:**
Para começar, use **UptimeRobot** (gratuito) ou **Vercel Status Page** (integrado).

---

## 📈 Página de Status Interna

O site possui uma página de status interna em `/status` que mostra:

- ✅ Status da API
- ✅ Conexão com banco de dados
- ✅ Métricas do servidor
- ✅ Timestamp da última verificação

**Uso:**
- Monitoramento interno
- Verificação rápida de saúde do sistema
- Não substitui uptime monitoring externo

---

## 🔔 Configuração de Alertas

### Sentry

1. Acesse Sentry Dashboard
2. Settings → Alerts
3. Crie regras de alerta:
   - Erros críticos → Email/Slack
   - Taxa de erro alta → Notificação
   - Performance degradada → Alerta

### Google Analytics

1. Acesse GA4 Dashboard
2. Admin → Custom Alerts
3. Configure alertas:
   - Tráfego caiu drasticamente
   - Conversões abaixo do esperado
   - Erros aumentaram

### Uptime Monitoring

- Configurado diretamente no serviço escolhido
- Alertas automáticos quando site está offline

---

## 📊 Dashboards e Relatórios

### Vercel Dashboard
- **Performance:** Speed Insights
- **Analytics:** Web Analytics (se configurado)
- **Logs:** Runtime logs de cada deployment

### Google Analytics
- **Relatórios:** Visitas, páginas, eventos
- **Tempo real:** Usuários ativos agora
- **Explorações:** Análises customizadas

### Sentry
- **Issues:** Lista de erros
- **Performance:** Transações e endpoints lentos
- **Releases:** Versionamento de deploys

---

## 🔧 Manutenção do Monitoramento

### Semanal
- [ ] Verificar erros no Sentry
- [ ] Revisar performance no Speed Insights
- [ ] Verificar uptime no serviço escolhido

### Mensal
- [ ] Revisar tendências no Google Analytics
- [ ] Analisar erros mais frequentes no Sentry
- [ ] Otimizar performance baseado em métricas

### Trimestral
- [ ] Revisar e ajustar alertas
- [ ] Analisar padrões de uso
- [ ] Planejar melhorias baseadas em dados

---

## 🚨 Troubleshooting

### Sentry não está capturando erros

1. Verificar se `SENTRY_DSN` está configurado
2. Verificar se está em produção (desabilitado em dev por padrão)
3. Verificar logs no console do Sentry
4. Testar manualmente: `Sentry.captureException(new Error('Test'))`

### Google Analytics não está rastreando

1. Verificar `NEXT_PUBLIC_GA_MEASUREMENT_ID`
2. Verificar no DevTools se script está carregado
3. Usar Google Tag Assistant (extensão Chrome)

### Uptime não está funcionando

1. Verificar se URL está correta
2. Verificar se intervalo está configurado
3. Verificar se alertas estão configurados
4. Testar manualmente fazendo request para a URL

---

## 📚 Referências

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Google Analytics 4 Docs](https://developers.google.com/analytics/devguides/collection/ga4)
- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [UptimeRobot Docs](https://uptimerobot.com/api/)

---

**Última atualização:** 26/12/2024

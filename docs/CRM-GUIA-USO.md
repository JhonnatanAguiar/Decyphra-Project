# 📊 Guia de Uso do Mini-CRM

## ✅ Status da Implementação

**Implementação:** ✅ **100% CONCLUÍDA**

O Mini-CRM da Decyphra está **totalmente implementado** com:

- ✅ **Modelos de Banco de Dados** (Lead, Client, Interaction)
- ✅ **APIs RESTful** completas (`/api/v1/crm/*`)
- ✅ **Integração automática** com formulário de contato
- ✅ **Validação** com Zod schemas
- ✅ **TypeScript** tipado

---

## 🗄️ O que você está vendo no Prisma Studio?

O **Prisma Studio** (a interface que você está vendo) é uma ferramenta de **visualização e edição direta do banco de dados**. É útil para:

### ✅ Uso no Desenvolvimento:
- **Visualizar dados** manualmente
- **Criar/editar/deletar** registros para testes
- **Debugar** problemas no banco
- **Verificar relacionamentos** entre tabelas

### ⚠️ **NÃO é para uso diário:**
- Não é uma interface amigável para equipe comercial
- Não tem autenticação/segurança adequada
- Não tem validações de negócio visíveis
- Não é acessível para usuários não-técnicos

---

## 🔌 Como Usar o CRM Agora (via APIs)

Atualmente, o CRM pode ser usado através das **APIs REST** que foram criadas:

### 📋 Endpoints Disponíveis

#### **Leads (Prospectos)**
```
GET    /api/v1/crm/leads           # Listar leads (com filtros e paginação)
GET    /api/v1/crm/leads/[id]      # Buscar lead específico
POST   /api/v1/crm/leads           # Criar novo lead
PUT    /api/v1/crm/leads/[id]      # Atualizar lead
DELETE /api/v1/crm/leads/[id]      # Deletar lead
POST   /api/v1/crm/leads/[id]/convert  # Converter lead em cliente
```

#### **Clients (Clientes)**
```
GET    /api/v1/crm/clients         # Listar clientes (com filtros e paginação)
GET    /api/v1/crm/clients/[id]    # Buscar cliente específico
POST   /api/v1/crm/clients         # Criar novo cliente
PUT    /api/v1/crm/clients/[id]    # Atualizar cliente
DELETE /api/v1/crm/clients/[id]    # Deletar cliente
```

#### **Interactions (Interações)**
```
GET    /api/v1/crm/interactions    # Listar interações (com filtros e paginação)
GET    /api/v1/crm/interactions/[id]  # Buscar interação específica
POST   /api/v1/crm/interactions    # Criar nova interação
```

### 📝 Exemplos de Uso

#### **1. Listar Todos os Leads**
```bash
curl http://localhost:3000/api/v1/crm/leads
```

#### **2. Criar um Lead**
```bash
curl -X POST http://localhost:3000/api/v1/crm/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@empresa.com",
    "phone": "+5511999999999",
    "company": "Empresa XYZ",
    "service": "Desenvolvimento Web",
    "source": "site",
    "status": "new",
    "notes": "Interessado em e-commerce"
  }'
```

#### **3. Atualizar Status de um Lead**
```bash
curl -X PUT http://localhost:3000/api/v1/crm/leads/[id] \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "score": 75
  }'
```

#### **4. Converter Lead em Cliente**
```bash
curl -X POST http://localhost:3000/api/v1/crm/leads/[id]/convert \
  -H "Content-Type: application/json" \
  -d '{
    "cnpj": "12.345.678/0001-90",
    "segment": "E-commerce"
  }'
```

#### **5. Registrar uma Interação**
```bash
curl -X POST http://localhost:3000/api/v1/crm/interactions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "call",
    "channel": "phone",
    "subject": "Primeiro contato",
    "description": "Conversa inicial sobre o projeto",
    "leadId": "[id-do-lead]"
  }'
```

---

## 🔄 Fluxo Automático Atual

### ✅ **Formulário de Contato → Lead Automático**

Quando alguém preenche o formulário de contato no site (`/contato`):

1. **Email é enviado** (confirmação + notificação interna)
2. **ContactSubmission é criado** no banco
3. **Lead é criado AUTOMATICAMENTE** com:
   - `status: 'new'`
   - `source: 'formulario_contato'`
   - Dados do formulário
   - Link para `ContactSubmission` original

---

## 🎯 Como Usar no Dia a Dia (Quando o Painel Admin Estiver Pronto)

O **Painel Admin** (Fase 8.6) será a interface amigável para uso diário:

### Funcionalidades que o Painel terá:

1. **Dashboard**
   - Visão geral de leads, clientes e métricas
   - Gráficos e estatísticas

2. **Gerenciamento de Leads**
   - Lista de todos os leads
   - Filtros por status, origem, serviço
   - Edição rápida de status e score
   - Conversão de lead em cliente com um clique

3. **Gerenciamento de Clientes**
   - Lista de clientes ativos
   - Histórico de interações
   - Informações completas do cliente

4. **Registro de Interações**
   - Criar interações rapidamente
   - Histórico completo de contatos
   - Notas e anotações

5. **Autenticação**
   - Login seguro
   - Controle de acesso por permissões

---

## 🚀 Próximos Passos

### Fase 8.6 - Painel Admin (Pendente)

Para ter uma interface amigável para uso diário, ainda falta implementar:

- [ ] Criar rotas admin (`/admin/*`)
- [ ] Implementar autenticação e autorização
- [ ] Criar dashboard administrativo
- [ ] Criar formulários CRUD para Leads, Clients e Interactions
- [ ] Adicionar filtros e busca
- [ ] Criar interface responsiva

**Status:** ⏳ **PENDENTE** (próxima fase após concluir outras funcionalidades)

---

## 💡 Dicas de Uso Atual

### Para Desenvolvimento/Testes:
1. **Prisma Studio**: Use para visualizar e testar dados
   ```bash
   npm run db:studio
   ```

2. **APIs**: Use Postman, Insomnia ou curl para testar endpoints

3. **Integração**: Use as APIs em scripts ou ferramentas customizadas

### Para Produção:
1. As APIs já estão funcionando e podem ser consumidas por:
   - Frontend customizado
   - Ferramentas de automação
   - Integrações externas
   - O futuro Painel Admin

---

## 📊 Estrutura de Dados

### **Lead** (Prospecto)
- `name`, `email`, `phone`, `company`
- `service` (tipo de serviço de interesse)
- `source` (origem: formulário, site, referência)
- `status` (new, contacted, qualified, proposal, negotiation, won, lost, archived)
- `score` (0-100)
- `notes` (anotações)
- Relacionado com `ContactSubmission` (se vier do formulário)

### **Client** (Cliente)
- Todos os campos do Lead +
- `cnpj`, `address`, `city`, `state`, `zipCode`
- `status` (active, inactive, suspended, archived)
- `segment` (segmento do cliente)
- Pode ser convertido de um Lead

### **Interaction** (Interação)
- `type` (call, email, whatsapp, meeting, proposal, follow_up, note, other)
- `channel` (phone, email, whatsapp, video_call, in_person, system, other)
- `subject`, `description`
- Relacionado com Lead ou Client
- `metadata` (dados extras em JSON)

---

## ✅ Resumo

**O que você tem:**
- ✅ Banco de dados estruturado (modelos criados)
- ✅ APIs funcionais e testadas
- ✅ Integração automática com formulário de contato
- ✅ Ferramenta de visualização (Prisma Studio)

**O que falta para uso diário:**
- ⏳ Painel Admin com interface amigável (Fase 8.6)

**Como usar agora:**
- Via APIs (para integrações e automações)
- Via Prisma Studio (para desenvolvimento e debug)

**Status Geral:** ✅ **CRM Backend Completo** | ⏳ **Aguardando Frontend Admin**

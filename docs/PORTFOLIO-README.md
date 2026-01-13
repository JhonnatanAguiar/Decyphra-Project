# Portfólio Decyphra - Documentação Completa

Esta pasta contém toda a documentação relacionada à estratégia e criação de projetos demonstrativos do portfólio da Decyphra.

## 📚 Documentação Disponível

### 1. [PORTFOLIO-ESTRATEGIA.md](./PORTFOLIO-ESTRATEGIA.md)
**Estratégia Completa - Opção A**

Documentação principal explicando:
- Visão geral da estratégia de separação total
- Princípios fundamentais
- Estrutura de arquivos recomendada
- Checklist de criação
- Template de projeto
- Variabilidade visual
- Workflow de criação
- Boas práticas

**Quando usar:** Leia primeiro para entender completamente a estratégia antes de criar projetos.

---

### 2. [PORTFOLIO-TEMPLATE-ESTUDO-CASO.md](./PORTFOLIO-TEMPLATE-ESTUDO-CASO.md)
**Template de Estudo de Caso - Site Decyphra**

Guia completo para criar estudos de caso no site principal da Decyphra:
- Campos do banco de dados
- Estrutura da página
- Template de conteúdo
- Exemplo de componente React
- Checklist de conteúdo

**Quando usar:** Ao criar/atualizar estudos de caso no site da Decyphra para cada projeto demo.

---

### 3. [PORTFOLIO-GUIA-RAPIDO.md](./PORTFOLIO-GUIA-RAPIDO.md)
**Guia Rápido de Criação**

Passo a passo prático para criar um novo projeto demonstrativo:
- Setup inicial
- Configuração de design system
- Estrutura de arquivos
- Componentes base
- Deploy
- Checklist final

**Quando usar:** Sempre que for criar um novo projeto demo. Siga passo a passo.

---

## 🎯 Fluxo Recomendado

### Para Criar um Novo Projeto:

1. **Leia a estratégia completa**
   - `PORTFOLIO-ESTRATEGIA.md` (entender o "porquê")

2. **Siga o guia rápido**
   - `PORTFOLIO-GUIA-RAPIDO.md` (saber "como fazer")

3. **Crie o estudo de caso**
   - `PORTFOLIO-TEMPLATE-ESTUDO-CASO.md` (documentar no site Decyphra)

---

## 📋 Checklist Rápido

Antes de começar um novo projeto, tenha certeza de que:

- [ ] Leu e entendeu a estratégia (PORTFOLIO-ESTRATEGIA.md)
- [ ] Decidiu o tipo de projeto (SaaS, E-commerce, etc)
- [ ] Escolheu paleta de cores única
- [ ] Preparou identidade visual (logo, nome)
- [ ] Decidiu estrutura (repositório separado ou monorepo)
- [ ] Tem acesso ao Vercel para deploy
- [ ] Tem acesso ao domínio para configurar subdomínio

---

## 🎨 Variabilidade Visual

Cada projeto deve ser **completamente único**:

### ✅ Fazer
- Cores próprias (não usar tema Decyphra)
- Header e Footer próprios
- Logo/identidade própria
- Componentes UI únicos
- Tipografia personalizada

### ❌ Evitar
- Reutilizar componentes da Decyphra
- Usar cores/tema da Decyphra
- Criar dependências entre projetos
- Templates genéricos

---

## 🔗 Estrutura do Ecossistema

```
decyphra.com.br                    # Site principal
├── /portfolio                     # Lista de estudos de caso
└── /portfolio/{slug}              # Estudo de caso individual

{projeto}.decyphra.com.br          # Demo do projeto (subdomínio)
└── Site completo e independente
```

---

## 📦 Projetos Planejados

- [ ] Startup Tecnológica (`startup-tech.decyphra.com.br`)
- [ ] E-commerce Fashion (`fashion-store.decyphra.com.br`)
- [ ] Clínica Médica Digital (`clinica-medica.decyphra.com.br`)
- [ ] Restaurante Gourmet (`restaurante-gourmet.decyphra.com.br`)
- [ ] Consultoria Empresarial (`consultoria-empresarial.decyphra.com.br`)
- [ ] Academia Fitness (`academia-fitness.decyphra.com.br`)

---

## 🚀 Quick Start

**Criar novo projeto em 5 minutos:**

```bash
# 1. Criar repositório
git clone <repo> portfolio-novo-projeto
cd portfolio-novo-projeto

# 2. Inicializar Next.js
npx create-next-app@latest . --typescript --tailwind --app

# 3. Seguir guia rápido
# Abrir: docs/PORTFOLIO-GUIA-RAPIDO.md
```

---

## 💡 Dicas Importantes

1. **Separação Total**: Projetos não devem depender do site Decyphra
2. **Identidade Única**: Cada projeto = identidade visual completamente diferente
3. **Qualidade**: Trate cada projeto como um produto real
4. **Documentação**: Sempre documente (README no projeto)
5. **Performance**: Otimizar desde o início
6. **Mobile-First**: Sempre testar em mobile primeiro

---

## 📞 Suporte

Para dúvidas sobre a estratégia ou criação de projetos:
- Revisar documentação nesta pasta
- Consultar exemplos de projetos existentes
- Seguir checklists fornecidos

---

## 📝 Atualizações

Esta documentação deve ser atualizada sempre que:
- Nova estratégia for definida
- Processo de criação mudar
- Novos templates forem criados
- Lições aprendidas forem identificadas

**Última atualização:** 2024-12-26
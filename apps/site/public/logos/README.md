# 🎨 Logotipos da Decyphra

Este diretório contém todas as variações do logotipo da Decyphra em diferentes formatos e tamanhos para uso em marketing, redes sociais e materiais promocionais.

---

## 📁 Estrutura de Arquivos

### SVG (Formato Vetorial)

Os arquivos SVG são escaláveis e podem ser usados em qualquer tamanho sem perda de qualidade.

#### Ícones (Apenas Símbolo)

- **`icon-transparent.svg`** - Ícone com fundo transparente (100x100px)
- **`icon-dark-bg.svg`** - Ícone com fundo escuro padrão (#01080E) (100x100px)

#### Logos Completos

**Horizontal:**
- **`logo-horizontal-transparent.svg`** - Logo horizontal com fundo transparente (220x80px)
- **`logo-horizontal-dark-bg.svg`** - Logo horizontal com fundo escuro (220x80px)

**Vertical:**
- **`logo-vertical-transparent.svg`** - Logo vertical com fundo transparente (120x180px)
- **`logo-vertical-dark-bg.svg`** - Logo vertical com fundo escuro (120x180px)

### PNG (Formato Raster)

Os arquivos PNG estão na pasta `png/` e foram gerados em tamanhos específicos para diferentes usos.

> **Nota:** Para gerar os arquivos PNG, execute: `node scripts/generate-logos-png.js`
> (Requer: `npm install sharp --save-dev`)

---

## 🎨 Especificações de Cores

- **Verde Neon Principal:** `#00FF88`
- **Texto Branco:** `#E6F0F3`
- **Fundo Escuro Padrão:** `#01080E`
- **Fundo Transparente:** Transparente

### Tipografia

- **Fonte:** Inter (Bold 700)
- **Espaçamento de Letras (Horizontal):** 0.08em
- **Espaçamento de Letras (Vertical):** 0.2em

---

## 📐 Tamanhos Disponíveis

### Favicon
- **16x16px** - `favicon-16x16.png`
- **32x32px** - `favicon-32x32.png`

### Ícones Padrão
- **512x512px** - `icon-transparent-512x512.png` / `icon-dark-bg-512x512.png`
- **1024x1024px** - `icon-transparent-1024x1024.png` / `icon-dark-bg-1024x1024.png`

### Fotos de Perfil (Quadrado)
- **400x400px** - `profile-transparent-400x400.png` / `profile-dark-bg-400x400.png`
- **800x800px** - `profile-transparent-800x800.png` / `profile-dark-bg-800x800.png`

### Capas de Perfil (Retangular)
- **1200x630px** - `cover-transparent-1200x630.png` / `cover-dark-bg-1200x630.png` (Open Graph)
- **1500x500px** - `cover-transparent-1500x500.png` / `cover-dark-bg-1500x500.png` (Twitter Header)
- **2048x1024px** - `cover-transparent-2048x1024.png` / `cover-dark-bg-2048x1024.png` (LinkedIn/Capa Geral)

### Logos Horizontais
- **800x291px** - `logo-horizontal-transparent-800x291.png` / `logo-horizontal-dark-bg-800x291.png`
- **1200x436px** - `logo-horizontal-transparent-1200x436.png` / `logo-horizontal-dark-bg-1200x436.png`

### Logos Verticais
- **400x600px** - `logo-vertical-transparent-400x600.png` / `logo-vertical-dark-bg-400x600.png`
- **600x900px** - `logo-vertical-transparent-600x900.png` / `logo-vertical-dark-bg-600x900.png`

---

## 🚀 Como Usar

### 1. SVG (Recomendado para Web)

```html
<!-- Ícone transparente -->
<img src="/logos/icon-transparent.svg" alt="Decyphra" />

<!-- Logo horizontal com fundo escuro -->
<img src="/logos/logo-horizontal-dark-bg.svg" alt="Decyphra" />
```

### 2. PNG (Para Redes Sociais e Marketing)

Use os arquivos PNG da pasta `png/` para:
- Favicons do site
- Fotos de perfil em redes sociais
- Capas de perfil
- Materiais impressos
- Email marketing

### 3. Gerar Novos Tamanhos PNG

Para gerar os arquivos PNG ou criar novos tamanhos:

```bash
# Instalar dependência (apenas uma vez)
npm install sharp --save-dev

# Gerar todos os PNGs
node scripts/generate-logos-png.js
```

---

## 📱 Uso por Plataforma

### Website
- **Favicon:** `favicon-32x32.png`
- **Logo Header:** `logo-horizontal-transparent.svg` (recomendado) ou `logo-horizontal-dark-bg.svg`

### Redes Sociais

#### Facebook / LinkedIn
- **Foto de Perfil:** `profile-dark-bg-400x400.png` ou `profile-transparent-400x400.png`
- **Capa:** `cover-dark-bg-1200x630.png` ou `cover-dark-bg-2048x1024.png`

#### Twitter / X
- **Foto de Perfil:** `profile-dark-bg-400x400.png`
- **Header:** `cover-dark-bg-1500x500.png`

#### Instagram
- **Foto de Perfil:** `profile-dark-bg-400x400.png`
- **Story Highlight:** `icon-dark-bg-512x512.png`

#### YouTube
- **Ícone do Canal:** `icon-dark-bg-1024x1024.png`
- **Banner:** `cover-dark-bg-2048x1024.png`

### Materiais de Marketing
- **Apresentações:** `logo-horizontal-transparent.svg` ou `logo-horizontal-dark-bg.svg`
- **Cartões de Visita:** `logo-horizontal-transparent.svg`
- **Banners:** `logo-horizontal-dark-bg-1200x436.png`

---

## ⚠️ Diretrizes de Uso

### ✅ DO (Faça)
- Use o fundo escuro em backgrounds claros
- Use o fundo transparente em backgrounds escuros ou coloridos
- Mantenha proporções ao redimensionar
- Use SVGs sempre que possível para melhor qualidade
- Mantenha espaçamento adequado ao redor do logo (mínimo 20px)

### ❌ DON'T (Não Faça)
- Não distorça ou altere as proporções do logo
- Não altere as cores do logo
- Não rotacione o logo (exceto em animações aprovadas)
- Não adicione efeitos que alterem a identidade visual
- Não use o logo muito pequeno (mínimo recomendado: 32px de altura)

---

## 🔄 Atualizações

Para atualizar os logotipos:

1. Edite os arquivos SVG conforme necessário
2. Execute o script de geração: `node scripts/generate-logos-png.js`
3. Verifique os novos arquivos PNG gerados na pasta `png/`

---

## 📝 Notas Técnicas

- Todos os SVGs são otimizados e prontos para produção
- Os arquivos PNG são gerados com alta qualidade (sem compressão)
- As cores seguem o design system da Decyphra
- O logo foi criado seguindo as diretrizes de identidade visual do projeto

---

**Última atualização:** 18/12/2025

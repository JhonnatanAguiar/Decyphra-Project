/**
 * Script para gerar arquivos PNG dos logotipos em diferentes tamanhos
 * 
 * Requer: sharp (npm install sharp --save-dev)
 * 
 * Uso: node scripts/generate-logos-png.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const logosDir = path.join(__dirname, '..', 'public', 'logos')
const outputDir = path.join(__dirname, '..', 'public', 'logos', 'png')

// Criar diretório de saída se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Configurações de tamanhos
const sizes = {
  // Favicon
  favicon16: { width: 16, height: 16, name: 'favicon-16x16' },
  favicon32: { width: 32, height: 32, name: 'favicon-32x32' },
  
  // Ícone padrão
  icon512: { width: 512, height: 512, name: 'icon-512x512' },
  icon1024: { width: 1024, height: 1024, name: 'icon-1024x1024' },
  
  // Foto de perfil (quadrado)
  profile400: { width: 400, height: 400, name: 'profile-400x400' },
  profile800: { width: 800, height: 800, name: 'profile-800x800' },
  
  // Capa de perfil (retangular)
  cover1200x630: { width: 1200, height: 630, name: 'cover-1200x630' }, // Open Graph
  cover1500x500: { width: 1500, height: 500, name: 'cover-1500x500' }, // Twitter Header
  cover2048x1024: { width: 2048, height: 1024, name: 'cover-2048x1024' }, // LinkedIn/Capa geral
  
  // Logo horizontal
  logoHorizontal1200: { width: 1200, height: 436, name: 'logo-horizontal-1200x436' }, // Proporção mantida
  logoHorizontal800: { width: 800, height: 291, name: 'logo-horizontal-800x291' },
  
  // Logo vertical
  logoVertical600: { width: 600, height: 900, name: 'logo-vertical-600x900' }, // Proporção mantida
  logoVertical400: { width: 400, height: 600, name: 'logo-vertical-400x600' },
}

// Arquivos SVG de origem
const svgFiles = {
  icon: {
    transparent: 'icon-transparent.svg',
    darkBg: 'icon-dark-bg.svg',
  },
  logoHorizontal: {
    transparent: 'logo-horizontal-transparent.svg',
    darkBg: 'logo-horizontal-dark-bg.svg',
  },
  logoVertical: {
    transparent: 'logo-vertical-transparent.svg',
    darkBg: 'logo-vertical-dark-bg.svg',
  },
}

async function generatePNG(svgFile, outputFile, width, height, resize = true) {
  try {
    const inputPath = path.join(logosDir, svgFile)
    const outputPath = path.join(outputDir, outputFile)
    
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c36098a2-7e18-46c4-a378-0eb2465d49c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'generate-logos-png.js:67',message:'generatePNG entry',data:{svgFile,outputFile,width,height,resize},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️  Arquivo SVG não encontrado: ${svgFile}`)
      return false
    }
    
    // #region agent log
    const svgContent = fs.readFileSync(inputPath, 'utf8');
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : 'not found';
    const hasCircle = svgContent.includes('<circle');
    const hasPath = svgContent.includes('<path');
    const aspectRatio = width / height;
    fetch('http://127.0.0.1:7244/ingest/c36098a2-7e18-46c4-a378-0eb2465d49c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'generate-logos-png.js:78',message:'SVG metadata',data:{viewBox,hasCircle,hasPath,aspectRatio,svgWidth:width,svgHeight:height},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    let sharpInstance = sharp(inputPath)
    
    // #region agent log
    const metadata = await sharpInstance.metadata();
    fetch('http://127.0.0.1:7244/ingest/c36098a2-7e18-46c4-a378-0eb2465d49c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'generate-logos-png.js:86',message:'Original SVG metadata',data:{width:metadata.width,height:metadata.height,format:metadata.format,hasAlpha:metadata.hasAlpha},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    if (resize) {
      sharpInstance = sharpInstance.resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparente por padrão
      })
      
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/c36098a2-7e18-46c4-a378-0eb2465d49c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'generate-logos-png.js:93',message:'Resize config applied',data:{targetWidth:width,targetHeight:height,fit:'contain'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    }
    
    await sharpInstance.png().toFile(outputPath)
    
    // #region agent log
    const outputMetadata = await sharp(outputPath).metadata();
    fetch('http://127.0.0.1:7244/ingest/c36098a2-7e18-46c4-a378-0eb2465d49c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'generate-logos-png.js:100',message:'Output PNG metadata',data:{width:outputMetadata.width,height:outputMetadata.height,format:outputMetadata.format},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    console.log(`✅ Gerado: ${outputFile} (${width}x${height})`)
    
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c36098a2-7e18-46c4-a378-0eb2465d49c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'generate-logos-png.js:105',message:'generatePNG success',data:{outputFile},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    return true
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c36098a2-7e18-46c4-a378-0eb2465d49c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'generate-logos-png.js:110',message:'generatePNG error',data:{error:error.message,svgFile,outputFile},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    console.error(`❌ Erro ao gerar ${outputFile}:`, error.message)
    return false
  }
}

async function generateAllLogos() {
  console.log('🎨 Gerando arquivos PNG dos logotipos...\n')
  
  let successCount = 0
  let errorCount = 0
  
  // Favicons (apenas ícone transparente)
  console.log('📦 Gerando favicons...')
  for (const [key, size] of Object.entries(sizes)) {
    if (key.startsWith('favicon')) {
      const result = await generatePNG(
        svgFiles.icon.transparent,
        `${size.name}.png`,
        size.width,
        size.height
      )
      if (result) successCount++
      else errorCount++
    }
  }
  
  // Ícones padrão
  console.log('\n📦 Gerando ícones padrão...')
  for (const variant of ['transparent', 'darkBg']) {
    for (const size of [sizes.icon512, sizes.icon1024]) {
      const result = await generatePNG(
        svgFiles.icon[variant],
        `icon-${variant}-${size.name.split('-')[1]}.png`,
        size.width,
        size.height
      )
      if (result) successCount++
      else errorCount++
    }
  }
  
  // Fotos de perfil (apenas ícone)
  console.log('\n📦 Gerando fotos de perfil...')
  for (const variant of ['transparent', 'darkBg']) {
    for (const size of [sizes.profile400, sizes.profile800]) {
      const result = await generatePNG(
        svgFiles.icon[variant],
        `profile-${variant}-${size.name.split('-')[1]}.png`,
        size.width,
        size.height
      )
      if (result) successCount++
      else errorCount++
    }
  }
  
  // Capas de perfil (logo horizontal)
  console.log('\n📦 Gerando capas de perfil...')
  for (const variant of ['transparent', 'darkBg']) {
    for (const size of [sizes.cover1200x630, sizes.cover1500x500, sizes.cover2048x1024]) {
      const result = await generatePNG(
        svgFiles.logoHorizontal[variant],
        `cover-${variant}-${size.name.split('-')[1]}.png`,
        size.width,
        size.height
      )
      if (result) successCount++
      else errorCount++
    }
  }
  
  // Logos horizontais em diferentes tamanhos
  console.log('\n📦 Gerando logos horizontais...')
  for (const variant of ['transparent', 'darkBg']) {
    for (const size of [sizes.logoHorizontal800, sizes.logoHorizontal1200]) {
      const result = await generatePNG(
        svgFiles.logoHorizontal[variant],
        `logo-horizontal-${variant}-${size.name.split('-')[2]}.png`,
        size.width,
        size.height
      )
      if (result) successCount++
      else errorCount++
    }
  }
  
  // Logos verticais em diferentes tamanhos
  console.log('\n📦 Gerando logos verticais...')
  for (const variant of ['transparent', 'darkBg']) {
    for (const size of [sizes.logoVertical400, sizes.logoVertical600]) {
      const result = await generatePNG(
        svgFiles.logoVertical[variant],
        `logo-vertical-${variant}-${size.name.split('-')[2]}.png`,
        size.width,
        size.height
      )
      if (result) successCount++
      else errorCount++
    }
  }
  
  console.log(`\n✨ Processo concluído!`)
  console.log(`✅ Sucesso: ${successCount} arquivos`)
  if (errorCount > 0) {
    console.log(`❌ Erros: ${errorCount} arquivos`)
  }
  console.log(`\n📁 Arquivos salvos em: ${outputDir}`)
}

// Executar
generateAllLogos().catch(console.error)

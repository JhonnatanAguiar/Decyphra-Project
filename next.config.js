// Importar configuração do Sentry
const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilitar instrumentation para Sentry
  instrumentationHook: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
        pathname: '/logos/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // AVIF primeiro (melhor compressão)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // Cache de 1 ano para imagens otimizadas (melhora performance)
    dangerouslyAllowSVG: true, // Permitir SVG (já usado nos logos)
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'gsap'],
    // optimizeCss requer 'critters' que não está instalado
    // optimizeCss: true, // Desabilitado temporariamente - requer 'critters' package
  },
  // Compressão automática (gzip/brotli) - Next.js já faz automaticamente
  // poweredByHeader: false, // Removido - Next.js já não inclui mais este header por padrão
  reactStrictMode: true,
  // Otimizações de bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Configuração do webpack para resolver problemas com face-api.js e otimizações
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Resolver problemas com módulos do Node.js sendo importados no cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        encoding: false,
        path: false,
        crypto: false,
      }
      
      // Otimização: não incluir face-api.js no bundle principal (só carregar dinamicamente)
      config.resolve.alias = {
        ...config.resolve.alias,
        // face-api.js será carregado apenas quando necessário via dynamic import
      }
    }
    
    // Bundle Analyzer (executar com ANALYZE=true npm run build)
    // Requer: npm install --save-dev @next/bundle-analyzer
    if (process.env.ANALYZE === 'true') {
      try {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            reportFilename: isServer
              ? '../analyze/server.html'
              : './analyze/client.html',
          })
        )
      } catch (error) {
        console.warn('⚠️  webpack-bundle-analyzer não encontrado. Instale com: npm install --save-dev webpack-bundle-analyzer')
      }
    }
    
    return config
  },
  // Code splitting automático já está habilitado no Next.js 14+
  // Dynamic imports para componentes pesados
}

// Configuração do Sentry
const sentryWebpackPluginOptions = {
  // Silenciar durante build (evita poluir logs)
  silent: true,
  
  // Org e projeto do Sentry (configurar via variáveis de ambiente)
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Upload de source maps apenas em produção
  dryRun: process.env.NODE_ENV !== 'production' || !process.env.SENTRY_AUTH_TOKEN,
  
  // Configurações de source maps
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
}

// Exportar com ou sem Sentry dependendo se está configurado
module.exports = process.env.SENTRY_AUTH_TOKEN 
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig

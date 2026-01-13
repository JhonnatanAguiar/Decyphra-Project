// Importar configuração do Sentry
const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
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

// Configuração do Sentry (usando valores do wizard ou variáveis de ambiente)
const sentryConfig = {
  org: process.env.SENTRY_ORG || "decyphra",
  project: process.env.SENTRY_PROJECT || "decyphra-project",
  
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
  
  // Upload a larger set of source maps for prettier stack traces
  widenClientFileUpload: true,
  
  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers
  tunnelRoute: "/monitoring",
  
  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors
    automaticVercelMonitors: true,
    
    // Tree-shaking options for reducing bundle size
    treeshake: {
      removeDebugLogging: true,
    },
  },
}

// Exportar com Sentry configurado
module.exports = withSentryConfig(nextConfig, sentryConfig)

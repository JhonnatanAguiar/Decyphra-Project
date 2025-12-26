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
    minimumCacheTTL: 60, // Cache de 60 segundos para imagens otimizadas
    dangerouslyAllowSVG: true, // Permitir SVG (já usado nos logos)
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'gsap'],
  },
  // Otimizações de bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Configuração do webpack para resolver problemas com face-api.js
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

module.exports = nextConfig

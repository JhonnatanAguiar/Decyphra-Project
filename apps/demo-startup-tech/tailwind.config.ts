import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4F46E5', // Indigo moderno
          primarySoft: '#6366F1',
          secondary: '#06B6D4', // Ciano/teal
          accent: '#F97316', // Laranja de destaque
          dark: '#020617', // Fundo quase preto
          surface: '#020617', // Alias para fundo
          border: '#1E293B',
          muted: '#64748B',
          light: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '1.25rem',
      },
      boxShadow: {
        'brand-soft':
          '0 18px 45px rgba(15, 23, 42, 0.8), 0 0 0 1px rgba(148, 163, 184, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config


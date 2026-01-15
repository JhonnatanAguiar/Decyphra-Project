import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // As cores e fontes finais serão definidas na Fase 2 (Design System do projeto)
    },
  },
  plugins: [],
}

export default config


import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    hookTimeout: 120000,
    // Executar testes em sequência para evitar conflitos de build/servidor
    // O servidor de testes é compartilhado entre todos os testes
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true, // Usar apenas um worker para evitar conflitos de build/servidor
      },
    },
  },
})

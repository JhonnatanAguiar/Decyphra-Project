# Registro de Mudança - 17/12/2025

**Resumo:** Implementação do endpoint `POST /api/v1/contact` e correções auxiliares para resolver erros de build.

O que foi feito:

- Implementado endpoint `POST /api/v1/contact` em `app/api/v1/contact/route.ts` com validação via Zod e resposta stub (registro/log).
- Corrigido import estático de `face-api.js` para import dinâmico em `src/views/components/animations/GridScan.tsx` para evitar bundling server-side.
- Adicionada dependência `encoding` para resolver erro do `node-fetch` durante o build.
- Corrigida ordem de Hooks removendo retorno condicional em `src/views/components/ui/Card3D.tsx`.

Verificações realizadas:

- `npm install` executado para restaurar dependências
- `npm run type-check` executado (sem erros fatais)
- `npm run build` executado com sucesso

Arquivos alterados/criados:

- `app/api/v1/contact/route.ts` (novo)
- `src/lib/services/contact.service.ts` (novo)
- `src/views/components/animations/GridScan.tsx` (modificado)
- `src/views/components/ui/Card3D.tsx` (modificado)
- `package.json` / `package-lock.json` (dependência `encoding` adicionada)

Status: ✅ Concluído — build OK. Próximo passo: integrar serviço de email/persistência (Fase 5.2).
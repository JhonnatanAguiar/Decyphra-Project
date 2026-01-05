// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Performance Monitoring - 10% em produção, 100% em desenvolvimento
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Ambiente
  environment: process.env.NODE_ENV || 'development',

  // Apenas capturar erros em produção quando DSN estiver configurado
  enabled: process.env.NODE_ENV === 'production' && !!process.env.SENTRY_DSN,
});

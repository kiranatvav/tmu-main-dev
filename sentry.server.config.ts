// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn:
    process.env.SENTRY_DSN ||
    "https://35db74757b4c7e6ffc5871646b1be1a5@o4510425438814208.ingest.de.sentry.io/4510425441239120",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Only enable in production
  enabled: process.env.NODE_ENV === "production",

  // Environment tagging
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,

  // Enable logs to be sent to Sentry
  enableLogs: true,
});

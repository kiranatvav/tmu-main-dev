// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn:
    process.env.NEXT_PUBLIC_SENTRY_DSN ||
    "https://35db74757b4c7e6ffc5871646b1be1a5@o4510425438814208.ingest.de.sentry.io/4510425441239120",

  // Use tunnel route to avoid ad-blockers and CORS issues
  tunnel: "/monitoring",

  // Adjust sample rates for production
  tracesSampleRate: 1.0,

  // Capture replay sessions for debugging
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Only enable in production
  enabled: process.env.NODE_ENV === "production",

  // Environment tagging
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Ignore specific errors
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
  ],
});

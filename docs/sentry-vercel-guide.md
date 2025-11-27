# Sentry + Vercel Integration Guide

This guide explains how Sentry is configured in this project for error tracking and observability on Vercel.

## Overview

Sentry captures errors, exceptions, and performance data from both the client (browser) and server (API routes, middleware). It's configured to only run in production to avoid noise during development.

## Configuration Files

| File | Purpose |
|------|---------|
| `sentry.client.config.ts` | Browser-side error tracking + session replay |
| `sentry.server.config.ts` | Server-side (Node.js) error tracking |
| `sentry.edge.config.ts` | Edge runtime (middleware) error tracking |
| `instrumentation.ts` | Next.js instrumentation hook to load Sentry |
| `next.config.ts` | Wraps config with `withSentryConfig` for source maps |

## Environment Variables

### Required for Vercel

Add these in **Vercel Dashboard > Settings > Environment Variables**:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SENTRY_DSN` | Client-side DSN (public) | `https://xxx@xxx.ingest.sentry.io/xxx` |
| `SENTRY_DSN` | Server-side DSN | Same as above |
| `SENTRY_ORG` | Your Sentry organization slug | `the-matrix-unlocked-llc` |
| `SENTRY_PROJECT` | Your Sentry project slug | `javascript-nextjs` |
| `SENTRY_AUTH_TOKEN` | Auth token for source map uploads | `sntrys_xxx...` |

### Getting a Sentry Auth Token

1. Go to [Sentry.io](https://sentry.io) > Settings > Auth Tokens
2. Create a new token with `project:releases` and `org:read` scopes
3. Add it as `SENTRY_AUTH_TOKEN` in Vercel

## How It Works

### Error Boundaries

- `app/error.tsx` - Catches errors in route segments
- `app/global-error.tsx` - Catches errors in the root layout

Both automatically report errors to Sentry.

### Form Submission Tracking

The lead form (`components/organisms/lead-form/index.tsx`) tracks:
- Form submission failures
- localStorage errors
- Redirect timeouts
- API response parsing errors

### API Route Tracking

The leads API (`app/api/leads/route.ts`) adds:
- Breadcrumbs for debugging flow
- User context (email) for error correlation
- Error capture with tags for filtering

### Ad-Blocker Bypass

The config includes `tunnelRoute: "/monitoring"` which routes Sentry requests through your domain to avoid ad-blockers.

## Viewing Errors in Sentry

1. Go to [sentry.io](https://sentry.io) and select your project
2. **Issues** - View all captured errors grouped by type
3. **Performance** - See transaction traces and slow requests
4. **Replays** - Watch session recordings of errors (10% sample rate)

### Useful Filters

- `form:lead-form` - Errors from the lead form
- `api:leads` - Errors from the leads API
- `component:route-protection` - Auth/redirect issues

## Local Development

Sentry is **disabled** in development (`enabled: process.env.NODE_ENV === "production"`).

To test Sentry locally:
1. Temporarily change `enabled: true` in the config files
2. Run `npm run build && npm start`
3. Trigger an error and check Sentry dashboard

## Source Maps

Source maps are automatically uploaded during Vercel builds when `SENTRY_AUTH_TOKEN` is set. This gives you readable stack traces instead of minified code.

The config uses `deleteSourcemapsAfterUpload: true` to keep source maps private (not exposed to browsers).

## Troubleshooting

### Errors not appearing in Sentry

1. Check `SENTRY_DSN` is set correctly in Vercel
2. Verify you're testing in production mode (not dev)
3. Check browser console for Sentry initialization errors

### Source maps not working

1. Ensure `SENTRY_AUTH_TOKEN` is set in Vercel
2. Check build logs for "Source maps uploaded successfully"
3. Verify org/project names match your Sentry account

### Session replays not recording

- Replays only capture 10% of sessions by default
- 100% of sessions with errors are captured
- Check `replaysSessionSampleRate` in client config

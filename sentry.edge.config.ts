// sentry.edge.config.ts
import type { BrowserOptions } from "@sentry/nextjs";

export async function register() {
  if (process.env.NODE_ENV !== "production") return;

  const Sentry = await import("@sentry/nextjs");

  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    tracesSampleRate: 1,

    enableLogs: true,

    sendDefaultPii: true,
  } satisfies BrowserOptions);
}

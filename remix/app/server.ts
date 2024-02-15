import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import { z } from "zod";

export const AppEnvSchema = z.object({
  SOME_SECRET: z.string(),
  SANITY_STUDIO_PROJECT_ID: z.string(),
  SANITY_STUDIO_DATASET: z.string(),
  SANITY_STUDIO_URL: z.string(),
  SANITY_STUDIO_STEGA_ENABLED: z.boolean(),
});

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    env: z.output<typeof AppEnvSchema>;
  }
}

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    const env = AppEnvSchema.parse(context.env);
    return { env };
  },
  mode: process.env.NODE_ENV,
});
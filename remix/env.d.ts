/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />
import type { AppLoadContext as OriginalAppLoadContext } from "@remix-run/server-runtime";

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext extends OriginalAppLoadContext {
    env: {
        ENV: {
            SANITY_STUDIO_PROJECT_ID: SANITY_STUDIO_PROJECT_ID,
            SANITY_STUDIO_DATASET: SANITY_STUDIO_DATASET,
            SANITY_STUDIO_URL: SANITY_STUDIO_URL,
            SANITY_STUDIO_STEGA_ENABLED: SANITY_STUDIO_STEGA_ENABLED,
    };
  }
}
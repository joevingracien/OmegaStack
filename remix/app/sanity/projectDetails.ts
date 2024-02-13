// projectDetails.ts

declare global {
  interface Window {
    ENV: {
      SANITY_STUDIO_PROJECT_ID: string;
      SANITY_STUDIO_DATASET: string;
      SANITY_STUDIO_URL: string;
      SANITY_STUDIO_STEGA_ENABLED: string;
    };
  }
}

// This function should be called on the server-side where `context` is available.
export function initializeProjectDetails(context?: { env: typeof process.env }) {
  const {
    SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET,
    SANITY_STUDIO_URL = 'http://localhost:3333',
    SANITY_STUDIO_STEGA_ENABLED = false,
  } = context ? context.env : window.ENV;

  if (!SANITY_STUDIO_PROJECT_ID) throw new Error('Missing SANITY_STUDIO_PROJECT_ID in .env');
  if (!SANITY_STUDIO_DATASET) throw new Error('Missing SANITY_STUDIO_DATASET in .env');
  if (!SANITY_STUDIO_URL) throw new Error('Missing SANITY_STUDIO_URL in .env');
  if (typeof SANITY_STUDIO_STEGA_ENABLED === 'string' && SANITY_STUDIO_STEGA_ENABLED !== 'true') throw new Error(`Missing SANITY_STUDIO_STEGA_ENABLED in .env`);

  // Exporting as an object to be used wherever needed
  return {
    projectId: SANITY_STUDIO_PROJECT_ID,
    dataset: SANITY_STUDIO_DATASET,
    studioUrl: SANITY_STUDIO_URL,
    stegaEnabled: SANITY_STUDIO_STEGA_ENABLED === 'true',
  };
}
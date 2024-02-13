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

// Define a type for the project details to ensure type safety
type ProjectDetails = {
  projectId: string;
  dataset: string;
  studioUrl: string;
  stegaEnabled: boolean;
};

// This function is intended for server-side usage to initialize project details from the context
export function initializeProjectDetails(context?: { env: typeof process.env }): ProjectDetails {
  const {
    SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET,
    SANITY_STUDIO_URL = 'http://localhost:3333',
    SANITY_STUDIO_STEGA_ENABLED = 'false', // Default to 'false' as a string
  } = context ? context.env : {};

  if (!SANITY_STUDIO_PROJECT_ID) throw new Error('Missing SANITY_STUDIO_PROJECT_ID in .env');
  if (!SANITY_STUDIO_DATASET) throw new Error('Missing SANITY_STUDIO_DATASET in .env');
  if (!SANITY_STUDIO_URL) throw new Error('Missing SANITY_STUDIO_URL in .env');
  if (SANITY_STUDIO_STEGA_ENABLED !== 'true' && SANITY_STUDIO_STEGA_ENABLED !== 'false') throw new Error(`Invalid SANITY_STUDIO_STEGA_ENABLED value in .env`);

  return {
    projectId: SANITY_STUDIO_PROJECT_ID,
    dataset: SANITY_STUDIO_DATASET,
    studioUrl: SANITY_STUDIO_URL,
    stegaEnabled: SANITY_STUDIO_STEGA_ENABLED === 'true',
  };
}

// Client-side fallback using window.ENV or default values
export const clientSideProjectDetails: ProjectDetails = typeof window !== 'undefined' && window.ENV ? {
  projectId: window.ENV.SANITY_STUDIO_PROJECT_ID,
  dataset: window.ENV.SANITY_STUDIO_DATASET,
  studioUrl: window.ENV.SANITY_STUDIO_URL,
  stegaEnabled: window.ENV.SANITY_STUDIO_STEGA_ENABLED === 'true',
} : {
  projectId: 'default_project_id',
  dataset: 'default_dataset',
  studioUrl: 'http://localhost:3333',
  stegaEnabled: false,
};

import { json } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Suspense, lazy } from "react";

const LiveVisualEditing = lazy(() => import("./components/LiveVisualEditing"));

export const loader = ({ context }) => {
  return json({
    ENV: {
      SANITY_STUDIO_PROJECT_ID: context.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: context.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: context.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_STEGA_ENABLED: context.env.SANITY_STUDIO_STEGA_ENABLED,
    },
  });
};

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://cdn.tailwindcss.com?plugins=typography" />
      </head>
      <body className="bg-white">
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
          <Suspense>
            <LiveVisualEditing />
          </Suspense>
        ) : null}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

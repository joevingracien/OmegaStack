import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import Posts from "../components/Posts";
import { useQuery } from "../sanity/loader";
import { loadQuery } from "../sanity/loader.server";
import { POSTS_QUERY } from "../sanity/queries";
import { initializeProjectDetails } from "../sanity/projectDetails";

export const loader = async () => {
  const { projectId, dataset } = initializeProjectDetails(context);

  const initial = await loadQuery<SanityDocument[]>(POSTS_QUERY, { projectId, dataset });

  return { initial, query: POSTS_QUERY, params: {} };
};

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>();
  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial,
  });

  // `data` should contain the initial data from the loader
  // `loading` will only be true when Visual Editing is enabled
  if (loading && !data) {
    return <div>Loading...</div>;
  }

  return data ? <Posts posts={data} /> : null;
}
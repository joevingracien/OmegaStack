 /* import { Scene } from "../components/Scene.client";
import { ClientOnly } from "remix-utils/client-only"; */
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";

import Posts from "../components/Posts";
import { useQuery } from "../sanity/loader";
import { loadQuery } from "../sanity/loader.server";
import { POSTS_QUERY } from "../sanity/queries";


export const loader = async () => {
  const initial = await loadQuery<SanityDocument[]>(POSTS_QUERY);

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
    return <div>Loadingggg...</div>;
  }

  return data ? <Posts posts={data} /> : null;
}

/*
export function Test() {
  return (
    <>
      <ClientOnly fallback={<p>loading...</p>}>{() => <Scene />}</ClientOnly>
      <p className="flex items-baseline gap-8 bg-blue-300 p-8 ">come on deps</p>
      <h1 className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3 ">
        hello world
      </h1>
    </>
  );
} */


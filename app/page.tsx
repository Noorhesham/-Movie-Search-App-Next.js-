import { Suspense } from "react";

import { MovieGridSkeleton } from "./components/MovieSkeleton";
import { SearchInput } from "./components/SearchInput";
import type { Metadata } from "next";
import { SearchPageProps } from "./types";
import MovieResults from "./components/MovieResults";

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const awaitedSearchParams = await searchParams;
  const query = awaitedSearchParams?.query;
  if (query) {
    return {
      title: `Results for "${query}"`,
      description: `Search results for movies and series matching "${query}".`,
    };
  }
  return {
    title: "MovieFinder | Search for Movies & Series",
    description: "An elegant and fast movie search application built with Next.js.",
  };
}

export default async function HomePage({ searchParams }: SearchPageProps) {
  const awaitedSearchParams = await searchParams;
  const query = awaitedSearchParams?.query || "";
  const page = Number(awaitedSearchParams?.page || 1);

  return (
    <div className="min-h-screen  text-white selection:bg-red-600/50">
      <header className="sticky top-0 z-50 p-4  backdrop-blur-lg border-b border-gray-800">
        <SearchInput />
      </header>

      <main className="container mx-auto px-4 py-8">
        <Suspense key={query + page} fallback={<MovieGridSkeleton />}>
          <MovieResults query={query} page={page} />
        </Suspense>
      </main>
    </div>
  );
}

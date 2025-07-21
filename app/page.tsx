import { Suspense } from "react";

import { fetchMovies } from "./services/api";
import MotionContainer from "./components/defaults/MotionContainer";
import { MovieCard } from "./components/MovieCard";
import { MoviePagination } from "./components/MoviePagination";
import { MovieGridSkeleton } from "./components/MovieSkeleton";
import { SearchInput } from "./components/SearchInput";
import type { Metadata } from "next";
import { SearchPageProps } from "./types";
import { StateDisplay } from "./components/defaults/StateDisplay";

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

async function MovieResults({ query, page }: { query: string; page: number }) {
  const { movies, totalResults, error } = await fetchMovies(query, page);

  if (error) {
    return <StateDisplay state="error" errorMessage={error} />;
  }
  if (!query) {
    return <StateDisplay state="initial" />;
  }
  if (movies.length === 0) {
    return <StateDisplay state="no-results" query={query} />;
  }

  return (
    <>
      <MotionContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </MotionContainer>
      <MoviePagination totalResults={totalResults} />
    </>
  );
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

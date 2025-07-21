import { StateDisplay } from "./defaults/StateDisplay";

import { fetchMovies } from "../services/api";
import { MovieCard } from "./MovieCard";
import MotionContainer from "./defaults/MotionContainer";
import { MoviePagination } from "./MoviePagination";

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

export default MovieResults;

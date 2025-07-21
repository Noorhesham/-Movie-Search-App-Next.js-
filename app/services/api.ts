import { BASE_URL, API_KEY } from "../constants";
import { OMDbApiResponse, MovieSearchResult, MovieDetails } from "../types";

export async function fetchMovies(
  query: string,
  page = 1
): Promise<{ movies: MovieSearchResult[]; totalResults: number; error?: string }> {
  if (!query) {
    return { movies: [], totalResults: 0 };
  }

  try {
    const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`);
    const data: OMDbApiResponse = await response.json();

    if (data.Response === "True") {
      return {
        movies: data.Search,
        totalResults: parseInt(data.totalResults, 10),
      };
    } else {
      return {
        movies: [],
        totalResults: 0,
        error: data.Error,
      };
    }
  } catch (err) {
    console.error("An unexpected error occurred while fetching movies:", err);
    return {
      movies: [],
      totalResults: 0,
      error: "Failed to connect to the movie database. Please try again later.",
    };
  }
}

export async function fetchMovieDetailsById(imdbId: string): Promise<{ data?: MovieDetails; error?: string }> {
  try {
    const response = await fetch(`${BASE_URL}?i=${imdbId}&plot=full&apikey=${API_KEY}`);
    if (!response.ok) {
      return { error: `Server responded with status ${response.status}.` };
    }

    const data = await response.json();
    console.log("dataaaaaaaaaaa", data);
    if (data) {
      return { data: data as MovieDetails };
    } else {
      return { error: data.Error };
    }
  } catch (err) {
    console.error("An unexpected error occurred while fetching movie details:", err);
    return { error: "Failed to connect to the movie database." };
  }
}

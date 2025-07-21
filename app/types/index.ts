export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
}

export interface OMDbSearchResponse {
  Search: MovieSearchResult[];
  totalResults: string; // OMDb returns this as a string
  Response: "True";
}

export interface OMDbErrorResponse {
  Response: "False";
  Error: string;
}
export interface SearchPageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}
export interface MoviePageProps {
  params: {
    id: string;
  };
}

export type OMDbApiResponse = OMDbSearchResponse | OMDbErrorResponse;
export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: "True";
}

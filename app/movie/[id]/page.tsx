import { fetchMovieDetailsById } from "../../services/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MovieDetailsContent } from "@/app/components/MovieDetailsContent";
import { MoviePageProps } from "@/app/types";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { data } = await fetchMovieDetailsById(params.id);

  if (!data) {
    return { title: "Movie Not Found" };
  }
  return {
    title: `${data.Title} (${data.Year})`,
    description: data.Plot,
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const awaitedParams = await params;
  const { data: details, error } = await fetchMovieDetailsById(awaitedParams.id);
  if (error || !details) {
    notFound();
  }

  return (
    <MaxWidthWrapper>
      <MovieDetailsContent details={details || null} error={error || null} />
    </MaxWidthWrapper>
  );
}

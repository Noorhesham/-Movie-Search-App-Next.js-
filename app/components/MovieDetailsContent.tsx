"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MovieDetails } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Loader2, ServerCrash, Film, Star, PenSquare, Users } from "lucide-react";
import { containerVariants, itemVariants } from "../animations/animation";

export interface MovieDetailsContentProps {
  details: MovieDetails | null;
  isLoading: boolean;
  error: string | null;
}

function MovieDetailsContentComponent({ details, isLoading, error }: MovieDetailsContentProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-12 h-12 animate-spin text-amber-400" />
      </div>
    );
  }

  // Error state
  if (error || !details) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <ServerCrash size={64} className="text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-white">Loading Failed</h3>
        <p className="text-gray-400 mt-2">{error}</p>
      </div>
    );
  }

  // Memoize poster source calculation
  const posterSrc = useMemo(() => {
    if (details.Poster !== "N/A") return details.Poster;
    return `https://placehold.co/500x750/0f172a/eab308?text=${encodeURIComponent(details.Title)}`;
  }, [details.Poster, details.Title]);

  // Memoize genre badges
  const genreBadges = useMemo(
    () =>
      details.Genre.split(", ").map((genre) => (
        <Badge key={genre} variant="secondary" className="text-sm">
          {genre}
        </Badge>
      )),
    [details.Genre]
  );

  // Memoize structured data for SEO
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Movie",
      name: details.Title,
      datePublished: details.Year,
      genre: details.Genre.split(", "),
      director: {
        "@type": "Person",
        name: details.Director,
      },
      actor: details.Actors.split(", ").map((actor) => ({
        "@type": "Person",
        name: actor.trim(),
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: details.imdbRating,
        bestRating: "10",
      },
      image: posterSrc,
      description: details.Plot,
    }),
    [details, posterSrc]
  );

  return (
    <>
      {/* Structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <motion.div
        className="flex flex-col md:flex-row gap-8 h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Poster Section */}
        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/3 flex-shrink-0 relative group overflow-hidden rounded-lg"
        >
          <Image
            src={posterSrc}
            alt={`${details.Title} poster`}
            width={500}
            height={750}
            className="rounded-lg object-cover w-full h-auto shadow-2xl"
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        {/* Details Section */}
        <div className="flex-grow overflow-y-auto pr-2">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white">
            {details.Title} <span className="text-gray-400 font-normal">({details.Year})</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 my-4">
            {genreBadges}
          </motion.div>

          <motion.p variants={itemVariants} className="text-gray-300 italic text-base leading-relaxed mb-6">
            {details.Plot}
          </motion.p>

          {/* Key Info with Icons */}
          <motion.div variants={itemVariants} className="space-y-4 text-sm">
            <div className="flex items-start">
              <Film size={16} className="text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <strong className="text-gray-400 block">Director</strong>
                <span className="text-gray-200">{details.Director}</span>
              </div>
            </div>

            <div className="flex items-start">
              <PenSquare size={16} className="text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <strong className="text-gray-400 block">Writer</strong>
                <span className="text-gray-200">{details.Writer}</span>
              </div>
            </div>

            <div className="flex items-start">
              <Users size={16} className="text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <strong className="text-gray-400 block">Actors</strong>
                <span className="text-gray-200">{details.Actors}</span>
              </div>
            </div>

            <div className="flex items-start">
              <Star size={16} className="text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <strong className="text-gray-400 block">IMDb Rating</strong>
                <span className="text-gray-200 font-bold text-lg">{details.imdbRating} / 10</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const MovieDetailsContent = memo(MovieDetailsContentComponent);
MovieDetailsContent.displayName = "MovieDetailsContent";

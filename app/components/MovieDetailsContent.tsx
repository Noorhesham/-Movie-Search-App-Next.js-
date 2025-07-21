"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MovieDetails } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { ServerCrash, Film, PenSquare, Users, Clock, Award } from "lucide-react";
import { containerVariants, itemVariants } from "../animations/animation";
import { RatingIcon } from "./RatingIcon";

export interface MovieDetailsContentProps {
  details: MovieDetails | null;
  error: string | null;
}

function MovieDetailsContentComponent({ details, error }: MovieDetailsContentProps) {
  if (error || !details) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <ServerCrash size={64} className="text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-white">Loading Failed</h3>
        <p className="text-gray-400 mt-2">{error}</p>
      </div>
    );
  }

  const posterSrc = useMemo(() => {
    return details.Poster !== "N/A"
      ? details.Poster
      : `https://placehold.co/500x750/0f172a/eab308?text=${encodeURIComponent(details.Title)}`;
  }, [details.Poster, details.Title]);

  const genreBadges = useMemo(
    () =>
      details.Genre.split(", ").map((genre) => (
        <Badge key={genre} variant="secondary" className="text-sm">
          {genre}
        </Badge>
      )),
    [details.Genre]
  );

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Movie",
      name: details.Title,
      datePublished: details.Year,
      image: posterSrc,
      description: details.Plot,
      director: { "@type": "Person", name: details.Director },
      actor: details.Actors.split(", ").map((actor) => ({ "@type": "Person", name: actor.trim() })),
      aggregateRating: details.Ratings.map((rating) => ({
        "@type": "Rating",
        ratingValue: rating.Value.split("/")[0].split("%")[0],
        bestRating: rating.Value.includes("/") ? "10" : "100",
        ratingCount: details.imdbVotes.replace(/,/g, ""),
        reviewAspect: rating.Source,
      })),
    }),
    [details, posterSrc]
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <motion.div
        className="flex  flex-col md:flex-row gap-8 h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/3 flex-shrink-0 relative group overflow-hidden rounded-lg"
        >
          <Image
            src={posterSrc}
            alt={`${details.Title} poster`}
            width={500}
            height={750}
            className="rounded-lg img-shine object-cover w-full h-auto shadow-2xl"
            priority
            quality={90}
          />
          <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
        </motion.div>

        <div className="flex-grow overflow-y-auto pr-2">
          <motion.div variants={itemVariants} className="flex items-center gap-x-4 mb-2">
            <Badge variant="outline">{details.Rated}</Badge>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span>{details.Runtime}</span>
            </div>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white">
            {details.Title} <span className="text-gray-400 font-normal">({details.Year})</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 my-4">
            {genreBadges}
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-300 italic text-base leading-relaxed mb-6">
            {details.Plot}
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {details.Ratings.map((rating) => (
              <div key={rating.Source} className="flex items-center gap-3">
                <RatingIcon source={rating.Source} />
                <div>
                  <span className="text-lg font-bold text-white">{rating.Value}</span>
                  <p className="text-xs text-gray-400">{rating.Source}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 text-sm border-t border-gray-800 pt-6">
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
              <Award size={16} className="text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <strong className="text-gray-400 block">Awards</strong>
                <span className="text-gray-200">{details.Awards}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
export const MovieDetailsContent = memo(MovieDetailsContentComponent);
MovieDetailsContent.displayName = "MovieDetailsContent";

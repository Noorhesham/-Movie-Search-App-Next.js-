"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MovieDetails } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { ServerCrash, Film, Star, PenSquare, Users } from "lucide-react";
import { containerVariants, itemVariants } from "../animations/animation";

export interface MovieDetailsContentProps {
  details: MovieDetails | null;
  error: string | null;
}

export function MovieDetailsContent({ details, error }: MovieDetailsContentProps) {
  if (error || !details) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <ServerCrash size={64} className="text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-white">Loading Failed</h3>
        <p className="text-gray-400 mt-2">{error}</p>
      </div>
    );
  }

  const posterSrc =
    details.Poster !== "N/A"
      ? details.Poster
      : `https://placehold.co/500x750/0f172a/eab308?text=${encodeURIComponent(details.Title)}`;

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-8 h-full"
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
          alt={`Poster for ${details.Title}`}
          width={500}
          height={750}
          className="rounded-lg img-shine object-cover w-full h-auto shadow-2xl"
          priority
        />
      </motion.div>

      {/* --- Details Section --- */}
      <div className="flex-grow overflow-y-auto pr-2">
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white">
          {details.Title} <span className="text-gray-400 font-normal">({details.Year})</span>
        </motion.h2>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 my-4">
          {details.Genre.split(", ").map((g) => (
            <Badge key={g} variant="secondary" className="text-sm">
              {g}
            </Badge>
          ))}
        </motion.div>

        <motion.p variants={itemVariants} className="text-gray-300 italic text-base leading-relaxed mb-6">
          {details.Plot}
        </motion.p>

        {/* --- Key Info with Icons --- */}
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
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Star, Clapperboard } from "lucide-react";
import { MovieSearchResult } from "../types";
import MotionItem from "./defaults/MotionItem";
import Link from "next/link";

const PLACEHOLDER_CONFIG = {
  width: 500,
  height: 750,
  bg: "0f172a",
  color: "eab308",
} as const;

const MOTION_CONFIG = {
  hover: { scale: 1.03, y: -4 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
} as const;

const IMAGE_SIZES = "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw";

export interface MovieCardProps {
  movie: MovieSearchResult;
  variants?: Variants;
}

export function MovieCard({ movie, variants }: MovieCardProps) {
  const posterSrc =
    movie.Poster !== "N/A"
      ? movie.Poster
      : `https://placehold.co/500x750/0f172a/eab308?text=${encodeURIComponent(movie.Title)}`;

  return (
    <Link
      href={`/movie/${movie.imdbID}`}
      scroll={false}
      className="block w-full"
      aria-label={`View details for ${movie.Title}`}
    >
      <MotionItem
        variants={variants}
        className="relative cursor-pointer aspect-[2/3] w-full overflow-hidden rounded-xl shadow-lg group"
        whileHover="hover"
      >
        <motion.div
          className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden"
          variants={{
            hover: { scale: 1.03, y: -4 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src={posterSrc}
            alt={`Poster for ${movie.Title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* --- Bottom Gradient Overlay --- */}

          <div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
            aria-hidden="true"
          />

          {/* --- Movie Information --- */}
          <div className="absolute bottom-0 left-0 p-4 w-full text-white">
            <motion.h3
              className="text-lg font-bold truncate"
              title={movie.Title}
              variants={{ hover: { color: "#ff0000" } }}
            >
              {movie.Title}
            </motion.h3>
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-300 mt-1">
              <div className="flex items-center gap-1.5">
                <Clapperboard size={14} className="text-red-400" />
                <span>{movie.Type}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-yellow-400" />
                <span>{movie.Year}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </MotionItem>
    </Link>
  );
}

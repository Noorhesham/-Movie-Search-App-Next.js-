"use client";

import { motion, Variants, RepeatType } from "framer-motion";
import { ServerCrash, SearchX, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface StateDisplayProps {
  state: "initial" | "no-results" | "error";
  query?: string;
  errorMessage?: string;
}

interface StateConfig {
  icon: ReactNode;
  title: string;
  message: string;
  action?: ReactNode;
}

const iconVariants: Variants = {
  float: {
    y: ["-8px", "8px"],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse" as RepeatType,
      ease: "easeInOut",
    },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

export function StateDisplay({ state, query, errorMessage }: StateDisplayProps) {
  const router = useRouter();
  const pathname = usePathname();

  const states: Record<StateDisplayProps["state"], StateConfig> = {
    initial: {
      icon: <Film size={200} className="text-gray-600" />,
      title: "Find Your Next Favorite Film",
      message: "Use the search bar above to discover movies and series.",
    },
    "no-results": {
      icon: <SearchX size={200} className="text-amber-400" />,
      title: "No Results Found",
      message: `We couldn't find anything for "${query}". Try a different search.`,
      action: (
        <Button onClick={() => router.replace(pathname)} variant="outline" className="mt-4">
          Clear Search
        </Button>
      ),
    },
    error: {
      icon: <ServerCrash size={200} className="text-red-500" />,
      title: "Oops! Something Went Wrong",
      message: errorMessage || "We couldn't connect to the database. Please try again later.",
    },
  };

  const current = states[state];

  return (
    <div className="w-full text-center flex flex-col items-center justify-center pt-16 md:pt-24">
      <motion.div variants={iconVariants} animate="float">
        {current.icon}
      </motion.div>
      <motion.div variants={contentVariants} initial="hidden" animate="visible" className="mt-6">
        <h2 className="text-2xl font-bold text-white">{current.title}</h2>
        <p className="text-gray-400 mt-2 max-w-sm mx-auto">{current.message}</p>
        {current.action}
      </motion.div>
    </div>
  );
}

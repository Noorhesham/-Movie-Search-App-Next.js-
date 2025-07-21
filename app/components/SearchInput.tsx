"use client";

import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState, useRef } from "react";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);
  const isInitialRender = useRef(true);

  useEffect(() => {
    // Skip the effect on the initial render to avoid clearing the URL params on page load
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const params = new URLSearchParams();

    // This effect should ONLY run when the user's search term changes.
    if (debouncedQuery) {
      params.set("query", debouncedQuery);
      params.set("page", "1");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedQuery, pathname, router]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={22} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies, series, and more..."
        className="w-full pl-14 pr-4 py-3.5 rounded-full text-white
                   bg-gray-800/50 backdrop-blur-sm 
                   border border-gray-600/50 
                   focus:outline-none focus:ring-2 focus:ring-red-600/80 focus:border-red-600
                   transition-all duration-300 shadow-lg"
        aria-label="Search for movies"
      />
    </div>
  );
}

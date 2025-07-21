"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
export function MovieGridSkeleton() {
  const skeletonCount = 20;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}

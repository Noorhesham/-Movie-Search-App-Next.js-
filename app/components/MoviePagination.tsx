"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { usePagination, DOTS } from "../hooks/usePagination";

interface MoviePaginationProps {
  totalResults: number;
  resultsPerPage?: number;
}

export function MoviePagination({ totalResults, resultsPerPage = 10 }: MoviePaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const paginationRange = usePagination({
    currentPage,
    totalCount: totalResults,
    siblingCount: 1,
    pageSize: resultsPerPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="w-full flex flex-col items-center gap-4 mt-12 text-white">
      <p className="text-sm text-gray-400">
        Page <span className="font-bold text-red-400">{currentPage}</span> of{" "}
        <span className="font-bold">{totalPages}</span>
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <PaginationItem key={`dots-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink href={createPageURL(pageNumber)} isActive={pageNumber === currentPage}>
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              aria-disabled={currentPage === lastPage}
              className={currentPage === lastPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

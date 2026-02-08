import { useAppDispatch, useAppSelector } from "@/store";
import {
  setViewMode,
  setCurrentPage,
  type ViewMode,
} from "@/store/productSlice";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LayoutGrid, Rows3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  totalPages: number;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export function PaginationControls({
  totalPages,
  hasMore,
  onLoadMore,
  isLoadingMore,
}: PaginationControlsProps) {
  const dispatch = useAppDispatch();
  const { viewMode, currentPage } = useAppSelector((state) => state.products);

  const handleViewModeChange = (mode: ViewMode) => {
    dispatch(setViewMode(mode));
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
      // Scroll to top of product grid
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-8 space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-sm text-muted-foreground mr-2">View:</span>
        <Button
          variant={viewMode === "pagination" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewModeChange("pagination")}
          className="gap-2"
        >
          <LayoutGrid className="h-4 w-4" />
          Pagination
        </Button>
        <Button
          variant={viewMode === "infinite" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewModeChange("infinite")}
          className="gap-2"
        >
          <Rows3 className="h-4 w-4" />
          Infinite Scroll
        </Button>
      </div>

      {/* Pagination Mode */}
      {viewMode === "pagination" && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={cn(
                  "cursor-pointer",
                  currentPage === 1 && "pointer-events-none opacity-50",
                )}
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={cn(
                  "cursor-pointer",
                  currentPage === totalPages &&
                    "pointer-events-none opacity-50",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Infinite Scroll: Load More Button (fallback) */}
      {viewMode === "infinite" && hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="min-w-50"
          >
            {isLoadingMore ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Loading...
              </>
            ) : (
              "Load More Products"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

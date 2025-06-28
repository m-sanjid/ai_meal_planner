import { Fragment, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  noOfPages: number;
  currentPage: number;
  setCurrentPage: (n: number) => void;
};

const Pagination = ({
  noOfPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  // Keyboard navigation: ← and →
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < noOfPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, noOfPages, setCurrentPage]);

  const generatePages = () => {
    if (noOfPages <= 7) {
      return Array.from({ length: noOfPages }, (_, i) => i + 1);
    }

    const pages = new Set<number>();
    pages.add(1);
    pages.add(noOfPages);

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < noOfPages) pages.add(i);
    }

    if (currentPage <= 4) {
      for (let i = 2; i <= 4; i++) pages.add(i);
    }

    if (currentPage >= noOfPages - 3) {
      for (let i = noOfPages - 3; i < noOfPages; i++) pages.add(i);
    }

    return [...pages].sort((a, b) => a - b);
  };

  const pageNumbers = generatePages();

  return (
    <div className="mt-4 flex w-full items-center justify-center">
      {/* Desktop version */}
      <div className="hidden flex-wrap items-center justify-center gap-1 sm:flex sm:gap-1.5">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pageNumbers.map((num, i) => (
          <Fragment key={`page-${num}`}>
            {i > 0 && num - pageNumbers[i - 1] > 1 && (
              <span className="text-muted-foreground px-1 text-sm">…</span>
            )}
            <Button
              variant={num === currentPage ? "default" : "ghost"}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 text-sm ${num === currentPage ? "font-semibold" : ""}`}
              aria-current={num === currentPage ? "page" : undefined}
            >
              {num}
            </Button>
          </Fragment>
        ))}

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === noOfPages}
          aria-label="Next Page"
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile version */}
      <div className="flex items-center gap-3 text-sm sm:hidden">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-muted-foreground">
          Page {currentPage} of {noOfPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === noOfPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

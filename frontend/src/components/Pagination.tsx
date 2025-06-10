import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  noOfPages,
  currentPage,
  setCurrentPage,
}: {
  noOfPages: number;
  currentPage: number;
  setCurrentPage: (n: number) => void;
}) => {
  const handlePageChange = (n: number) => {
    setCurrentPage(n);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderPageNumbers = () => {
    if (noOfPages <= 15) {
      return Array.from({ length: noOfPages }, (_, i) => i + 1);
    }

    const pages = new Set<number>();

    for (let i = 1; i <= 7; i++) {
      pages.add(i);
    }

    pages.add(noOfPages - 1);
    pages.add(noOfPages);

    // Show current page and 2 surrounding pages, if not already included
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 9 && i < noOfPages - 1) {
        pages.add(i);
      }
    }

    return [...pages].sort((a, b) => a - b);
  };

  const pageNumbers = renderPageNumbers();

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={"secondary"}
        disabled={currentPage === 1}
        onClick={handlePrevPage}
      >
        <ChevronLeft />
      </Button>
      {pageNumbers.map((n, index) => (
        <>
          {index > 0 && n - pageNumbers[index - 1] > 1 && (
            <span key={`dots-${index}`}>...</span>
          )}
          <Button
            onClick={() => handlePageChange(n)}
            key={n}
            variant={n === currentPage ? "default" : "secondary"}
          >
            {n}
          </Button>
        </>
      ))}
      <Button
        variant={"secondary"}
        disabled={currentPage === noOfPages}
        onClick={handleNextPage}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;

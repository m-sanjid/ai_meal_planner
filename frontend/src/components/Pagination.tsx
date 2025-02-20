import React from "react";
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
  const pageNumbers = [];

  for (let i = 1; i <= noOfPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (n: number) => {
    setCurrentPage(n);
  };
  const handleNextPage = () => {
    //@ts-expect-error i is type any
    setCurrentPage((i) => i + 1);
  };
  const handlePrevPage = () => {
    //@ts-expect-error i is type any
    setCurrentPage((i) => i - 1);
  };
  return (
    <div className="flex gap-1">
      <Button
        variant={"secondary"}
        disabled={currentPage === 0}
        onClick={handlePrevPage}
      >
        <ChevronLeft />
      </Button>
      {pageNumbers.map((n) => (
        <Button
          onClick={() => handlePageChange(n)}
          key={n}
          variant={n === currentPage ? "default" : "secondary"}
        >
          {n}
        </Button>
      ))}
      <Button
        variant={"secondary"}
        disabled={currentPage === noOfPages - 1}
        onClick={handleNextPage}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;

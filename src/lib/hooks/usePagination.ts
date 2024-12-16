import { useState } from "react";

export const usePagination = (
  totalItems: number,
  itemsPerPage: number
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const goToNextPage = () => {
    if (hasNextPage)
      setCurrentPage((prev) => prev + 1);
  }

  const goToPreviousPage = () => {
    if (hasPreviousPage)
      setCurrentPage((prev) => prev - 1);
  }

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages)
      setCurrentPage(page);
  }

  return {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    goToNextPage,
    goToPreviousPage,
    goToPage
  } as const;
};
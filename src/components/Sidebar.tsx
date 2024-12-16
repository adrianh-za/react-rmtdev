import ResultsCount from "./ResultsCount.tsx";
import SortingControls from "./SortingControls.tsx";
import JobList from "./JobList.tsx";
import PaginationControls from "./PaginationControls.tsx";
import { usePagination } from "../lib/hooks/usePagination.ts";
import { ITEMS_PER_PAGE, SortOrder } from "../lib/constants.ts";
import { useMemo, useState } from "react";
import { sortFilterJobItems } from "../lib/helpers/jobItemsHelper.ts";
import { toast } from "react-hot-toast";
import { useSearchTermContext } from "../contexts/searchTermContextProvider.tsx";
import { useJobItemsSearch } from "../lib/hooks/useJobItemsSearch.ts";

const Sidebar = () => {

  const handleError = (error: string) => {
    toast.error(error);
  }

  const { debouncedTerm } = useSearchTermContext();
  const { jobItems, isLoading } = useJobItemsSearch(debouncedTerm, handleError);
  const [sortedBy, setSortedBy] = useState<SortOrder>(SortOrder.relevant);
  const {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    goToPreviousPage,
    goToNextPage,
    goToPage
  } = usePagination(jobItems?.length ?? 0, ITEMS_PER_PAGE);

  const sortedJobItems = useMemo(() => {
    return sortFilterJobItems(jobItems, sortedBy, currentPage, ITEMS_PER_PAGE)
  }, [jobItems, sortedBy, currentPage]);

  const handleSortChange = (sortOrder: SortOrder) => {
    setSortedBy(sortOrder);
    goToPage(1);  //Will update currentPage to 1
  }

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount total={jobItems.length}/>
        <SortingControls onSortChange={handleSortChange} sortedBy={sortedBy}/>
      </div>
      <JobList
        jobItems={sortedJobItems}
        isLoading={isLoading}
      />
      <PaginationControls
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        currentPage={currentPage}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}

export default Sidebar;
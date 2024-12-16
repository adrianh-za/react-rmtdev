import { SortOrder } from "../constants.ts";
import { JobItem } from "../types/jobItems.ts";

export const sortFilterJobItems = (jobItems: JobItem[], sortedBy: SortOrder, currentPage: number, pageSize: number): JobItem[] => {

  let sortedJobItems: JobItem[];

  //Sort the job items based on the selected sort order
  if (sortedBy === SortOrder.recent) {
    sortedJobItems = [...jobItems].sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    sortedJobItems = [...jobItems].sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }

  //Filter the job items based on the selected sort order
  return sortedJobItems.slice(pageSize * (currentPage - 1), pageSize * currentPage)
}
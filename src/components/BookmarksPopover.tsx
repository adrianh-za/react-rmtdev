import JobList from "./JobList.tsx";
import { useJobItems } from "../lib/hooks/useJobItem.ts";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { useBookmarksContext } from "../contexts/bookmarksContextProvider.tsx";

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref)=> {

  const { bookmarks } = useBookmarksContext();
  const { jobItems, isLoading } = useJobItems(bookmarks);

  const reactNode =
    <div ref={ref} className="bookmarks-popover">
      <JobList isLoading={isLoading} jobItems={jobItems}/>
    </div>;

  return createPortal(
    reactNode,
    document.body
  )
});

export default BookmarksPopover;

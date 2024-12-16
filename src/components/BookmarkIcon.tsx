import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import React from "react";
import { useBookmarksContext } from "../contexts/bookmarksContextProvider.tsx";

type BookmarkIconProps = {
  id: number;
}

const BookmarkIcon = (props: BookmarkIconProps) => {

  const { id } = props;
  const { isBookmarked, toggleBookmark }  = useBookmarksContext();

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleBookmark(id);
  }

  return (
    <button className="bookmark-btn" onClick={handleOnClick}
    >
      <BookmarkFilledIcon className={`${isBookmarked(id) ? "filled" : ""}`} />
    </button>
  );
}

export default BookmarkIcon;

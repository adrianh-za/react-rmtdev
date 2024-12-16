import React, { createContext } from "react";
import { useBookmarks } from "../lib/hooks/useBookmarks.ts";

type BookmarksContextProviderProps = {
  children: React.ReactNode;
}

type BookmarksContextType = {
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
};

export const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: [],
  toggleBookmark: () => { },
  isBookmarked: () => false,
});

export const BookmarksContextProvider = (props: BookmarksContextProviderProps) => {

  const {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
  } = useBookmarks();

  const handleToggleBookmark = (id: number) => {
    if (isBookmarked(id)) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  }

  return (
    <BookmarksContext.Provider value={{
      bookmarks,
      toggleBookmark: handleToggleBookmark,
      isBookmarked
    }}>
      {props.children}
    </BookmarksContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBookmarksContext = () => {
  const context = React.useContext(BookmarksContext);
  if (context)
    return context;

  throw new Error('useBookmarksContext must be used within a BookmarksContextProvider');
}
import { useLocalStorage } from "./useLocalStorage.ts";
import { LOCAL_STORAGE_BOOKMARKS } from "../constants.ts";

export const useBookmarks = () => {
  const [ bookmarks, setBookmarks ] = useLocalStorage<number[]>(LOCAL_STORAGE_BOOKMARKS, []);

  const addBookmark = (id: number) => {
    if (bookmarks.includes(id)) return;

    const updatedBookmarks = [...bookmarks, id];
    setBookmarks(updatedBookmarks);
  }

  const removeBookmark = (id: number) => {
    if (!bookmarks.includes(id)) return;

    const updatedBookmarks = bookmarks.filter((bookmarkId) => bookmarkId !== id);
    setBookmarks(updatedBookmarks);
  }

  const isBookmarked = (id: number) => bookmarks.includes(id);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  } as const;
};

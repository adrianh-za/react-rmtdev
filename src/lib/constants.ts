export const BASE_URL = "https://bytegrad.com/course-assets/projects/rmtdev/api/data";
export const ITEMS_PER_PAGE = 7;
export const CACHE_EXPIRY_JOBITEMS_MS = 1000 * 60 * 5; // 5 minutes
export const LOCAL_STORAGE_BOOKMARKS = "bookmarks";
export enum SortOrder {
  relevant = "relevant",
  recent = "recent"
}
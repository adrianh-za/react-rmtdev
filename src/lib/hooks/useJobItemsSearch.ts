import { BASE_URL, CACHE_EXPIRY_JOBITEMS_MS } from "../constants.ts";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "../helpers/errorHelper.ts";
import { JobItem } from "../types/jobItems.ts";

type JobItemResponse = {
  public: boolean;
  jobItems: JobItem[];
}

//Fetches JobItems by search term from API
const fetchData = async ( searchTerm: string) : Promise<JobItemResponse> => {
  const response = await fetch(`${BASE_URL}?search=${searchTerm}`);

  //Unsuccessful response
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Could not fetch JobItems for search term '${searchTerm}' | Error: ${errorData.description}`);
  }

  return await response.json();
}

export type UseJobItemsResult = {
  jobItems: JobItem[];
  isLoading: boolean;
}
export const useJobItemsSearch = (
  searchTerm: string,
  onError?: (message: string) => void
): UseJobItemsResult => {

  // noinspection JSDeprecatedSymbols
  const { data, isInitialLoading } = useQuery(
    ["job-items-search", searchTerm],
    async () => {
      return searchTerm ? await fetchData(searchTerm) : null;
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchTerm),
      staleTime: CACHE_EXPIRY_JOBITEMS_MS,
      onError: (error) => {
        if (onError)
          onError(getErrorMessage(error));
      }
    }
  );

  return {
    jobItems: data?.jobItems ?? [],
    isLoading: isInitialLoading
  } as const;
}
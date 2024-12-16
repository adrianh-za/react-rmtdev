import { BASE_URL, CACHE_EXPIRY_JOBITEMS_MS } from "../constants.ts";
import { useQueries, useQuery } from "@tanstack/react-query";
import { JobItemExpanded } from "../types/jobItems.ts";
import { getErrorMessage } from "../helpers/errorHelper.ts";

type JobItemResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
}

//Fetches a single JobItem by ID from API
const fetchData = async (jobItemId: number): Promise<JobItemResponse> => {
  const response = await fetch(`${BASE_URL}/${jobItemId}`);

  //Unsuccessful response
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Could not fetch JobItem for ID '${jobItemId}' | Error: ${errorData.description}`);
  }

  return await response.json();
};

export type UseJobItemResult = {
  jobItem: JobItemExpanded | null;
  isLoading: boolean;
}

//*** Get single job items by their IDs (I could probably call the useJobItems function with a single ID, but this is more efficient)
export const useJobItem = (
  jobItemId: number | null,
  onError?: (message: string) => void)
  : UseJobItemResult => {

  // noinspection JSDeprecatedSymbols
  const { data, isInitialLoading } = useQuery(
    ["job-item", jobItemId],
    async () => {
      return jobItemId ? await fetchData(jobItemId) : null;
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(jobItemId),
      staleTime: 1000 * 60 * 5, // 5 minutes
      onError: (error) => {
        if (onError)
          onError(getErrorMessage(error));
      }
    }
  );

  return {
    jobItem: data?.jobItem ?? null,
    isLoading: isInitialLoading
  } as const;
}



//*** Get multiple job items by their IDs
export type UseJobItemsResult = {
  jobItems: JobItemExpanded[],
  isLoading: boolean;
}
export const useJobItems = (
  ids: number[],
  onError?: (message: string) => void)
  : UseJobItemsResult => {

  const results = useQueries({
      queries: ids.map(id => ({
        queryKey: ["job-item", id],
        queryFn: () => fetchData(id),
        enabled: Boolean(id),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: CACHE_EXPIRY_JOBITEMS_MS, // 5 minutes,
        onError: (error: unknown) => {
          if (onError)
            onError(getErrorMessage(error));
        }
      }))
    }
  )

  const fetchedJobItems = results
    .map(result => result.data?.jobItem)
    //.filter(jobItem => jobItem !== undefined) as JobItemExpanded[];
    //.filter(jobItem => !!jobItem) as JobItemExpanded[];
    .filter(jobItem => Boolean(jobItem)) as JobItemExpanded[];
  const isLoading = results.some(result => result.isLoading);

  return {
    jobItems: fetchedJobItems,
    isLoading: isLoading
  } as const;
}
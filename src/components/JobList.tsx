import JobListItem from "./JobListItem.tsx";
import Spinner from "./Spinner.tsx";
import { JobItem } from "../lib/types/jobItems.ts";
import { useUrlHashContext } from "../contexts/urlHashContextProvider.tsx";

type JobListProps ={
  jobItems: JobItem[];
  isLoading: boolean;
}

const JobList = ( { jobItems, isLoading } : JobListProps)=> {

  const { urlHash } = useUrlHashContext();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading && (
        jobItems.map((jobItem) => {
          const hashJobItemId = urlHash
            ? parseInt(urlHash)
            : 0;

          return (
            <JobListItem
              key={jobItem.id}
              jobItem={jobItem}
              isSelected={jobItem.id === hashJobItemId}
            />
          );
        })
      )}
    </ul>
  );
}

export default JobList;

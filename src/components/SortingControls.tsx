import { SortOrder } from "../lib/constants.ts";

export type SortingControlProps = {
  sortedBy: SortOrder;
  onSortChange: (sort: SortOrder) => void;
}

const SortingControls = (props: SortingControlProps)=> {

  const { sortedBy, onSortChange } = props;

  const handleOnSortChange = (sortOrder: SortOrder) => {
    if (onSortChange)
      onSortChange(sortOrder);
  }

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${sortedBy === SortOrder.relevant ? "sorting__button--active" : ""}`}
        onClick={() => handleOnSortChange(SortOrder.relevant)}>
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${sortedBy === SortOrder.recent ? "sorting__button--active" : ""}`}
        onClick={() => handleOnSortChange(SortOrder.recent)}>
        Recent
      </button>
    </section>
  );
}

export default SortingControls;

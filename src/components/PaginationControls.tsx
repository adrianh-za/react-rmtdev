import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  goToNextPage: ()=> void;
  goToPreviousPage: ()=> void;
}

const PaginationControls = (props: PaginationControlsProps)=> {

  const {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    goToNextPage,
    goToPreviousPage
  } = props;

  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <button
          className="pagination__button pagination__button--prev"
          disabled={!hasPreviousPage}
          onClick={(event) => {
            goToPreviousPage();
            event.currentTarget.blur();
            event.stopPropagation();
          }}>
          <ArrowLeftIcon/> Page {previousPage}
        </button>)
      }
      {currentPage < totalPages && (
        <button
          disabled={!hasNextPage}
          className="pagination__button pagination__button--next"
          onClick={(event) => {
            goToNextPage();
            event.currentTarget.blur();
            event.stopPropagation();
          }}>
          Page {nextPage} <ArrowRightIcon/>
        </button>)
      }

    </section>
  );
}

export default PaginationControls;


import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      previousLabel="&lt;"
      nextLabel="&gt;"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      forcePage={currentPage - 1}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}

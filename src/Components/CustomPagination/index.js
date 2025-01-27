import "./style.css";

const CustomPagination = ({
  showing = 8,
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginationBar align-items-center">
      <p>
        Showing {showing} out of {totalItems} Entries
      </p>
      <ul>
        <li >
          <button onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage > 1 ? false : true}>Prev</button>
        </li>
        {pageNumbers?.map((pageNumber) => (
          <li key={pageNumber}>
            <button className={`${pageNumber == currentPage ? 'current-page' : ""}`} onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
        <li

        >
          <button onClick={() =>
            onPageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          } disabled={currentPage < totalPages ? false : true} >Next</button>
        </li>
      </ul>
    </div>
  );
};

export default CustomPagination;

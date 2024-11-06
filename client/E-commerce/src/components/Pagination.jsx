import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Pagination = ({ pages, page, isAdmin = false, link }) => {
  const paginationSize = 5;
  const startPage = Math.floor(page / 5) * paginationSize + 1;
  const endPage = Math.min(startPage + paginationSize - 1, pages); // endPage = 10
  return (
    pages > 1 && (
      <div className="join w-full justify-center align-center">
        {startPage > 5 ? (
          <Link to={`/page/${page - 1}`}>
            <button className="join-item btn">«</button>
          </Link>
        ) : null}
        {[...Array(endPage - startPage + 1).keys()].map((x) => {
          return (
            <Link
              key={startPage + x}
              to={!isAdmin ? `/page/${startPage + x}` : `${link}/${x + 1}`}>
              <button
                className={`join-item btn ${
                  startPage + x === page ? "btn-active" : ""
                }`}>
                {startPage + x}
              </button>
            </Link>
          );
        })}
      </div>
    )
  );
};

export default Pagination;

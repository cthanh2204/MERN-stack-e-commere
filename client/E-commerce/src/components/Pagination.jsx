import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Pagination = ({ pages, page, isAdmin = false, link }) => {
  return (
    pages > 1 && (
      <div className="join w-full justify-center align-center">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={!isAdmin ? `/page/${x + 1}` : `${link}/${x + 1}`}>
            <button
              className={`join-item btn ${x + 1 === page ? "btn-active" : ""}`}>
              {x + 1}
            </button>
          </Link>
        ))}
      </div>
    )
  );
};

export default Pagination;

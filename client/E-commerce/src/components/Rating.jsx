import PropTypes from "prop-types";
const Rating = ({ value, text }) => {
  return (
    <div className="">
      <span>
        <i
          style={{ color: "#ffe234" }}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: "#ffe234" }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: "#ffe234" }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: "#ffe234" }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: "#ffe234" }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
};
export default Rating;

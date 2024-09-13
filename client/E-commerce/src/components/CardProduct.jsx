import PropTypes from "prop-types";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const CardProduct = ({ product }) => {
  return (
    <div className="flex items-center justify-center mb-2 w-full md:justify-between">
      <div className="card bg-base-100 shadow-xl size-full">
        <figure>
          <img src={product.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title truncate ...">{product.name}</h2>
          <div>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
          <h2 className="card-title">${product.price}</h2>
          <div className="card-actions justify-end">
            <Link to={`/product/${product._id}`}>
              <button className="btn btn-ghost">Buy Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
CardProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

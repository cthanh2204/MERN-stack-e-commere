import { Link, useParams } from "react-router-dom";
// import products from "../products";
import Rating from "../components/Rating";
import { useEffect } from "react";
import { detailProductAction } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, product, error } = productDetail;
  useEffect(() => {
    detailProductAction(dispatch, id);
  }, [detailProductAction]);
  return (
    <>
      <div>
        <Link to="/" className="btn btn-ghost">
          Go back
        </Link>
      </div>
      {loading ? (
        <div className="flex items-center  justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <h2>{error.message}</h2>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 my-3 ">
          <div className="w-full">
            <img src={product.image} />
          </div>

          <div className="w-full xl:w-2/3">
            <h1 className="text-4xl font-bold my-2">{product.name}</h1>
            <Rating
              value={product?.rating}
              text={`${product.numReviews} reviews`}
              className="my-2"
            />
            <p>
              <span className="text-md font-bold my-2">Description: </span>
              {product.description}
            </p>
            <h1 className="text-5xl my-2">${product.price}</h1>
            <p>
              <span className="text-md font-bold my-2">Status: </span>
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <button
              className="btn btn-neutral w-full my-2"
              disabled={product.countInStock === 0}>
              Add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;

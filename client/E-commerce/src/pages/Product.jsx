import { Link, useNavigate, useParams } from "react-router-dom";
// import products from "../products";
import Rating from "../components/Rating";
import Alert from "../components/Alert";
import { useEffect, useState } from "react";
import {
  detailProductAction,
  productReviewCreateAction,
} from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import {
  productDetailSelector,
  productReviewCreateSelector,
  userLoginSelector,
} from "../redux/selector/selectors";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/actions/cartAction";
import Loading from "../components/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/constants/productConstant";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const [qty, setQty] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const productDetail = useSelector(productDetailSelector);
  const { loading, product, error } = productDetail;
  const productReviewCreate = useSelector(productReviewCreateSelector);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (errorProductReview) {
      toast.error("User already review", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    dispatch(detailProductAction(id));
  }, [dispatch, id, successProductReview, errorProductReview]);

  const addToCartHandle = () => {
    if (qty === 0) {
      return toast.error("Please select quantities you want to add !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    dispatch(addToCart(id, qty));
    navigate(`/cart`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!comment) {
      return toast.error("Please fill all the fill comment below", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    dispatch(productReviewCreateAction(id, { rating, comments: comment }));
  };

  return (
    <>
      <div>
        <Link to="/" className="btn btn-ghost">
          Go back
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <h2>{error.message}</h2>
      ) : (
        <div>
          <div className="grid md:grid-cols-2 gap-2 my-3 ">
            <div className="size-full h-96 ">
              <img src={product.image} className="size-full object-contain	" />
            </div>

            <div className=" md:w-full">
              <h1 className="text-4xl font-bold my-2">{product.name}</h1>
              <Rating
                value={product?.rating}
                text={`${product.numReview} reviews`}
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
              <div className="my-2">
                <span className="font-bold">Quantities: </span>
                <select
                  className="select select-bordered select-sm w-full max-w-xs"
                  defaultValue={"Select Quantities"}
                  onChange={(e) => setQty(e.target.value)}>
                  <option disabled>Select Quantities</option>
                  {Array.from({ length: product.countInStock }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={addToCartHandle}
                className="btn btn-neutral w-full my-2"
                disabled={product.countInStock === 0}>
                Add to cart
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            <div>
              <h2 className="text-3xl uppercase font-weight">Reviews</h2>
              <div className="ml-4">
                {product.reviews.length === 0 && (
                  <Alert content="No Reviews" status="alert" />
                )}
                {product.reviews.map((review) => (
                  <div key={review._id} className="my-4">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} text="" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comments}</p>
                  </div>
                ))}
                <div>
                  <h2 className="text-3xl uppercase font-weight">
                    Write a Customer review
                  </h2>
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div>
                        <p>Rating</p>
                        <select
                          className="select select-bordered w-full max-w-xs"
                          defaultValue={"Select your rating"}
                          onChange={(e) => setRating(e.target.value)}>
                          <option disabled>Select...</option>
                          <option value={1}>1 - Poor</option>
                          <option value={2}>2 - Fair</option>
                          <option value={3}>3 - Good</option>
                          <option value={4}>4 - Very Good</option>
                          <option value={5}>5 - Excellent</option>
                        </select>
                      </div>
                      <div>
                        <p>Comment</p>
                        <textarea
                          className="textarea textarea-bordered w-full"
                          placeholder="Comment"
                          value={comment}
                          onChange={(e) =>
                            setComment(e.target.value)
                          }></textarea>
                      </div>
                      <button className="btn w-full">submit</button>
                    </form>
                  ) : (
                    <Alert
                      content={`Please log in to write a review`}
                      status="alert"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Product;

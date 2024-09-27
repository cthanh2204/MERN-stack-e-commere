import { Link, useNavigate, useParams } from "react-router-dom";
// import products from "../products";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { detailProductAction } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { productDetailSelector } from "../redux/selector/selectors";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/actions/cartAction";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const productDetail = useSelector(productDetailSelector);
  const { loading, product, error } = productDetail;

  useEffect(() => {
    dispatch(detailProductAction(id));
  }, [dispatch, id]);

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

  console.log({ qty });
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
        <div className="grid md:grid-cols-2 gap-2 my-3 ">
          <div className="size-full">
            <img src={product.image} />
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
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Product;

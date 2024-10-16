// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  cartClearAll,
  removeFromCart,
} from "../redux/actions/cartAction";
import { cartSelector, userLoginSelector } from "../redux/selector/selectors";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const { cartItems } = cart;
  const navigate = useNavigate();

  const checkOutHandle = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/shipping");
    }
  };

  const removeFromCartHandle = (id) => {
    dispatch(removeFromCart(id));
  };

  const cartClearAllHandler = () => {
    dispatch(cartClearAll());
  };
  return (
    <>
      <div>
        <div className="lg:w-2/3 flex justify-between">
          <h1 className="pl-4 text-3xl uppercase font-weight">Shopping Cart</h1>
          {cartItems.length !== 0 && (
            <div className="">
              <button
                className="btn btn-ghost uppercase"
                onClick={() => cartClearAllHandler()}>
                Clear all Items
              </button>
            </div>
          )}
        </div>
        {cartItems.length === 0 ? (
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Your cart is empty.</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="grid md:grid-cols-5 gap-5 border-b-2 mx-2 my-2">
                  <div className="size-full">
                    <img src={item.image} />
                  </div>
                  <div>
                    <p className="">{item.name}</p>
                    <p className="">{item.description}</p>
                  </div>
                  <div>
                    <select
                      className="select select-bordered select-sm w-full max-w-xs"
                      defaultValue={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }>
                      <option>{item.qty}</option>
                      {Array.from({ length: item.countInStock }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p>${(item.price * Number(item.qty)).toFixed(2)}</p>
                  </div>
                  <div>
                    <i
                      className="fa-solid fa-trash hover:text-red-600 cursor-pointer text-xl"
                      onClick={() => removeFromCartHandle(item.product)}></i>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full">
              <div className="border-2 my-2 p-2">
                <h1 className="text-3xl uppercase font-weight">
                  Subtotal (
                  {cartItems.reduce((acc, item) => {
                    return acc + Number(item.qty);
                  }, 0)}
                  ) items
                </h1>

                <div className="">
                  <p>
                    Total: $
                    {cartItems
                      .reduce((acc, item) => {
                        return acc + item.price * Number(item.qty);
                      }, 0)
                      .toFixed(2)}
                  </p>
                  <button
                    className="btn w-full uppercase"
                    onClick={checkOutHandle}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

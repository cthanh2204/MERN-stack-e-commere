import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToCart } from "../redux/actions/cartAction";
import { cartSelector } from "../redux/selector/selectors";

const Cart = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty");
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { cartItems } = cart;
  useEffect(() => {
    console.log("useEffect triggered with ID:", id, "and qty:", qty); // Debug log

    if (id) {
      // Dispatch the addToCart action
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <>
      <div>
        <h1 className="pl-4 text-3xl uppercase font-weight">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>Your cart is empty</div>
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
                    <i className="fa-solid fa-trash hover:text-red-600 cursor-pointer"></i>{" "}
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
                    {cartItems.reduce((acc, item) => {
                      return acc + item.price * Number(item.qty);
                    }, 0)}
                  </p>
                  <button className="btn w-full uppercase">
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

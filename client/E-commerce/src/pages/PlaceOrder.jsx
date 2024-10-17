import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  orderCreateSelector,
  userLoginSelector,
} from "../redux/selector/selectors";
import CheckoutStep from "../components/CheckoutStep";
import { orderCreateAction } from "../redux/actions/orderAction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PlaceOrder = () => {
  const cart = useSelector(cartSelector);
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const orderCreate = useSelector(orderCreateSelector);
  const { order, success, error } = orderCreate;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // calculate price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems
      .reduce((acc, item) => {
        return acc + item.price * Number(item.qty);
      }, 0)
      .toFixed(2)
  );

  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number(0.15 * itemsPrice));
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    if (success) {
      navigate(`/order/${order._id}`);
      return;
    }
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      orderCreateAction({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };
  return (
    <div>
      <div className="flex justify-center items-center flex-col mt-24 lg:w-full mx-auto">
        <div className="mb-10">
          <CheckoutStep step1={true} step2={true} step3={true} />
        </div>
        <div>
          <h1 className="pl-4 text-3xl uppercase font-weight">Place Order</h1>
        </div>

        {/* Place order Table */}
        <div className="w-full grid md:grid-cols-3 gap-6">
          <div className="grid md:col-span-2">
            <div className="border-b-2">
              <h1 className="pl-4 text-2xl uppercase font-weight">Shipping</h1>
              <div className="py-6">
                <p className="pl-4">
                  <b>Address: </b>
                  {shippingAddress?.address}, {shippingAddress?.city}{" "}
                  {shippingAddress?.postalCode}, {shippingAddress?.country}
                </p>
              </div>
            </div>
            <div className="border-b-2 mt-4">
              <h1 className="pl-4 text-2xl uppercase font-weight">
                Payment Method
              </h1>
              <p className="pl-4 py-6">
                <b>Method: </b>
                {paymentMethod}
              </p>
            </div>
            <div className=" mt-4">
              <h1 className="pl-4 text-2xl uppercase font-weight">
                Order Items
              </h1>
              <div>
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="grid grid-cols-3 gap-4 border-b-2 mx-2 my-2">
                    <div className="size-20">
                      <img src={item.image} />
                    </div>
                    <div>
                      <p>{item.name}</p>
                    </div>
                    <div>
                      <p>
                        {item.qty} x ${item.price} = $
                        {(Number(item.qty) * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="border-2 my-2 p-4">
              <h1 className="text-3xl uppercase font-weight my-4">
                Order Summary
              </h1>
              {error && (
                <div role="alert" className="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              <div className="grid grid-cols-2 py-4 border-b-2">
                <b>Items: </b>
                <p>${itemsPrice}</p>
              </div>
              <div className="grid grid-cols-2 py-4 border-b-2">
                <b>Shipping: </b>
                <p>${shippingPrice}</p>
              </div>
              <div className="grid grid-cols-2 py-4 border-b-2">
                <b>Tax: </b>
                <p>${taxPrice}</p>
              </div>
              <div className="grid grid-cols-2 py-4 ">
                <b>Total: </b>
                <p>${totalPrice}</p>
              </div>
              <button onClick={placeOrderHandler} className="btn w-full ">
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

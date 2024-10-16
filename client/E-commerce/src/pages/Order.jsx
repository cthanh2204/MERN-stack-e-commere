import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  orderDetailSelector,
  orderPaySelector,
  userLoginSelector,
} from "../redux/selector/selectors";
import {
  orderDetailAction,
  orderPayAction,
} from "../redux/actions/orderAction";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

const Order = () => {
  // eslint-disable-next-line no-unused-vars
  const [sdkReady, setSdkReady] = useState(false);
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const cart = useSelector(cartSelector);
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const orderDetail = useSelector(orderDetailSelector);
  const { order, loading, error } = orderDetail;
  const orderPay = useSelector(orderPaySelector);
  const { success: successPay } = orderPay;
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      return navigate("/login");
    }

    //Add paypal javascript sdk
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text-javascript";
      script.src = `https://sandbox.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    dispatch(orderDetailAction(id));
    if (!order?.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(
      orderPayAction(id, {
        id: paymentResult.id,
        status: paymentResult.status,
        update_time: paymentResult.update_time,
        email_address: paymentResult.payer.email_address,
      })
    );
    dispatch(orderDetailAction(id));
  };

  return loading ? (
    <Loading />
  ) : error ? (
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
  ) : (
    <div>
      <div className="flex justify-center items-center flex-col mt-24 lg:w-full mx-auto">
        <div>
          <h1 className="pl-4 text-3xl uppercase font-weight">
            Order {order._id}
          </h1>
        </div>

        {/* Place order Table */}
        <div className="w-full grid md:grid-cols-3 gap-6">
          <div className="grid md:col-span-2">
            <div className="border-b-2">
              <h1 className="pl-4 text-2xl uppercase font-weight">Shipping</h1>
              <div className="py-6">
                <p className="pl-4 my-4">
                  <b>Name: </b>
                  {order.user.name}
                </p>
                <p className="pl-4 my-4">
                  <b>Email: </b>
                  {order.user.email}
                </p>
                <p className="pl-4 my-4">
                  <b>Address: </b>
                  {shippingAddress.address}, {shippingAddress.city}{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <div role="alert" className="alert alert-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Your purchase has been confirmed!</span>
                  </div>
                ) : (
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
                    <span>Not Delivered</span>
                  </div>
                )}
              </div>
            </div>
            <div className="border-b-2 mt-4">
              <h1 className="pl-4 text-2xl uppercase font-weight">
                Payment Method
              </h1>
              <div className="py-6">
                <p className="pl-4 my-4">
                  <b>Method: </b>
                  {paymentMethod}
                </p>
                {order?.isPaid ? (
                  <div role="alert" className="alert alert-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Paid on {order.paidAt}</span>
                  </div>
                ) : (
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
                    <span>Not Paid</span>
                  </div>
                )}
              </div>
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
                <p>${order.itemsPrice}</p>
              </div>
              <div className="grid grid-cols-2 py-4 border-b-2">
                <b>Shipping: </b>
                <p>${order.shippingPrice}</p>
              </div>
              <div className="grid grid-cols-2 py-4 border-b-2">
                <b>Tax: </b>
                <p>${order.taxPrice}</p>
              </div>
              <div className="grid grid-cols-2 py-4 ">
                <b>Total: </b>
                <p>${order.totalPrice}</p>
              </div>
              {!order?.isPaid ? (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

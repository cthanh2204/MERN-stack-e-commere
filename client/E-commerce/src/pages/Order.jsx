import { useDispatch, useSelector } from "react-redux";
import {
  orderDeliveredSelector,
  orderDetailSelector,
  orderPaySelector,
  userLoginSelector,
} from "../redux/selector/selectors";
import {
  orderDeliveredAction,
  orderDetailAction,
  orderPayAction,
} from "../redux/actions/orderAction";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import {
  ORDER_DELIVERED_RESET,
  ORDER_PAY_RESET,
} from "../redux/constants/orderConstant";

const Order = () => {
  // eslint-disable-next-line no-unused-vars
  const [sdkReady, setSdkReady] = useState(false);
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const orderDetail = useSelector(orderDetailSelector);
  const { order, loading, error } = orderDetail;
  const orderPay = useSelector(orderPaySelector);
  const { success: successPay } = orderPay;

  const orderDelivered = useSelector(orderDeliveredSelector);
  const { success: successDelivered } = orderDelivered;
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    if (!order || successPay || successDelivered) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(orderDetailAction(id));
    }
  }, [dispatch, successPay, navigate, userInfo, order, successDelivered, id]);

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id, dispatch]);
  const successPaymentHandler = () => {
    dispatch(orderPayAction(id));
  };

  const deliveredHandler = (id) => {
    dispatch(orderDeliveredAction(id));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Alert content={error} status="error" />
  ) : (
    <div>
      <div className="flex justify-center items-center flex-col mt-24 lg:w-full mx-auto">
        <div>
          <h1 className="pl-4 text-2xl uppercase font-weight">
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
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Alert
                    content={`Delivery at ${order.deliveredAt}`}
                    status="alert alert-success"
                  />
                ) : (
                  <Alert content="Not Delivered" status="alert alert-error" />
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
                  {order.paymentMethod}
                </p>
                {order?.isPaid ? (
                  <Alert
                    content={`Paid on ${order.paidAt}`}
                    status="alert alert-success"
                  />
                ) : (
                  <Alert content="Not paid" status="alert alert-error" />
                )}
              </div>
            </div>
            <div className=" mt-4">
              <h1 className="pl-4 text-2xl uppercase font-weight">
                Order Items
              </h1>
              <div>
                {order.orderItems.map((item) => (
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
              {error && <Alert content={error} status="error" />}
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

              {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  className="btn btn-neutral w-full"
                  onClick={() => deliveredHandler(order._id)}>
                  Mark as Delivered
                </button>
              )}
              {userInfo?.isAdmin && !order?.isPaid && !order.isDelivered ? (
                <div role="alert" className="alert alert-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>Warning: The User has not pay the product!</span>
                </div>
              ) : !order?.isPaid ? (
                <button
                  className={`btn-neutral w-full btn`}
                  onClick={successPaymentHandler}>
                  Order
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

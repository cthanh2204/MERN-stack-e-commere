import { useDispatch, useSelector } from "react-redux";
import {
  orderListSelector,
  userLoginSelector,
} from "../redux/selector/selectors";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { orderListAction } from "../redux/actions/orderAction";

const OrderList = () => {
  const orderList = useSelector(orderListSelector);
  const { orders, loading, error } = orderList;
  const dispatch = useDispatch();
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(orderListAction());
    } else {
      navigate("/login");
      return;
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div>
      <h1 className="text-3xl uppercase font-weight">ORDER LIST</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Toast content={error} status="error" />
      ) : (
        <div className="w-full">
          <div className="overflow-x-auto w-full">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {orders.map((order) => (
                  <tr key={order._id}>
                    <th>{order._id}</th>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fa-solid fa-xmark text-red-500"></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fa-solid fa-xmark text-red-500"></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button className="btn btn-secondary mr-2">
                          <i className="fa-solid fa-circle-info"></i>Detail
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;

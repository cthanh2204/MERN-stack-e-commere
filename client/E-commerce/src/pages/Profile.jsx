import { useDispatch, useSelector } from "react-redux";
import {
  myOrdersSelector,
  userDetailSelector,
  userLoginSelector,
  userUpdateProfileSelector,
} from "../redux/selector/selectors";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  userDetailAction,
  userUpdateProfileAction,
} from "../redux/actions/userAction";
import { myOrdersAction } from "../redux/actions/orderAction";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import Toast from "../components/Toast";
const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword2, setShowPassword2] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const userDetail = useSelector(userDetailSelector);
  const { user } = userDetail;
  const userUpdateProfile = useSelector(userUpdateProfileSelector);
  const { error, success } = userUpdateProfile;
  const myOrders = useSelector(myOrdersSelector);
  const { orders, loading: loadingOrders } = myOrders;
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    } else {
      if (!user?.name) {
        dispatch(userDetailAction(`profile`));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  useEffect(() => {
    dispatch(myOrdersAction());
  }, [dispatch]);
  const submitHandle = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowToast(true);
    } else {
      dispatch(
        userUpdateProfileAction({ id: user._id, name, email, password })
      );
      dispatch(userDetailAction("profile"));
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="">
          <h1 className="text-3xl uppercase font-weight">User profile</h1>
          {showToast && (
            <Toast content="Password does not match !!!" status="error" />
          )}
          {error && <Toast content={error} status="error" />}

          {success && (
            <Toast content="Update Profile successfully" status="success" />
          )}
          <form className="" onSubmit={submitHandle}>
            <label className="input input-bordered flex items-center gap-2 my-4 ">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                className="grow "
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-4 ">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-4 ">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                className="grow "
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className="fa-solid fa-eye cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}></i>
            </label>

            <label className="input input-bordered flex items-center gap-2 my-4 ">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword2 ? "text" : "password"}
                className="grow "
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i
                className="fa-solid fa-eye cursor-pointer"
                onClick={() => setShowPassword2(!showPassword2)}></i>
            </label>

            <button className="btn w-full">Update</button>
          </form>
        </div>
        <div className=" lg:col-span-2">
          <h1 className="text-3xl uppercase font-weight">My Order</h1>
          {loadingOrders ? (
            <Loading />
          ) : orders.length === 0 ? (
            <Alert content="You don't have any orders" />
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <th>{order._id}</th>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i className="fa-solid fa-xmark text-red-500 font-bold"></i>
                        )}
                      </td>
                      <th>
                        <Link to={`/order/${order._id}`}>
                          <button className="btn">
                            <i className="fa-solid fa-circle-info"></i>
                            Detail
                          </button>
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

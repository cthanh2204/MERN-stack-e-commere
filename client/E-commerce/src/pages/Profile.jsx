import { useDispatch, useSelector } from "react-redux";
import {
  myOrdersSelector,
  userDetailSelector,
  userLoginSelector,
  userUpdateProfileSelector,
} from "../redux/selector/selectors";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  userDetailAction,
  userUpdateProfileAction,
} from "../redux/actions/userAction";
import { myOrdersAction } from "../redux/actions/orderAction";
import Loading from "../components/Loading";
const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword2, setShowPassword2] = useState("");
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
        dispatch(userDetailAction());
        dispatch(myOrdersAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, orders]);
  const submitHandle = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password do not match", {
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
    } else {
      dispatch(
        userUpdateProfileAction({ id: user._id, name, email, password })
      );
      dispatch(userDetailAction());
    }
  };
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="w-full">
          <h1 className="text-3xl uppercase font-semibold	">User profile</h1>
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
              <span>Error! Task failed successfully.</span>
            </div>
          )}

          {success && (
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
              <span>Update profile successfully</span>
            </div>
          )}
          <form className="" onSubmit={submitHandle}>
            <label className="input input-bordered flex items-center gap-2 my-4 ">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                className="grow"
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
                className="grow w-full"
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
                className="grow w-full"
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
          <h1 className="text-3xl uppercase font-semibold	">My Order</h1>
          {loadingOrders ? (
            <Loading />
          ) : (
            <div className="overflow-x-auto">
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
                          <i className="fa-solid fa-x text-red-500	 font-bold"></i>
                        )}
                      </td>
                      <th>
                        <Link to={`/order/${order._id}`}>
                          <button className="btn">Detail</button>
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
      <ToastContainer />
    </>
  );
};

export default Profile;

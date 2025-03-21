import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRegisterSelector } from "../redux/selector/selectors";
import {
  userDetailAction,
  userRegisterAction,
} from "../redux/actions/userAction";
import Loading from "../components/Loading";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword2, setShowPassword2] = useState("");
  const userRegister = useSelector(userRegisterSelector);
  const { loading, error } = userRegister;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, dispatch]);
  const registerHandle = (e) => {
    e.preventDefault();

    try {
      if (!email || !name || !password) {
        return toast.warning("Please enter all the field", {
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
      }

      dispatch(userRegisterAction(name, email, password));
      dispatch(userDetailAction());
    } catch (error) {
      return toast.error(error.response.data.message, {
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
  };
  return (
    <div className="flex justify-center items-center flex-col mt-24 lg:w-96 mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-3xl uppercase font-semibold	">
            Create an account
          </h1>
          <p className="text-gray-500 text-sm my-2">
            Sign in to access to your account
          </p>
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
          <form className="w-full" onSubmit={registerHandle}>
            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
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

            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
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

            <button className="btn w-full">Register</button>
            <p className="my-2">
              If you already have an account?
              <Link to={"/login"} className="ml-1 font-bold text-gray-600">
                Sign in here
              </Link>
            </p>
          </form>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default SignUp;

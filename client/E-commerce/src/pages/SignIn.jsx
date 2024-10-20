import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLoginSelector } from "../redux/selector/selectors";
import Loading from "../components/Loading";
import { userDetailAction, userLoginAction } from "../redux/actions/userAction";
import Toast from "../components/Toast";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector(userLoginSelector);
  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, dispatch]);
  const loginHandle = (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast.warning("Please enter your email or password", {
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

      dispatch(userLoginAction(email, password));
      dispatch(userDetailAction());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col mt-24 lg:w-96 mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-3xl uppercase font-semibold	">Log in</h1>
          <p className="text-gray-500 text-sm my-2">
            Sign in to access to your account
          </p>
          {error && <Toast content={error} status="error" />}
          <form
            onSubmit={loginHandle}
            className="flex justify-center items-center flex-col w-full">
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
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className="fa-solid fa-eye cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}></i>
            </label>
            <button className="btn w-full">Log In</button>
            <p className="my-2">
              Don&#x27;t have an account yet?
              <Link to={"/register"} className="ml-1 font-bold text-gray-600">
                Sign up
              </Link>
            </p>
          </form>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default SignIn;

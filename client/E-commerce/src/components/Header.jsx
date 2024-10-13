import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  cartSelector,
  userDetailSelector,
  userLoginSelector,
} from "../redux/selector/selectors";
import { userLogOutAction } from "../redux/actions/userAction";

const Header = () => {
  const data = useSelector(cartSelector);
  const userInfoLogin = useSelector(userLoginSelector);
  const userDetail = useSelector(userDetailSelector);
  const { user } = userDetail;
  const { userInfo } = userInfoLogin;
  const { cartItems } = data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandle = () => {
    dispatch(userLogOutAction());
  };
  return (
    <>
      <div className="navbar bg-base-100 container mx-auto ">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl uppercase" to={"/"}>
            ProShop
          </Link>
        </div>

        {/* Search Input */}
        <div className="flex-1">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>
        {/* Cart and profile modal */}
        <div className="flex-none gap-2 ">
          {/* Cart */}
          <Link to={"/cart"}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle ">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems.length === 0 ? null : (
                  <span className="badge badge-sm indicator-item">
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* Profile modal */}
          <div className="dropdown dropdown-end">
            {userInfo ? (
              <details className="dropdown">
                <summary className="btn btn-ghost m-1 uppercase">
                  {user?.name || userInfo.name}
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li className="mb-2">
                    Dark mode
                    <input
                      type="checkbox"
                      value="dark"
                      className="toggle theme-controller"
                    />
                  </li>
                  <li className="mb-2">
                    <button
                      className="btn"
                      onClick={() => navigate("/profile")}>
                      Profile
                    </button>
                  </li>
                  <li className="mb-2">
                    <button className="btn" onClick={logOutHandle}>
                      Log out
                    </button>
                  </li>
                </ul>
              </details>
            ) : (
              <Link to="/login">
                <div role="button" className="btn btn-ghost">
                  <div>Sign in</div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

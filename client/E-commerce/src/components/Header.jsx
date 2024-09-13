import { Link } from "react-router-dom";

const Header = () => {
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
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>

          {/* Profile modal */}
          <div className="dropdown dropdown-end">
            <div role="button" className="btn btn-ghost">
              <Link to="/login">
                <div>Sign in</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
import { useSelector } from "react-redux";
import { userLoginSelector } from "../redux/selector/selectors";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (!userInfo.isAdmin) {
      navigate("/");
      return;
    }
  }, [navigate, userInfo]);
  return (
    <div>
      <h1 className="text-3xl uppercase font-weight">Admin management</h1>
      <div className="grid md:grid-cols-3 gap-3 my-4">
        <div>
          <div className="card bg-base-100 w-96 shadow-xl hover:bg-gray-300 ease-in duration-300 ">
            <Link to="/admin/users-list">
              <div className="card-body">
                <h2 className="card-title">
                  <i className="fa-solid fa-users"></i> USERS LIST
                </h2>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div className="card bg-base-100 w-96 shadow-xl hover:bg-gray-300 ease-in duration-300">
            <Link to="/admin/products-list">
              <div className="card-body">
                <h2 className="card-title">
                  <i className="fa-solid fa-boxes-packing"></i> PRODUCTS LIST
                </h2>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div className="card bg-base-100 w-96 shadow-xl hover:bg-gray-300 ease-in duration-300">
            <Link to="/admin/orders-list">
              <div className="card-body">
                <h2 className="card-title">
                  <i className="fa-solid fa-bag-shopping"></i> ORDERS LIST
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

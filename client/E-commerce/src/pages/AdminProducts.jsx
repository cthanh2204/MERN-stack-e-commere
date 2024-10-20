import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { listProductsAction } from "../redux/actions/productAction";
import Loading from "../components/Loading";
import Toast from "../components/Toast";
import {
  productListSelector,
  userLoginSelector,
} from "../redux/selector/selectors";

const AdminProducts = () => {
  const productList = useSelector(productListSelector);
  const { loading, products, error } = productList;
  const dispatch = useDispatch();
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProductsAction());
    } else {
      navigate("/login");
      return;
    }
  }, [dispatch, navigate, userInfo]);

  // const deleteUserHandle = (id) => {
  //   dispatch(userDeleteAction(id));
  // };

  console.log(products);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl uppercase font-weight">PRODUCT LIST</h1>
        <button className="btn btn-outline">
          <i className="fa-solid fa-circle-plus"></i> CREATE PRODUCT
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Toast content={error} status="error" />
      ) : (
        <div>
          <div className="overflow-x-auto w-full">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>QUANTITIES</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {products.map((product) => (
                  <tr key={product._id}>
                    <th>{product._id}</th>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      <Link to={`/admin/product/${product._id}`}>
                        <button className="btn btn-secondary mr-2">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button className="btn btn-error">
                        <i className="fa-solid fa-trash"></i>
                      </button>
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

export default AdminProducts;

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteProductAction,
  listProductsAction,
  productCreateAction,
} from "../redux/actions/productAction";
import Loading from "../components/Loading";
import Toast from "../components/Toast";
import {
  productCreateSelector,
  productDeleteSelector,
  productListSelector,
  userLoginSelector,
} from "../redux/selector/selectors";
import { PRODUCT_CREATE_RESET } from "../redux/constants/productConstant";

const ProductList = () => {
  const productList = useSelector(productListSelector);
  const { loading, products, error } = productList;
  const productDelete = useSelector(productDeleteSelector);
  const {
    loading: productDeleteLoading,
    error: productDeleteError,
    success: productDeleteSuccess,
  } = productDelete;
  const dispatch = useDispatch();
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const productCreate = useSelector(productCreateSelector);
  const { success: successCreate, product: productCreated } = productCreate;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
      return;
    }
    if (successCreate) {
      navigate(`/admin/product/${productCreated._id}`);
    } else {
      dispatch(listProductsAction());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    productDeleteSuccess,
    successCreate,
    productCreated,
  ]);

  const deleteProductHandle = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProductAction(id));
    }
  };

  const createProductHandle = () => {
    dispatch(productCreateAction());
  };

  console.log(products);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl uppercase font-weight">PRODUCT LIST</h1>
        <button className="btn btn-outline" onClick={createProductHandle}>
          <i className="fa-solid fa-circle-plus"></i> CREATE PRODUCT
        </button>
      </div>
      {productDeleteLoading && <Loading />}
      {productDeleteError && <Toast content={error} status="error" />}
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
                      <button
                        className="btn btn-error"
                        onClick={() => deleteProductHandle(product._id)}>
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

export default ProductList;
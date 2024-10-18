import { useEffect } from "react";
import CardProduct from "../components/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAction } from "../redux/actions/productAction";
import { productListSelector } from "../redux/selector/selectors";
import Loading from "../components/Loading";
const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector(productListSelector);
  const { loading, products, error } = productList;
  useEffect(() => {
    dispatch(listProductsAction());
  }, [dispatch]);
  return (
    <div className="">
      <h1 className="text-3xl uppercase font-weight">Latest Product</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="grid grid-cols-1 gap-4 my-4  xl:grid-cols-4 md:grid-cols-3">
          {products.map((product) => (
            <CardProduct product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

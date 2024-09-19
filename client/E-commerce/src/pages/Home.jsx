import { useEffect } from "react";
import CardProduct from "../components/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAction } from "../redux/actions/productAction";
import { productListSelector } from "../redux/selector/productSelector";
const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector(productListSelector);
  const { loading, products, error } = productList;
  useEffect(() => {
    listProductsAction(dispatch);
  }, [listProductsAction]);
  return (
    <div className="">
      <h1 className="pl-4 text-3xl uppercase font-weight">Latest Product</h1>
      {loading ? (
        <div className="flex items-center  justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="grid grid-cols-1 gap-4 my-4 px-4 xl:grid-cols-4 md:grid-cols-3">
          {products.map((product) => (
            <CardProduct product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

import { useEffect } from "react";
import CardProduct from "../components/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAction } from "../redux/actions/productAction";
import { productListSelector } from "../redux/selector/selectors";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Pagination from "../components/Pagination";
import Carousel from "../components/Carousel";
import Meta from "../components/Meta";

const Home = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;

  const productList = useSelector(productListSelector);
  const { loading, products, error, pages, page } = productList;
  useEffect(() => {
    dispatch(listProductsAction(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <div>
      <Meta />
      {!keyword && <Carousel />}
      <h1 className="text-3xl uppercase font-weight">Latest Product</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert content={error} status="alert" />
      ) : (
        <div className="grid grid-cols-1 xl:gap-4 my-4  xl:grid-cols-4 md:grid-cols-3">
          {products.map((product) => (
            <CardProduct product={product} key={product._id} />
          ))}
        </div>
      )}
      <Pagination page={page} pages={pages} />
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
// import products from "../products";
import axios from "axios";
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  console.log({ products });
  return (
    <div>
      <h1 className="pl-4 text-3xl uppercase font-weight">Latest Product</h1>

      <div className="grid grid-cols-1 gap-4 my-4 px-4 xl:grid-cols-4 md:grid-cols-3">
        {/* <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct /> */}
        {products.map((product) => (
          <CardProduct product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;

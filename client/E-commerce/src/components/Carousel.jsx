import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productCarouselSelector } from "../redux/selector/selectors";
import { productCarouselAction } from "../redux/actions/productAction";
import Loading from "./Loading";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const CarouselTop = () => {
  const dispatch = useDispatch();
  const productCarousel = useSelector(productCarouselSelector);
  const { loading, error, products } = productCarousel;
  useEffect(() => {
    dispatch(productCarouselAction());
  }, [dispatch]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Alert content={error} status="alert alert-error" />
  ) : (
    <div>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all 0.05"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px">
        {products.map((product) => (
          <div key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img src={product.image} className="w-full" />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselTop;

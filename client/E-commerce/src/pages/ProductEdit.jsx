import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  productDetailSelector,
  productUpdateSelector,
  userLoginSelector,
} from "../redux/selector/selectors";
import Toast from "../components/Toast";
import Loading from "../components/Loading";
import {
  detailProductAction,
  productUpdateAction,
} from "../redux/actions/productAction";
import { PRODUCT_UPDATE_RESET } from "../redux/constants/productConstant";

const ProductEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const { id } = useParams();
  const productDetail = useSelector(productDetailSelector);
  const { product, error: productDetailError, loading } = productDetail;
  const productUpdate = useSelector(productUpdateSelector);
  const {
    loading: loadingUpdated,
    error: errorUpdated,
    success: successUpdated,
  } = productUpdate;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
      return;
    } else {
      if (successUpdated) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        navigate("/admin/products-list");
        return;
      } else {
        if (!product?.name || product._id !== id) {
          dispatch(detailProductAction(id));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    }
  }, [dispatch, navigate, userInfo, id, product, successUpdated]);

  const uploadImageHandle = (pic) => {
    setUploading(true);
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const formData = new FormData();
      formData.append("file", pic);
      formData.append("upload_preset", "pro-shop");
      formData.append("cloud_name", "damqu5yjv");

      fetch("https://api.cloudinary.com/v1_1/damqu5yjv/image/upload", {
        method: "post",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setImage(data.url.toString());
          console.log(data.url.toString());
          setUploading(false);
        })
        .catch((error) => {
          console.log(error);
          <Toast content={error} status="error" />;
          setUploading(false);
        });
    } else {
      setUploading(false);
      <Toast content="Upload fail" status="error" />;
      return;
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(
      productUpdateAction(id, {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  return (
    <div>
      <div>
        <Link to="/admin/products-list" className="btn btn-ghost">
          Go back
        </Link>
      </div>

      <div className="flex justify-center items-center flex-col lg:w-96 mx-auto">
        {loading ? (
          <Loading />
        ) : productDetailError ? (
          <Toast content={productDetailError} status="error" />
        ) : (
          <div className="w-full">
            <h1 className="text-3xl uppercase font-semibold	">Edit Product</h1>
            {loadingUpdated && <Loading />}
            {errorUpdated && <Toast content={errorUpdated} status="error" />}
            <form className="w-full" onSubmit={submitHandle}>
              <span className="font-bold">Name</span>
              <label className="input input-bordered flex items-center gap-2 my-2 w-full">
                <i className="fa-solid fa-cube"></i>
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <span className="font-bold">Price</span>
              <label className="input input-bordered flex items-center gap-2 my-2 w-full">
                <i className="fa-solid fa-dollar-sign"></i>{" "}
                <input
                  type="text"
                  className="grow"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>

              <span className="font-bold">Image</span>
              <label className="input input-bordered flex items-center gap-2 my-2 w-full">
                <i className="fa-solid fa-image"></i>{" "}
                <input
                  type="text"
                  className="grow"
                  placeholder="Image"
                  value={image}
                  readOnly
                />
              </label>
              <div>
                <input
                  type="file"
                  className="file-input w-full max-w-xs"
                  onChange={(e) => uploadImageHandle(e.target.files[0])}
                />
                {uploading && <Loading />}
              </div>

              <span className="font-bold">Brand</span>
              <label className="input input-bordered flex items-center gap-2 my-2 w-full">
                <i className="fa-solid fa-tag"></i>{" "}
                <input
                  type="text"
                  className="grow"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </label>

              <span className="font-bold">Count In Stock</span>
              <label className="input input-bordered flex items-center gap-2 my-2 w-full">
                <i className="fa-solid fa-boxes-stacked"></i>
                <input
                  type="text"
                  className="grow"
                  placeholder="Count In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </label>

              <span className="font-bold">Category</span>
              <label className="input input-bordered flex items-center gap-2 my-2 w-full">
                <i className="fa-solid fa-layer-group"></i>{" "}
                <input
                  type="text"
                  className="grow"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </label>

              <span className="font-bold">Description</span>
              <label className="input input-bordered flex items-center gap-2 my-2 w-full">
                <i className="fa-solid fa-audio-description"></i>{" "}
                <input
                  type="text"
                  className="grow"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <button className="btn w-full">Update</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductEdit;

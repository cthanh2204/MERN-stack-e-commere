import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, userLoginSelector } from "../redux/selector/selectors";
import { saveShippingAddress } from "../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "../components/CheckoutStep";

const Shipping = () => {
  const cart = useSelector(cartSelector);
  const { shippingAddress } = cart;
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const [country, setCountry] = useState(shippingAddress?.country);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div className="flex justify-center items-center flex-col mt-24 lg:w-96 mx-auto">
      <div className="mb-10">
        <CheckoutStep step1={userInfo ? true : false} />
      </div>
      <div>
        <h1 className="pl-4 text-3xl uppercase font-weight">Shipping</h1>
      </div>
      <div className="w-full">
        <form className="w-full" onSubmit={submitHandle}>
          <label className="input input-bordered flex items-center gap-2 my-4 w-full">
            <i className="fa-solid fa-earth-americas"></i>
            <input
              type="text"
              className="grow w-full"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 my-4 w-full">
            <i className="fa-solid fa-city"></i>
            <input
              type="text"
              className="grow"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 my-4 w-full">
            <i className="fa-solid fa-address-card"></i>
            <input
              type="text"
              className="grow"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 my-4 w-full">
            <i className="fa-brands fa-usps"></i>
            <input
              type="text"
              className="grow w-full"
              placeholder="PostalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </label>

          <button className="btn w-full">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;

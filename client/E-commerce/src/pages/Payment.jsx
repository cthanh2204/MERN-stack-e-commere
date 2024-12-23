import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/CheckoutStep";
import { cartSelector, userLoginSelector } from "../redux/selector/selectors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../redux/actions/cartAction";

const Payment = () => {
  const cart = useSelector(cartSelector);
  const { shippingAddress } = cart;
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (!shippingAddress) {
      navigate("/shipping");
      return;
    }
  }, [navigate, userInfo, shippingAddress]);
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };
  return (
    <div>
      <div className="flex justify-center items-center flex-col mt-24 lg:w-96 mx-auto">
        <div className="mb-10">
          <CheckoutStep step1={true} step2={true} />
        </div>
        <div>
          <h1 className="pl-4 text-3xl uppercase font-weight">Payment</h1>
        </div>
        <div className="w-full">
          <form className="w-full" onSubmit={submitHandle}>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-base">
                  <i className="fa-brands fa-paypal"></i> Cash On Delivery (COD)
                </span>
                <input
                  type="radio"
                  name="radio-10"
                  value="COD"
                  className="radio"
                  defaultChecked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-base">
                  <i className="fa-brands fa-cc-stripe" disabled></i> Paypal or
                  credit card
                </span>
                <input
                  disabled
                  type="radio"
                  name="radio-10"
                  value="Paypal"
                  className="radio"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </label>
            </div>
            <button className="btn w-full">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;

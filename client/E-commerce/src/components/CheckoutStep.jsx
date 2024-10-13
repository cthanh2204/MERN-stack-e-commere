import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CheckoutStep = ({ step1, step2, step3 }) => {
  return (
    <div>
      <div role="tablist" className="tabs tabs-bordered">
        {step1 ? (
          <Link to="/shipping" className="tab tab-active ">
            Shipping
          </Link>
        ) : (
          <Link role="tab" className="tab tab-disabled">
            Shipping
          </Link>
        )}

        {step2 ? (
          <Link to="/payment" className="tab tab-active ">
            Payment
          </Link>
        ) : (
          <Link role="tab" className="tab tab-disabled">
            Payment
          </Link>
        )}

        {step3 ? (
          <Link to="/place-order" className="tab tab-active ">
            Place Order
          </Link>
        ) : (
          <Link role="tab" className="tab tab-disabled">
            Place Order
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutStep;

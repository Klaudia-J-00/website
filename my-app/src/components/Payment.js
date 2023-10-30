import "./style/Profile.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/CartActions";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!shippingAddress) {
    navigate("/delivery");
  }

  const [paymentMethod, setPaymentMethod] = useState(localStorage.getItem("paymentMethod") || "");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center text-center">
          <form className="col-md-8 col-lg-4 col-11 m-5 delivery p-5" onSubmit={submitHandler}>
            <h4 className="shipment-data">Wybierz metodę płatności</h4>
            <div className="payment-method">
              <div className="radio-container">
                <div className="radio-wrapper my-2">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    value="paypal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paypal">⠀PayPal lub przelew</label>
                </div>
                <div className="radio-wrapper my-2 mb-5">
                  <input
                    type="radio"
                    id="cash"
                    name="payment"
                    value="cash"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cash">⠀Gotówką przy odbiorze</label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn">
              DALEJ
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;

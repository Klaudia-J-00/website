import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style/Profile.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../Redux/Actions/CartActions";

const Delivery = () => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart || {};

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress?.phoneNumber || "");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, phoneNumber }))
    navigate("/payment")
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-4 col-11 m-5 delivery p-5">
            <h4 className="shipment-data">Dane do dostawy</h4>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Podaj adres"
                className="form-control my-2"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Podaj miasto"
                className="form-control my-2"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            <input
                type="text"
                placeholder="Podaj kod pocztowy"
                className="form-control my-2"
                value={postalCode}
                required
                pattern="[0-9]{2}-[0-9]{3}"
                onChange={(e) => {
                    const regex = /^(\d{0,2})(\d{0,3})$/;
                    const match = e.target.value.replace(/\D/g, '').match(regex);
                    const formattedPostalCode = match ? `${match[1]}-${match[2]}` : '';
                    setPostalCode(formattedPostalCode);
                }}
            />
            <input
                type="text"
                placeholder="Podaj numer telefonu"
                className="form-control my-2 mb-5"
                value={phoneNumber}
                required
                onChange={(e) => {
                    const regex = /^(\d{0,3})(\d{0,3})(\d{0,3})$/;
                    const match = e.target.value.replace(/\D/g, '').match(regex);
                    const formattedPhoneNumber = match ? `${match[1]}-${match[2]}-${match[3]}` : '';
                    setPhoneNumber(formattedPhoneNumber);
                }}
            />
              <button type="submit" className="btn">
                DALEJ
              </button>
            </form>
          </div>
        </div>
        <div className="row justify-content-center text-center m-5">
          <div className="col-lg-12">
            <h6>Chcesz edytować swój koszyk?</h6>
            <Link to="/basket" className="link-payment">
              <button className="btn">POWRÓT</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;

import { Link, useNavigate } from "react-router-dom";
import "./style/PlaceOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faTruck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/LoadingError/Error";
import { useEffect, useState } from "react";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import { createOrder } from "../Redux/Actions/OrderActions";

const PlaceOrder = () => {
  window.scrollTo(0, 0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const [paymentMethod, setPaymentMethod] = useState("");

  console.log('CART',cart)

  useEffect(() => {
    const storedPaymentMethod = localStorage.getItem("paymentMethod");
    setPaymentMethod(storedPaymentMethod)
  }, []);

  //calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  cart.shippingPrice = addDecimals(12.99);
  cart.taxPrice = addDecimals(Number((0.23 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));

  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => { 
    if (success) {
      navigate(`/order/${order._id}`)
      dispatch({type: "ORDER_CREATE_RESET"})
    }
  }, [navigate, dispatch, success, order, paymentMethod])


  const placeOrderHandler = (e) => {
    dispatch(createOrder({
      orderItems: cart.cartItems.map((item) => ({
        product: item.product,
        title: item.title,
        price: item.price,
        qty: item.qty,
        image_src: item.image_src, // Use 'image_src' instead of 'image'
      })),
      shippingAddress: {
        address: cart.shippingAddress.address,
        city: cart.shippingAddress.city,
        postalCode: cart.shippingAddress.postalCode,
        phoneNumber: cart.shippingAddress.phoneNumber,
      },
      paymentMethod: paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }))
    
  };

  return (
    <>
      <div className="container place-order">
        <div className="row order-info m-3">
          <div className="col-3 m-5">
            <div className="row">
              <div className="col-4">
                <div className="d-flex justify-content-center text-center align-items-center btn-circle-two col-12">
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className="place-order-icon"
                  />
                </div>
              </div>
              <div className="col-8">
                <h3 className="mb-3">Klient</h3>
                <p className="credentials">{userInfo.name}</p>
                <p className="credentials">{userInfo.surname}</p>
                <p className="credentials">{userInfo.email}</p>
              </div>
            </div>
          </div>
          <div className="col-3 m-5">
            <div className="row">
              <div className="col-4">
                <div className="d-flex justify-content-center text-center align-items-center btn-circle-two col-12">
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="place-order-icon"
                  />
                </div>
              </div>
              <div className="col-8">
                <h3 className="mb-3">Informacje</h3>
                <p className="credentials">
                  <b>Dostawa:</b> DHL
                </p>
                <p className="credentials">
                  <b>Płatność:</b> {paymentMethod.trim() === '"cash"' ? "Gotówka" : "Przelew"}
                </p>
                <p className="credentials">
                  <b>Numer telefonu:</b> {cart.shippingAddress.phoneNumber}
                </p>
              </div>
            </div>
          </div>
          <div className="col-3 m-5">
            <div className="row">
              <div className="col-4">
                <div className="btn-circle-two col-12 d-flex justify-content-center text-center align-items-center">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="place-order-icon"
                  />
                </div>
              </div>
              <div className="col-8">
                <h3 className="mb-3">Adres</h3>
                <p className="credentials">{cart.shippingAddress.address}</p>
                <p className="credentials">{cart.shippingAddress.city}</p>
                <p className="credentials">{cart.shippingAddress.postalCode}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row header-row">
          {cart.cartItems.length === 0 ? (
            <Message variant="alert-info mt-5">Twój koszyk jest pusty!</Message>
          ) : (
            <>
              {cart.cartItems.map((item, index) => (
                <div className="col-12 col-md-8 mb-5" key={index}>
                  <div className="row particular-product align-items-center">
                    <div className="col-3 text-center">
                      <img
                        src={item.image_src}
                        className="product-image-basket img-fluid"
                        alt={item.title}
                      />
                    </div>
                    <div className="col-3 text-center">
                      <Link to={`/products/${item.product}`}>{item.title}</Link>
                    </div>
                    <div className="col-2 text-center">
                      <h6>ILOŚĆ</h6>
                      {item.qty}
                    </div>
                    <div className="col-2 text-center">
                      <h6>SUMA CZĘŚCIOWA</h6>
                      {(item.qty * item.price).toFixed(2)} zł
                    </div>
                    <hr className="line-two my-2"></hr>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="col-12 col-md-4">
            <div className="row summary-order text-center mx-5">
              <table>
                <tbody>
                  <tr>
                    <th>Cena netto</th>
                    <td>{cart.itemsPrice}zł</td>
                  </tr>

                  <tr>
                    <th>Dostawa</th>
                    <td>{cart.shippingPrice} zł</td>
                  </tr>
                  <tr>
                    <th>Podatek</th>
                    <td>{cart.taxPrice} zł</td>
                  </tr>
                  <tr>
                    <th>Łącznie</th>
                    <td>{cart.totalPrice} zł</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {cart.cartItems.length === 0 ? null : (
              <>
                <div className="row justify-content-center align-items-center d-flex m-3 mt-5">
                  <div className="col-6">
                    <button className="btn" type="submit" onClick={placeOrderHandler}>ZAMÓW</button>
                  </div>
                </div>
              </>
            )}
            {
              error && <Message variant="alert-danger">{error}</Message>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;

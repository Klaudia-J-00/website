import { Link, useParams } from "react-router-dom";
import "./style/PlaceOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faTruck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/LoadingError/Error";
import { useEffect } from "react";
import Loading from "../components/LoadingError/Loading";
import { getOrderDetails } from "../Redux/Actions/OrderActions";
import moment from "moment";
import "moment/locale/pl";

const Order = () => {
  window.scrollTo(0, 0);

  const orderId = useParams().id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  if (!order) {
    return <Message variant="danger">Nie znaleziono zamówienia</Message>;
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  order.itemsPrice = addDecimals(
    order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  order.shippingPrice = addDecimals(12.99);
  order.taxPrice = addDecimals(Number((0.23 * order.itemsPrice).toFixed(2)));
  order.totalPrice = addDecimals(
    Number(order.itemsPrice) + Number(order.shippingPrice) + Number(order.taxPrice)
  );

  return (
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
              <p className="credentials">{order.user.name}</p>
              <p className="credentials">{order.user.surname}</p>
              <p className="credentials">{order.user.email}</p>
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
                <b>Płatność: </b>
                {order.paymentMethod.trim() === '"cash"' ? "Gotówka" : "Przelew"}
              </p>
              <p className="credentials">
                <b>Numer telefonu: </b>
                {order.shippingAddress.phoneNumber}
              </p>
              <p className={order.isPaid ? "green" : "red"}>
                {order.isPaid
                  ? `Opłacono ${moment(order.paidAt).calendar()}`
                  : "Nie opłacono"}
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
              <p className="credentials">{order.shippingAddress.address}</p>
              <p className="credentials">{order.shippingAddress.city}</p>
              <p className="credentials">{order.shippingAddress.postalCode}</p>
              <p className={order.isDelivered ? "green" : "red"}>
                {order.isDelivered
                  ? `Wysłano ${moment(order.deliveredAt).calendar()}`
                  : "Nie wysłano"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row header-row">
        {order.orderItems.length === 0 ? (
          <Message variant="danger">Brak zamówień</Message>
        ) : (
          <>
            {order.orderItems.map((item, index) => (
              <>
                <div className="col-12 col-md-12 mb-5" key={index}>
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
                    <div className="col-3 text-center">
                      <h6>ILOŚĆ</h6>
                      {item.qty}
                    </div>
                    <div className="col-3 text-center">
                      <h6>SUMA CZĘŚCIOWA</h6>
                      {(item.qty * item.price).toFixed(2)} zł
                    </div>
                    <hr className="line-two my-2"></hr>
                  </div>
                </div>
              </>
            ))}
          </>
        )}
      </div>

      <div className="col-12 text-center d-flex align-items-center justify-content-center">
        <h6>Detale dotyczące ceny: </h6>
      </div>
      <div className="row text-center m-3">
        <div className="col-12 text-center d-flex align-items-center justify-content-center">
          <table className="summary-order mb-5">
            <tbody>
              <tr>
                <th>Cena netto</th>
                <td>{order.itemsPrice}zł</td>
                <th>Dostawa</th>
                <td>{order.shippingPrice} zł</td>
              </tr>
              <tr>
                <th>Podatek</th>
                <td>{order.taxPrice} zł</td>
                <th>Łącznie</th>
                <td>{order.totalPrice} zł</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row justify-content-center align-items-center d-flex m-3 mt-5">
        <div className="col-6 text-center mb-5">
          <h6>Nie opłaciłeś jeszcze zamówienia? Zrób to tutaj: </h6>
          <button className="btn btn-paypal">
            <img
              src="./img/PayPal.svg.png"
              alt="paypal"
              className="paypal-img img-fluid"
            />
          </button>
          <p></p>
          <button className="btn btn-transfer">Przelew</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
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
import { useEffect, useState } from "react";
import Loading from "../components/LoadingError/Loading";
import { getOrderDetails, payOrder } from "../Redux/Actions/OrderActions";
import moment from "moment";
import "moment/locale/pl";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
import axios from "axios";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const Order = () => {
  window.scrollTo(0, 0);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const orderId = useParams().id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const [clientId, setClientId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: clientData } = await axios.get("/api/config/paypal");
        setClientId(clientData.clientId);
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": clientData.clientId, currency: "PLN" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      } catch (error) {
        // Handle error fetching client ID
        console.error("Error fetching PayPal client ID:", error);
      }
    };

    fetchData();

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, order, clientId]);

  const succesPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

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
    Number(order.itemsPrice) +
      Number(order.shippingPrice) +
      Number(order.taxPrice)
  );

  return (
    <div className="container place-order">
      <div className="row order-info m-3">
        <div className="col-12 col-md-3 m-5 info-mobile">
          <div className="row">
            <div className="col-12 col-md-4 d-flex justify-content-center text-center align-items-center">
              <div className="d-flex justify-content-center text-center align-items-center btn-circle-two col-12">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="place-order-icon"
                />
              </div>
            </div>
            <div className="col-12 col-md-8">
              <h3 className="mb-3">Klient</h3>
              <p className="credentials">{order.user.name}</p>
              <p className="credentials">{order.user.surname}</p>
              <p className="credentials">{order.user.email}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3 m-5 info-mobile">
          <div className="row">
            <div className="col-12 col-md-4 d-flex justify-content-center text-center align-items-center">
              <div className="d-flex justify-content-center text-center align-items-center btn-circle-two col-12">
                <FontAwesomeIcon icon={faTruck} className="place-order-icon" />
              </div>
            </div>
            <div className="col-12 col-md-8">
              <h3 className="mb-3">Informacje</h3>
              <p className="credentials">
                <b>Dostawa:</b> DHL
              </p>
              <p className="credentials">
                <b>Płatność: </b>
                {order.paymentMethod.trim() === '"cash"'
                  ? "Gotówka"
                  : "Przelew"}
              </p>
              <p className="credentials">
                <b>Numer telefonu: </b>
                {order.shippingAddress.phoneNumber}
              </p>
              <div className="text-center">
                <p className={order.isPaid ? "green" : "red"}>
                  {order.isPaid
                    ? `Opłacono: ${moment(order.paidAt).calendar()}`
                    : "Nie opłacono"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3 m-5 info-mobile">
          <div className="row">
            <div className="col-12 col-md-4 d-flex justify-content-center text-center align-items-center">
              <div className="d-flex justify-content-center text-center align-items-center btn-circle-two col-12">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="place-order-icon"
                />
              </div>
            </div>
            <div className="col-12 col-md-8">
              <h3 className="mb-3">Adres</h3>
              <p className="credentials">{order.shippingAddress.address}</p>
              <p className="credentials">{order.shippingAddress.city}</p>
              <p className="credentials">{order.shippingAddress.postalCode}</p>
              <div className="text-center">
                <p className={order.isDelivered ? "green" : "red"}>
                  {order.isDelivered
                    ? `Wysłano: ${moment(order.deliveredAt).calendar()}`
                    : "Nie wysłano"}
                </p>
              </div>
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
                <div className="col-12 mb-5" key={index}>
                  <div className="row particular-product align-items-center">
                    <div className="col-12 col-md-3 text-center m-1">
                      {item.image_src == "custom" ? (
                        <>
                          <p>
                            Baza klawiatury: <b>{item.baseColor[0].name}</b>{" "}
                          </p>
                          <div className="d-flex justify-content-center mb-3">
                            <div
                              className="dot"
                              style={{
                                backgroundColor: `${item.baseColor[0].color}`,
                              }}
                            />
                          </div>
                          <p>
                            Wnętrze bazy klawiatury:{" "}
                            <b>{item.insideBaseColor[0].name}</b>
                          </p>
                          <div className="d-flex justify-content-center mb-3">
                            <div
                              className="dot"
                              style={{
                                backgroundColor: `${item.insideBaseColor[0].color}`,
                              }}
                            />
                          </div>
                          <p>
                            Klawisze główne: <b>{item.keyColor[0].name}</b>
                          </p>
                          <div className="d-flex justify-content-center mb-3">
                            <div
                              className="dot"
                              style={{
                                backgroundColor: `${item.keyColor[0].color}`,
                              }}
                            />
                          </div>
                          <p>
                            Dodatkowe klawisze:{" "}
                            <b>{item.keyOtherColor[0].name}</b>
                          </p>
                          <div className="d-flex justify-content-center mb-2">
                            <div
                              className="dot"
                              style={{
                                backgroundColor: `${item.keyOtherColor[0].color}`,
                              }}
                            />
                          </div>
                          {item.title === "numpad" ? (
                            <></>
                          ) : (
                            <>
                              <p>
                                Klawisze akcesoryjne:{" "}
                                <b>{item.keyThirdColor[0].name}</b>
                              </p>
                              <div className="d-flex justify-content-center mb-2">
                                <div
                                  className="dot"
                                  style={{
                                    backgroundColor: `${item.keyThirdColor[0].color}`,
                                  }}
                                />
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <img
                          src={item.image_src}
                          className="product-image-basket img-fluid"
                          alt={item.title}
                        />
                      )}
                    </div>
                    <div className="col-12 col-md-3 text-center m-1">
                      {item.image_src == "custom" ? (
                        <b>
                          {item.title === "numpad" && <>Klawiatura numeryczna</>}
                          {item.title === "forty" && <>Klawiatura 40%</>}
                          {item.title === "eighty" && <>Klawiatura 80%</>}
                          {item.title === "hundred" && <>Klawiatura 100%</>}
                        </b>
                      ) : (
                        <Link to={`/products/${item.product}`}>
                          {item.title}
                        </Link>
                      )}
                    </div>
                    <div className="col-12 col-md-2 text-center m-1">
                      <h6>ILOŚĆ</h6>
                      {item.qty}
                    </div>
                    <div className="col-12 col-md-2 text-center m-1">
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
      {!order.isPaid ? (
        <div className="row justify-content-center align-items-center d-flex m-3 mt-5">
          <div className="col-12 col-md-4 text-center mb-5">
            {loadingPay && <Loading />}
            {isPending ? (
              <Loading />
            ) : (
              <>
                <h6>Nie opłaciłeś jeszcze zamówienia? Zrób to tutaj: </h6>
                <PayPalScriptProvider options={{ "client-id": clientId }}>
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: order.totalPrice,
                              currency_code: "PLN",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        succesPaymentHandler(details);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="row justify-content-center align-items-center d-flex m-3 mt-5">
          <div className="col-12 col-md-4 text-center mb-5">
            <h5 className="u-paid">
              Opłaciłeś zamówienie! Niedługo zostanie wysłane.
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;

import { Link } from "react-router-dom";
import "./style/PlaceOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faTruck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/LoadingError/Error";

const Order = () => {
    window.scrollTo(0, 0);

    const paid = true;
    const shipped = true;
    const paymentMethod = "paypal"

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
                <p className="credentials">Pawel</p>
                <p className="credentials">Fajny</p>
                <p className="credentials">pfajny@gmail.com</p>
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
                  <b>Płatność:</b>{" "}
                  gotowa
                </p>
                <p className="credentials">
                  <b>Numer telefonu:</b> 829-232-232
                </p>
                <p className={paid ? "green" : "red"}>
                  Opłacono 19.10.2023
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
                <p className="credentials">Kwiatowa 22</p>
                <p className="credentials">Wawa</p>
                <p className="credentials">11-111</p>
                <p className={shipped ? "green" : "red"}>
                  Wysłano
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row header-row">
          
                <div className="col-12 col-md-8 mb-5">
                  <div className="row particular-product align-items-center">
                    <div className="col-3 text-center">
                      <img
                        src='img/keyboard1.jpg'
                        className="product-image-basket img-fluid"
                        alt=''
                      />
                    </div>
                    <div className="col-3 text-center">
                      <Link>Klawiatura jakas</Link>
                    </div>
                    <div className="col-2 text-center">
                      <h6>ILOŚĆ</h6>
                      3
                    </div>
                    <div className="col-2 text-center">
                      <h6>SUMA CZĘŚCIOWA</h6>
                      222.22 zł
                    </div>
                    <hr className="line-two my-2"></hr>
                  </div>
                </div>

          <div className="col-12 col-md-4">
            <div className="row summary-order text-center mx-5">
              <table>
                <tbody>
                  <tr>
                    <th>Cena netto</th>
                    <td>222.22zł</td>
                  </tr>

                  <tr>
                    <th>Dostawa</th>
                    <td>12.99 zł</td>
                  </tr>
                  <tr>
                    <th>Podatek</th>
                    <td>30.99 zł</td>
                  </tr>
                  <tr>
                    <th>Łącznie</th>
                    <td>254.23 zł</td>
                  </tr>
                </tbody>
              </table>
            </div>
                <div className="row justify-content-center align-items-center d-flex m-3 mt-5">
                    {paymentMethod === "paypal" 
                    && 
                    <>
                    <h6>Nie opłaciłeś jeszcze zamówienia? Zrób to tutaj: </h6>
                    <button className="btn btn-paypal">
                        <img src="img/PayPal.svg.png" alt="paypal" className="paypal-img img-fluid" />
                    </button>
                    <button className="btn btn-transfer">Przelew</button>
                    </>
                    
                    }
                </div>
          </div>
        </div>
      </div>
    )
}

export default Order
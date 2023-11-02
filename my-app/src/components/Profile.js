import { useSelector, useDispatch } from "react-redux";
import "./style/Profile.css";
import React, { useEffect, useState } from "react";
import { logout, getUserDetails, updateUserProfile } from "../Redux/Actions/UserActions";
import moment from "moment";
import "moment/locale/pl";
import Toast from '../components/LoadingError/Toast'
import Message from '../components/LoadingError/Error'
import Loading from '../components/LoadingError/Loading'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listMyOrders } from "../Redux/Actions/OrderActions";
import { Link } from "react-router-dom";

const Profile = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const [displaySection, setDisplaySection] = useState("info");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  }

  const handleEditClick = () => {
    setDisplaySection("edit");
  };

  const handleOrdersClick = () => {
    setDisplaySection("orders");
  };

  const handleBackClick = () => {
    setDisplaySection("info");
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: lodingOrders , error: errorOrders , orders } = orderListMy;

  //log out
  const logoutHandler = () => {
    dispatch(logout());
  };

  // Fetch user details when the component mounts
  useEffect(() => {
    dispatch(listMyOrders())
    dispatch(getUserDetails("profile"));
  }, [dispatch, userInfo]);

  // Update the state based on user data when user data changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
    }
  }, [user]);

  //submit changes
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)){ //prevents from creating multiple toasts
        toastId.current = toast.error("Hasła nie są takie same", Toastobjects);
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, name, surname, email, password }))
      if (!toast.isActive(toastId.current)){ //prevents from creating multiple toasts
        toastId.current = toast.success("Profil zaaktualizowany", Toastobjects);
      }
    }
  };

  return (
    <div className="container profile">
      <div className="row">
        <div className="col-md-6">
          <h3>
            Witaj, {userInfo.name} {userInfo.surname}!
          </h3>
        </div>
        <div className="col-md-6 text-end mb-5">
          <button className="btn btn-logout" onClick={logoutHandler}>
            WYLOGUJ SIĘ
          </button>
        </div>
        <hr className="mb-5"></hr>
        {displaySection === "info" && (
          <div className="row row-profile-info">
            <div className="col-6 col-md-3">
              <h5>Informacje na temat konta: </h5>
              <p>⠀</p>
              <p>Imię:</p>
              <p>Nazwisko:</p>
              <p>E-mail:</p>
              <p>Dołączono:</p>
            </div>
            <div className="col-6 col-md-3 text-end paragraph-info">
              <p>⠀</p>
              <p>⠀</p>
              <p className="bolder">{userInfo.name}</p>
              <p className="bolder">{userInfo.surname}</p>
              <p className="bolder">{userInfo.email}</p>
              <p className="bolder">
                {moment(userInfo.createdAt).locale("pl").format("llll")}
              </p>
            </div>
            <div className="col-md-6 mb-5">
              <img
                className="img-fluid img-profile"
                src="../img/controller.jpg"
                alt="some photo"
              />
            </div>

            <hr className="mb-5"></hr>
            <div className="row text-center">
              <div className="col-md-6">
                <button className="btn" onClick={handleEditClick}>
                  EDYTUJ KONTO
                </button>
              </div>
              <div className="col-md-6">
                <button className="btn" onClick={handleOrdersClick}>
                  ZAMÓWIENIA <span className="orders-count">{orders ? orders.length : 0}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {displaySection === "edit" && (
        
          <div className="row row-profile-edit">
            <div className="col-6 col-md-3">
              <h5>Informacje na temat konta: </h5>
              <p>⠀</p>
              <p>Imię:</p>
              <p>Nazwisko:</p>
              <p>E-mail:</p>
              <p>Nowe hasło:</p>
              <p>Powtórz hasło:</p>
            </div>
            <div className="col-6 col-md-3 text-end">
              <p className="paragraph-edit">⠀</p>
              
              {
                error && <Message variant='alert-danger'>{error}</Message>
              }
              {
                loading && <Loading />
              }
              {
                updateLoading && <Loading />
              }
              <form className="" onSubmit={submitHandler}>
                <Toast />
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    className="form-control"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password-confirm"
                    name="password-confirm"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-12 my-4 text-center">
                  <button className="btn" type="submit">
                    ZAPISZ ZMIANY
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6 mb-5">
              <img
                className="img-fluid img-profile"
                src="../img/controller.jpg"
                alt="some photo"
              />
            </div>

            <hr className="mb-5"></hr>
            <div className="row text-center">
              <div className="col-md-12">
                <button className="btn" onClick={handleBackClick}>
                  POWRÓT DO PROFILU
                </button>
              </div>
            </div>
          </div>
        )}

        {displaySection === "orders" && (
          <div className="row row-profile-orders">
            <div className="col-md-12 mb-5">
              <h5>Twoje zamówienia:</h5>
              { loading ? (<Loading />) : error ? (<Message variant='alert-danger'>{error}</Message>) : 
              ( 
                <>
                {orders.length === 0 ? (<h5>Brak zamówień <Link to='/keyboard'>zrób zakupy!</Link></h5>) : 
                (
                  <>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID ZAMÓWIENIA</th>
                          <th>STATUS</th>
                          <th>DATA</th>
                          <th>KWOTA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr className={`${order.isPaid ? "green-order" : "red-order"}`} key={order._id}>
                            <td><a href={`/order/${order._id}`}>{order._id}</a></td>
                            <td>{order.isPaid ? <>Opłacone</> : <>Nieopłacone</>}</td>
                            <td>{order.isPaid ? moment(order.paidAt).calendar() : moment(order.createdAt).calendar()}</td>
                            <td>{order.totalPrice} zł</td>
                          </tr>
                        )
                        )}
                      </tbody>
                    </table>
                  </div>
                  </>
                )}
                </>
              )}
              
            </div>
            <div className="row text-center">
              <div className="col-md-12">
                <button className="btn" onClick={handleBackClick}>
                  POWRÓT DO PROFILU
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

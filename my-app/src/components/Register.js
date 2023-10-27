import "./style/Login.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/Actions/UserActions";
import { useNavigate } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

function Register({ location }) {
  window.scrollTo(0, 0);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect =
    location && location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(register(name, surname, email, password));
    if (userInfo) {
      navigate(redirect);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-5 d-none d-md-block login">
          <img
            className="img-fluid pt-3 pb-3 px-2"
            src="../img/login_backdrop2.jpg"
            alt="Login Backdrop"
          />
        </div>
        <div className="col-sm-12 col-md-7 login text-center">
          <h5 className="header-login">REJESTRACJA</h5>
          <div className="row justify-content-center">
            <div className="col-6 login-form">
              {error && (
                <Message variant="alert-danger">
                  Użytkownik już istnieje
                </Message>
              )}
              {loading && <Loading />}

              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="name" className="col-sm-3 col-form-label">
                    imię
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Wprowadź imię"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="surname" className="col-sm-3 col-form-label">
                    nazwisko
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="surname"
                    placeholder="Wprowadź nazwisko"
                    required
                    value = {surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="col-sm-3 col-form-label">
                    e-mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Wprowadź e-mail"
                    required
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="col-sm-3 col-form-label">
                    hasło
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Wprowadź hasło"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group row button-submit">
                  <div className="col-sm-12">
                    <button type="submit" className="btn btn-login">
                      ZAREJESTRUJ SIĘ
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex justify-content-center line-cont">
            <div className="line"></div>
            <span className="or-span">lub</span>
            <div className="line"></div>
          </div>

          <div className="row justify-content-center">
            <div className="btn-google col-6">
              <button className="btn btn-white btn-circle col-12">
                <img src="../img/google.png" alt="btn" className="img-fluid" />
              </button>
              ⠀
              <button className="btn btn-white btn-circle col-12">
                <img
                  src="../img/facebook.png"
                  alt="btn"
                  className="img-fluid p-3"
                />
              </button>
            </div>
          </div>

          <div className="row">
            <p>
              Masz już konto?{" "}
              <Link 
              to={redirect ? `/login?redirect=${redirect}` : "login"}
              className="link">
                Zaloguj się
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

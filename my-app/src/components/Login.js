import "./style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "../Redux/Actions/UserActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { GoogleLogin } from "@react-oauth/google";

function Login({ location }) {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ user, setUser ] = useState([]);

  const dispatch = useDispatch();
  const redirect =
    location && location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
            src="../img/login_backdrop.jpg"
            alt="Login Backdrop"
          />
        </div>
        <div className="col-sm-12 col-md-7 login text-center">
          <h5 className="header-login">LOGOWANIE</h5>
          <div className="row justify-content-center">
            <div className="col-6 login-form">
              {error && (
                <Message variant="alert-danger">
                  Niepoprawny e-mail lub hasło
                </Message>
              )}
              {loading && <Loading />}
              <form onSubmit={submitHandler}>
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
                    value={email}
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
                      ZALOGUJ SIĘ
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
              <div className='spacer'></div>
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    const id_token = credentialResponse.credential;
                    dispatch(loginWithGoogle(id_token));
                    navigate(redirect);
                  }}
                  type="icon"
                  shape="circle"
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
            </div>
          </div>

          <div className="row">
            <p>
              Nie masz jeszcze konta?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "register"}
                className="link"
              >
                Zarejestruj się
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;

import "./style/Keyboard.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../Redux/Actions/ProductActions";

function Keyboard() {
  const [keyword, setKeyword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword));
  }, [dispatch, keyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="Keyboard container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <form
            class="form-inline d-flex justify-content-center md-form form-sm active-pink active-pink-2 mt-2"
            onSubmit={submitHandler}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="magnifying" />
            <input
              class="form-control form-control-sm ml-3 w-75"
              type="text"
              placeholder="Wyszukaj"
              aria-label="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
        </div>
      </div>
      {loading ? (
        <p className="loading">Ładowanie...</p>
      ) : error ? (
        <p className="loading">Błąd: {error}</p>
      ) : (
        <>
          {products.map((product) => (
            <div className="row product-row m-4" key={product._id}>
              <div className="col-sm-12 col-md-4">
                <div className="product-photo">
                  <img
                    src={product.image_src}
                    className="product-image img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-8">
                <div className="row">
                  <div className="col-10 product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <h4 className="product-color">
                      3 kolory
                      <FontAwesomeIcon
                        icon={faCircle}
                        size="sm"
                        className={
                          product.color[0] === "white"
                            ? "white"
                            : product.color[0] === "black"
                            ? "black"
                            : product.color[0] === "green"
                            ? "green-2"
                            : "white"
                        }
                      />
                      <FontAwesomeIcon
                        icon={faCircle}
                        size="sm"
                        className={
                          product.color[1] === "pink"
                            ? "pink"
                            : product.color[1] === "orange"
                            ? "orange"
                            : product.color[1] === "gray"
                            ? "gray"
                            : product.color[1] === "red"
                            ? "red-2"
                            : product.color[1] === "light_green"
                            ? "light-green"
                            : "white"
                        }
                      />
                      <FontAwesomeIcon
                        icon={faCircle}
                        size="sm"
                        className={
                          product.color[2] === "blue"
                            ? "blue"
                            : product.color[2] === "teal"
                            ? "teal"
                            : product.color[2] === "turquoise"
                            ? "turquoise"
                            : product.color[2] === "gold"
                            ? "gold"
                            : product.color[2] === "purple"
                            ? "purple"
                            : "white"
                        }
                      />
                    </h4>
                    <p className="product-description">{product.description}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 product-button d-flex justify-content-center">
                    <Link to={`/products/${product._id}`} className="btn">
                      Dowiedz się więcej
                    </Link>
                  </div>
                  <div className="col-12 d-flex justify-content-end product-price">
                    <p>{product.price} zł</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Keyboard;

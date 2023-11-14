import { useCustomization, colorsForKeyboard } from "../contexts/Customization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCustomCart } from "../../Redux/Actions/CartActions";
import { useNavigate } from "react-router-dom";

const Configurator = ( {canvasRef} ) => {
  const {
    baseColor,
    setBaseColor,
    insideBaseColor,
    setInsideBaseColor,
    keyColor,
    setKeyColor,
    keyOtherColor,
    setKeyOtherColor,
    keyThirdColor,
    setKeyThirdColor,
  } = useCustomization();

  const type = "eighty"
  const price = 499.99 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("1");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const savePhotoHandle = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `${type}_${randomId()}.png`;
    a.click();
  };

  const randomId = () => {
    return Math.random().toString(36).substr(2, 9);
  }

  const addToCartHandle = () => {
    const id = randomId()

    const customProduct = {
      product:  `custom_${id}`,
      id: id,
      type: type,
      price: price,
      qty: 1,
      image_src: canvasRef.current.toDataURL("image/png"),
      baseColor,
      insideBaseColor,
      keyColor,
      keyOtherColor,
      keyThirdColor,
    };
    dispatch(addToCustomCart(customProduct));
    navigate('/basket')
  };

  return (
    <>
      <div className="some-info-customizer">
        <h1 className="perso-h1" style={{ color: "#E88ED3" }}>
          <b>PERSONALIZATOR</b>
        </h1>
        <h5>
          Wybierz element, który chcesz zmodyfikować z listy rozwijanej po
          prawej, a następnie kliknij na jeden z kolorów by zastosować go na
          danym elemencie. Wybrany przez Ciebie aktualnie kolor oznaczony jest
          różowym kolorem.
        </h5>
        <h5>Legenda elementów:</h5>
        <ul className="legend">
          <li>
            <b>Baza klawiatury</b> - podstawka na której znajduje się klawiatura
          </li>
          <li>
            <b>Środek bazy klawiatury</b> - środek podstawki (miejsce w którym
            umieszczone są klawisze){" "}
          </li>
          <li>
            <b>Klawisze główne</b> - to te klawisze, których jest najwięcej
          </li>
          <li>
            <b>Klawisze dodatkowe</b> - to pozostałe klawisze
          </li>
          <li>
            <b>Klawisze akcesoryjne</b> - w przypadku klawiatury większej niż numpad to trzy dodatkowe klawisze akcesoryjne
          </li>
        </ul>
      </div>
      <div className="configurator">
        <select
          class="form-select"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option selected value="1">
            Baza klawiatury
          </option>
          <option value="2">Środek bazy klawiatury</option>
          <option value="3">Klawisze główne</option>
          <option value="4">Klawisze dodatkowe</option>
          <option value="5">Klawisze akcesoryjne</option>
        </select>
        {selectedOption === "1" && (
          <div className="configurator__section keyb-base">
            <div className="configurator__section__title">Baza klawiatury</div>
            <div className="configurator__section__values">
              {colorsForKeyboard.map((item, index) => (
                <div
                  key={index}
                  className={`item ${
                    item.color === baseColor.color ? "item--active" : ""
                  }`}
                  onClick={() => setBaseColor(item)}
                >
                  <div
                    className="item__dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="item__label">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedOption === "2" && (
          <div className="configurator__section keyb-inside-base">
            <div className="configurator__section__title">
              Środek bazy klawiatury
            </div>
            <div className="configurator__section__values">
              {colorsForKeyboard.map((item, index) => (
                <div
                  key={index}
                  className={`item ${
                    item.color === insideBaseColor.color ? "item--active" : ""
                  }`}
                  onClick={() => setInsideBaseColor(item)}
                >
                  <div
                    className="item__dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="item__label">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedOption === "3" && (
          <div className="configurator__section keyb-keys1">
            <div className="configurator__section__title">Klawisze główne</div>
            <div className="configurator__section__values">
              {colorsForKeyboard.map((item, index) => (
                <div
                  key={index}
                  className={`item ${
                    item.color === keyColor.color ? "item--active" : ""
                  }`}
                  onClick={() => setKeyColor(item)}
                >
                  <div
                    className="item__dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="item__label">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedOption === "4" && (
          <div className="configurator__section keyb-keys2">
            <div className="configurator__section__title">
              Klawisze dodatkowe
            </div>
            <div className="configurator__section__values">
              {colorsForKeyboard.map((item, index) => (
                <div
                  key={index}
                  className={`item ${
                    item.color === keyOtherColor.color ? "item--active" : ""
                  }`}
                  onClick={() => setKeyOtherColor(item)}
                >
                  <div
                    className="item__dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="item__label">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedOption === "5" && (
          <div className="configurator__section keyb-base">
            <div className="configurator__section__title">Klawisze akcesoryjne</div>
            <div className="configurator__section__values">
              {colorsForKeyboard.map((item, index) => (
                <div
                  key={index}
                  className={`item ${
                    item.color === keyThirdColor.color ? "item--active" : ""
                  }`}
                  onClick={() => setKeyThirdColor(item)}
                >
                  <div
                    className="item__dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="item__label">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="configurator2">
      <button 
      className="btn"
      onClick={savePhotoHandle}
      >
          <FontAwesomeIcon icon={faCamera} size="2x" />
        </button>
        <button 
        className="btn"
        onClick={addToCartHandle}
        >
          <FontAwesomeIcon icon={faCartPlus} size="2x" />
        </button>
      </div>
    </>
  );
};

export default Configurator;

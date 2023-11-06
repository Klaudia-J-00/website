import { useCustomization, colorsForKeyboard } from "../contexts/Customization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const Configurator = () => {
  const {
    baseColor,
    setBaseColor,
    insideBaseColor,
    setInsideBaseColor,
    keyColor,
    setKeyColor,
    keyOtherColor,
    setKeyOtherColor,
  } = useCustomization();

  const [selectedOption, setSelectedOption] = useState("1");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
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
      </div>
      <div className="configurator2">
        <button className="btn">
          <FontAwesomeIcon icon={faCartPlus} size="2x" />
        </button>
      </div>
    </>
  );
};

export default Configurator;

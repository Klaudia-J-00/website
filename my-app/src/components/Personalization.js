import "./style/Personalization.css";
import { Link } from 'react-router-dom';

function Personalization() {
  return (
      <div className="Personalization container text-center justify-content-center align-items-center d-flex">
         <div className="row text-center justify-content-center align-items-center d-flex">
          <h1 className="perso-h1">PERSONALIZACJA</h1>
          <h5> Wybierz model klawiatury, którą chciałbyś personalizować: </h5>

            <div className=" col-6 col-md-2 personalization-choose">
              <Link to='/personalize-numpad'>
                  <img src="/img/icon_numpad.png" className="img-fluid icon-img"></img>
                </Link>
              </div>

            <div className="col-6 col-md-2 personalization-choose "></div>
              <Link to='/personalize-40'>
                  <img src="/img/icon_40.png" className="img-fluid icon-img"></img>
                </Link>
              </div>

              <div className="col-6 col-md-2 personalization-choose">
              <Link to='/personalize-80'>
                  <img src="/img/icon_80.png" className="img-fluid icon-img"></img>
                </Link>
              </div>

              <div className="col-6 col-md-2 personalization-choose ">
              <Link to='/personalize-100'>
                  <img src="/img/icon_100.png" className="img-fluid icon-img"></img>
                </Link>
              </div>
         </div>
      </div>

  );
}

export default Personalization;
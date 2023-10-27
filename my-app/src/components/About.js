import './style/About.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faKeyboard, faComputer, faSeedling,
        faMobileScreenButton, faLocationDot, faGem,
        faFaceGrinHearts, faAt, faUsers, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

function About() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [keyboardCount, setKeyboardCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [personalizedCount, setPersonalizedCount] = useState(0);
  const maxCount = { keyboard: 226, user: 178, personalized: 84 };

  useEffect(() => {
    const interval = setInterval(() => {
      setKeyboardCount((prevCount) => Math.min(prevCount + 2, maxCount.keyboard));
      setUserCount((prevCount) => Math.min(prevCount + 2, maxCount.user));
      setPersonalizedCount((prevCount) => Math.min(prevCount + 2, maxCount.personalized));
    }, 20);
    return () => clearInterval(interval);
  }, [maxCount.keyboard, maxCount.personalized, maxCount.user]);

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  }

  const handleMouseOut = () => {
    setHoveredIndex(null);
    setKeyboardCount(0);
    setUserCount(0);
    setPersonalizedCount(0);
  }

  return (
      <div className="About">
         <div className="container">
          <div className="row">

            <div className="col-lg-2 
                            col-md-12 
                            About-element 
                            d-flex 
                            align-items-center 
                            justify-content-center 
                            m-2">
                <p>najedź na element by dowiedzieć się więcej</p>
            </div>

            <div 
                onMouseOver={() => handleMouseOver(1)}
                onMouseOut={handleMouseOut}
                className="col-lg-3 
                          col-md-12 
                          Social-element 
                          d-flex 
                          align-items-center 
                          justify-content-center 
                          m-2">
                  {hoveredIndex === 1 || window.innerWidth <= 992 ? (
                    <div className='socials-title'>
                      {window.innerWidth <= 992 && <h4>Nasze Social Media</h4>}
                      <div className='About-icons d-flex 
                          align-items-center 
                          justify-content-center'>
                        <Link to="http://facebook.com" target="_blank" className='About-icon'>
                          <FontAwesomeIcon icon={faFacebook} beat/>
                        </Link>
                        <Link to="http://instagram.com" target="_blank" className='About-icon'>
                          <FontAwesomeIcon icon={faInstagram} beat/>
                        </Link>
                        <Link to="http://twitter.com" target="_blank" className='About-icon'>
                          <FontAwesomeIcon icon={faTwitter} beat/>
                        </Link>
                      </div>
                    </div>
                  ) : (<p>social media</p>)
                  }
            </div>

            <div 
                onMouseOver={() => handleMouseOver(2)}
                onMouseOut={handleMouseOut}
                className="col-lg-5 
                          col-md-12
                          Certificates-element 
                          d-flex 
                          align-items-center 
                          justify-content-center 
                          m-2">
              {hoveredIndex === 2 || window.innerWidth <= 992 ? (
                  <div className='certificates-title'>
                  {window.innerWidth <= 992 && <h4>NASZE CERTYFIKATY</h4>}
                      <div className='About-Certificates row mx-3'>
                        <div className='Certificate col-4'>
                          <FontAwesomeIcon icon={faKeyboard} className='Certificates-icon' flip/>
                          <h6>Certyfikat jakości ISO 9001:2015</h6>
                        </div>
                        <div className='Certificate col-4'>
                          <FontAwesomeIcon icon={faComputer} className='Certificates-icon' flip/>
                          <h6>Certyfikat bezpieczeństwa IT</h6>
                        </div>
                        <div className='Certificate col-4'>
                          <FontAwesomeIcon icon={faSeedling} className='Certificates-icon' flip/>
                          <h6>Certyfikat ekologiczny PCBiC</h6>
                        </div>
                      </div>
                    </div>
                  ) : (<p>certyfikaty i wyróżnienia</p>)
                  }
            </div>

          </div>

          <div className="row">

            <div 
                onMouseOver={() => handleMouseOver(3)}
                onMouseOut={handleMouseOut}
                className="col-lg-2 
                          col-md-12 
                          d-flex 
                          align-items-center 
                          justify-content-center 
                          m-2 
                          Contact-element">
              {hoveredIndex === 3 || window.innerWidth <= 992 ? (
                    <div className='certificates-title'>
                    {window.innerWidth <= 992 && <h4>SKONTAKTUJ SIĘ Z NAMI
                      <p>email: example@gmail.com<br/><br/>
                          numer telefonu: 777 666 555
                      </p>
                    </h4>
                        }
                      <div className='About-Contact row'>
                        <div className='Contact col-4 col-lg-12 my-2'>
                          <FontAwesomeIcon icon={faMobileScreenButton} className='contact-icon m-2' shake/>
                          <p className='m-2'>777 666 555</p>
                        </div>
                        <div className='Contact col-4 col-lg-12 my-2'>
                          <FontAwesomeIcon icon={faAt} className='contact-icon' shake/>
                          <p className='mt-2'>example@gmail.com</p>
                        </div>
                        <div className='Contact col-4 col-lg-12 my-2'>
                          <FontAwesomeIcon icon={faLocationDot} className='contact-icon' shake/>
                          <p className='mt-2'>ul. Przykładowa 12,<br/>
                            00-000 Warszawa
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                  <div className='row'>
                    <div className='col-12 d-flex 
                          align-items-center 
                          justify-content-center'>
                    <p>kontakt</p>
                    </div>
                  </div>)
                  }
              </div>

            <div className="col-3 About-column-between">
              <div onMouseOver={() => handleMouseOver(4)}
                  onMouseOut={handleMouseOut}
                  className="col 
                            col-md-12 
                            d-flex 
                            align-items-center 
                            justify-content-center 
                            my-2 mb-3 
                            Services-element">
                {hoveredIndex === 4 ? (
                    <div className='Services m-4'>
                      <p>Nasze usługi obejmują projektowanie, drukowanie 3D, montaż, testowanie jakości, a także serwis i naprawę.</p>
                    </div>
                  ) : (<p>USŁUGI</p>)
                  }  
              </div>

              <div onMouseOver={() => handleMouseOver(5)}
                  onMouseOut={handleMouseOut}
                  className="col col-md-12 
                            d-flex 
                            align-items-center 
                            justify-content-center 
                            my-2 Values-element">
                {hoveredIndex === 5 ? (
                    <div className='Values m-4'>
                      <div className='Values-col'>
                        <FontAwesomeIcon icon={faGem} className='Values-icon'/>
                        <h6 className='mb-3'>jakość</h6>
                        <FontAwesomeIcon icon={faFaceGrinHearts} className='Values-icon mb-1'/>
                        <h6>zadowolenia klienta</h6>
                      </div>
                    </div>
                  ) : (<p>WARTOŚCI</p>)
                  }              
              </div>
            </div>

            <div onMouseOver={() => handleMouseOver(6)}
                onMouseOut={handleMouseOut}
                className="col-lg-2 
                          col-md-12 
                          d-flex 
                          align-items-center 
                          justify-content-center 
                          m-2 
                          History-element">
                {hoveredIndex === 6 ? (
                    <div className='About-History row'>
                      <p className='history'>
                        <h4>2019</h4>
                        Grupa przyjaciół, którzy mieli pasję do technologii, postanowiła połączyć siły.
                        <h4>2020</h4>
                        Po wielu testach i prototypach, wydrukowaliśmy pierwszy model klawiatury.
                        <h4>2021</h4>
                        W końcu udało nam się stworzyć klawiaturę idealną, spełniającą wszystkie założenia.
                        <h4>2022</h4>
                        Rozszerzyliśmy naszą ofertę o klawiatury dostosowane do potrzeb i preferencji klientów.
                      </p>
                    </div>
                  ) : (
                  <div className='row'>
                    <div className='col-12 d-flex 
                          align-items-center 
                          justify-content-center'>
                    <p>historia</p>
                    </div>
                    <div className='col-12'>
                        <Player src = "https://lottie.host/95049bdc-a998-46e9-a83d-414132f0a70d/eceqIG03be.json"
                                loop
                                autoplay
                                className='history-animation'/>
                    </div>
                  </div>)
                  }
              </div>
            <div onMouseOver={() => handleMouseOver(7)}
                onMouseOut={handleMouseOut}
                className="col-lg-2 col-md-12 
                          d-flex align-items-center 
                          justify-content-center 
                          m-2 Stats-element">
            {hoveredIndex === 7 ? (
                    <div className='About-Stats row'>
                      <div className="Stats col-12 my-2">
                        <FontAwesomeIcon icon={faKeyboard} size="2x" />
                        <p><h4>{keyboardCount}</h4> sprzedanych klawiatur</p>
                      </div>
                      <div className="Stats col-12 my-2">
                        <FontAwesomeIcon icon={faWandMagicSparkles} size="2x" />
                        <p><h4>{personalizedCount}</h4> spersonalizowanych klawiatur </p>
                      </div>
                      <div className="Stats col-12 my-2">
                      <FontAwesomeIcon icon={faUsers} size="2x" />
                        <p><h4>{userCount}</h4> usatysfakcjonowanych klientów</p>
                      </div>
                    </div>
                  ) : (
                  <div className='row'>
                    <div className='col-12 d-flex 
                          align-items-center 
                          justify-content-center'>
                    <p>statystyki</p>
                    </div>
                    <div className='col-12 stats'>
                        <Player src = "https://lottie.host/1a2b65db-dffc-47ff-97c2-ca88ee2365d3/9OkOwQhSzY.json"
                                loop
                                autoplay
                                className='stats-animation'
                                />
                    </div>
                  </div>)
                  }   
            </div>
          </div>
         </div>
      </div>

  );
}

export default About;
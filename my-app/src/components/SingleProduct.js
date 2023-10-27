import './style/Keyboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCaretUp, faCaretDown, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux"
import { listProductDetails } from '../Redux/Actions/ProductActions';
import { useParams, useNavigate } from 'react-router-dom';

const SingleProduct = () => {
    const [qty, setQty] = useState(1); 
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    const AddToCartHandle = (e) => {
        e.preventDefault();
        navigate(`/basket/${id}?qty=${qty}`);
    }

    if (loading) {
        return <p className="loading">Ładowanie...</p>;
    }

    if (error) {
        return <p className="loading">Błąd: {error}</p>;
    }

    return (
        <div className="Keyboard container">
            <div className="row product-row m-4" key={product._id}>
                <div className="col-md-12 col-lg-4">
                    <div className="product-photo">
                    <Carousel variant="dark" fade>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 product-image"
                            src={product.image_src}
                            alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 product-image"
                            src={product.image_src2}
                            alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 product-image"
                            src={product.image_src3}
                            alt="Third slide"
                            />
                        </Carousel.Item>
                        </Carousel>
                    </div> 
                </div>
                <div className="col-sm-12 col-md-8">
                    <div className="row">
                        <div className="col-10 product-info">
                            <h2 className="product-title">{product.title}</h2>
                            <h4 className="product-color">3 kolory
                            <FontAwesomeIcon icon={faCircle} size="sm" className='circle-1'/>
                            <FontAwesomeIcon icon={faCircle} size="sm" className='circle-2'/> 
                            <FontAwesomeIcon icon={faCircle} size="sm" className='circle-3'/></h4>
                            <h4 className="product-color">Status: {product.countInStock > 0 ? 
                            (<span>dostępny</span>) : (<span>niedostępny</span>)
                        }</h4>
                            
                            <p className="product-description"><br/><br/>{product.description}</p>
                        </div>

                        <div className="col-2 d-flex justify-content-end">
                            <p className="upvote-count mr-2">{product.upvote_count-product.downvote_count}</p>
                            <div className="vote-arrows d-flex flex-column align-items-end">
                                <div className="upvote">
                                <FontAwesomeIcon icon={faCaretUp} className='caret-1'/>
                                </div>
                                <div className="downvote">
                                <FontAwesomeIcon icon={faCaretDown} className='caret-2'/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='products-pc row mt-4'>
                    <div className='col-12 col-md-4 d-flex justify-content-center product products-switch'>
                        <div><p className='bigger'>Switche</p>
                        Brązowe switche cechują się delikatnym, ale wyczuwalnym punktem aktywacji 
                        oraz cichym, miękkim dźwiękiem podczas pisania.</div>
                    </div>
                    <div className='col-12 col-md-4 d-flex justify-content-center product products-type'>
                        <div><p className='bigger'>Rodzaj</p>
                        {product.type}</div>
                    </div>
                    <div className='col-12 col-md-4 d-flex justify-content-center product products-light'>
                        <div><p className='bigger'>Podświetlenie</p>
                        Wielokolorowe podświetlenie RGB klawiatury z wieloma trybami umożliwia 
                        dostosowanie oświetlenia do indywidualnych preferencji.</div>
                    </div>
                    <div className='col-12 col-md-4 d-flex justify-content-center product products-light'>
                        <div><p className='bigger'>Przewód</p>
                        Typu C w oplocie to wytrzymały, odpodny na splątania i przecięcia kabel, który
                        gwarantuje szybką transmisję danych między klawiaturą a komputerem.</div>
                    </div>
                    <div className='col-12 col-md-4 d-flex justify-content-center product products-switch'>
                        <div><p className='bigger'>Dodatkowe</p>
                        Klawiatura posiada stopki antypoślizgowe, częstotliwość odświeżania 1000hz, regulację
                        jasności podświetlenia, oraz wytrzymałość do 50 mln kliknięć. 
                        </div>
                    </div>
                    <div className='col-12 col-md-4 d-flex justify-content-center product products-add'>
                        <div><p className='bigger'>Kolorystyka</p>
                        Kolorystyka tej klawiatury to {product.color ? product.color.join(', ') : 'Brak informacji'}.
                         </div>
                    </div>
                </div>

                <div className='row products-mobile'>
                    <Table striped>
                        <thead>
                            <tr>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Switche</td>
                                <td>Brązowe switche cechują się delikatnym, ale wyczuwalnym punktem aktywacji 
                                    oraz cichym, miękkim dźwiękiem podczas pisania.</td>
                            </tr>
                            <tr>
                                <td>Rodzaj</td>
                                <td>{product.type}</td>
                            </tr>
                            <tr>
                                <td>Podświetlenie</td>
                                <td>Wielokolorowe podświetlenie RGB klawiatury z wieloma trybami umożliwia 
                                    dostosowanie oświetlenia do indywidualnych preferencji.</td>
                            </tr>
                            <tr>
                                <td>Przewód</td>
                                <td>Typu C w oplocie to wytrzymały, odpodny na splątania i przecięcia kabel, który
                                    gwarantuje szybką transmisję danych między klawiaturą a komputerem.</td>
                            </tr>
                            <tr>
                                <td>Dodatkowe</td>
                                <td>Klawiatura posiada stopki antypoślizgowe, częstotliwość odświeżania 1000hz, regulację
                                jasności podświetlenia, oraz wytrzymałość do 50 mln kliknięć. </td>
                            </tr>
                            <tr>
                                <td>Kolorystyka</td>
                                <td>Kolorystyka tej klawiatury to {product.color ? product.color.join(', ') : 'Brak informacji'}. </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                {product.countInStock > 0 ? (
                    <div className='row basket'>
                        <div className="col-12 d-flex justify-content-end product-price">
                                <p>CENA ZA SZTUKĘ: {product.price} zł</p>
                        </div>
                        <div className="col-12 d-flex justify-content-end product-price">
                            <p>ILOŚĆ: ⠀
                            <select value={qty}
                            onChange={(e) => setQty(e.target.value)}>
                                {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x +1 }>
                                        {x + 1}
                                    </option>
                                ))}
                            </select>
                            </p>
                        </div>
                        <div className="col-12 d-flex justify-content-end product-price">
                            <button className='btn' onClick={AddToCartHandle}><FontAwesomeIcon icon={faCartPlus} size="2x"/></button>
                        </div>
                    </div>
                ) : null}
                    
            </div>
        </div>
    );
}

export default SingleProduct;
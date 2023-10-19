import './Keyboard.css';
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { listProduct } from "../Redux/Actions/ProductActions"

function Keyboard() {

    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(()=> {
        dispatch(listProduct())
    },[dispatch])

    return (
        <div className="Keyboard container">
            {
                loading ? (<p className="loading">Ładowanie...</p>) : error ? (<p className="loading">Błąd: {error}</p>) : 
                (<>
                {products.map((product) => (
                    <div className="row product-row m-4" key={product._id}>
                        <div className="col-sm-12 col-md-4">
                            <div className="product-photo">
                                <img src={product.image_src}  className="product-image img-fluid" alt="" />
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
                                    <p className="product-description">{product.description}</p>
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
                            <div className="row">
                                <div className="col-12 product-button d-flex justify-content-center">
                                    <Link to={`/products/${product._id}`} className="btn">Dowiedz się więcej</Link>
                                </div>
                                <div className="col-12 d-flex justify-content-end product-price">
                                    <p>{product.price} zł</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </>
                )
            }
            
        </div>
  
    );
}

export default Keyboard;
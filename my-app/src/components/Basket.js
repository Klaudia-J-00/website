import './Basket.css';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "../Redux/Actions/CartActions";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Basket() {
    const { id } = useParams();
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    const total_with_shipping = (Number(total) + 12.99).toFixed(2);

    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const checkOutHandler = (e) => {
        e.preventDefault()
        navigate('/login?redirect=shipping')
    }

    const removeFromCartHandle = (e) => {
        dispatch(removefromcart(e))
    }

    return (
        <div className="Basket">
            <h1 className='header'>KOSZYK</h1>
            { 
            cartItems.length === 0 ?(
                <div className='row header-row text-center'>
                    <h3>Twój koszyk jest pusty</h3>
                    <p>Przejdź do <Link to="/keyboard">klawiatur</Link> by rozpocząć zakupy!</p>
                </div>
            ) : (
                <div className='row header-row'>
                    <div className='col-12 pb-5'>
                        <h5>Produktów w koszyku: ({cartItems.length})</h5>
                    </div>
                <div className='col-12 col-md-8 mb-5'>
                    <div className='row'>
                        <div className='col-3 text-center'>Produkt</div>
                        <div className='col-3 text-center'>Opis</div>
                        <div className='col-2 text-center'>Ilość</div>
                        <div className='col-2 text-center'>Cena</div>
                        <div className='col-2 text-center'>Usuń</div>
                    </div>
                    <hr></hr>
                    {/*cart item */}
                    {
                        cartItems.map(item => (
                           <div className='row particular-product align-items-center'>
                            <div className='col-3 text-center'><img src={item.image}  className="product-image-basket img-fluid" alt={item.title} /></div>
                            <div className='col-3 text-center'><Link to={`/products/${item.product}`}>{item.title}</Link></div>
                            <div className='col-2 text-center'>
                                <input className='qty-input' type='number' min="1" max={item.countInStock} value={item.qty} onChange={(e) => {
                                    dispatch(addToCart(item.product, Number(e.target.value)));
                                }} />
                            </div>
                            <div className='col-2 text-center'>{item.price} zł</div>
                            <div className='col-2 text-center remove' onClick={() => removeFromCartHandle(item.product)}>X</div>
                            <hr className='line my-2'></hr>
                        </div> 
                        ))
                    }
                        
                </div>
                <div className='col-12 col-md-4'>
                    <div className='row'>
                        <div className='col-12'>Podsumowanie</div>
                    </div>
                    <hr></hr>
                    <div className='row'>
                        <div className='col-6'><p>Łączna cena</p></div>
                        <div className='col-6 total-price'><p>{total} zł</p></div>
                    </div>
                    <div className='row'>
                        <div className='col-6'><p>Dostawa</p></div>
                        <div className='col-6 total-price'><p>12.99 zł</p></div>
                    </div>
                    <hr></hr>
                    <div className='row blue-bg'>
                        <div className='col-6'><h3 className='total-price-with-customs'>ŁĄCZNIE</h3></div>
                        <div className='col-6 total-price-sum'><h3 className='total-price-with-customs'>{total_with_shipping} zł </h3></div>
                    </div>
                    {
                        total > 0 && (
                            <div className='row p-5'>
                                <button onClick={checkOutHandler} className='btn'>PŁATNOŚĆ</button>
                            </div>
                        )
                    }
                    
                </div>
            </div>
            )}
        </div>
    );
}
  
  export default Basket;
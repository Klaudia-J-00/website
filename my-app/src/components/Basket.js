import './Basket.css';
import { useEffect } from "react";
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Actions/CartActions";
import { useLocation } from 'react-router-dom';

function Basket() {
    const { id } = useParams();
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    return (
        <div className="Basket">
            <h1 className='header'>KOSZYK</h1>
            { 
            cartItems.length === 0 ?(
                <div className='row header-row text-center'>
                    <h3>Twój koszyk jest pusty</h3>
                </div>
            ) : (
                <div className='row header-row'>
                <div className='col-12 col-md-8 mb-5'>
                    <div className='row'>
                        <div className='col-3 text-center'>Produkt</div>
                        <div className='col-3 text-center'>Opis</div>
                        <div className='col-2 text-center'>Ilość</div>
                        <div className='col-2 text-center'>Cena</div>
                        <div className='col-2 text-center'>Usuń</div>
                    </div>
                    <hr></hr>
                        <div className='row particular-product align-items-center'>
                            <div className='col-3 text-center'><img src=''  className="product-image-basket img-fluid" alt="" /></div>
                            <div className='col-3 text-center'>Klawiatura numeryczna</div>
                            <div className='col-2 text-center'>- 1 +</div>
                            <div className='col-2 text-center'>199.99</div>
                            <div className='col-2 text-center'>X</div>
                            <hr className='line'></hr>
                        </div>
                </div>
                <div className='col-12 col-md-4'>
                    <div className='row'>
                        <div className='col-12'>Podsumowanie</div>
                    </div>
                    <hr></hr>
                    <div className='row'>
                        <div className='col-6'><p>Łączna cena</p></div>
                        <div className='col-6 total-price'><p>299.99</p></div>
                    </div>
                    <div className='row'>
                        <div className='col-6'><p>Dostawa</p></div>
                        <div className='col-6 total-price'><p>12.99</p></div>
                    </div>
                    <hr></hr>
                    <div className='row blue-bg'>
                        <div className='col-6'><h3 className='total-price-with-customs'>ŁĄCZNIE</h3></div>
                        <div className='col-6 total-price'><h3 className='total-price-with-customs'>311.98</h3></div>
                    </div>
                    <div className='row p-5'>
                        <Nav.Link href="/about" className="btn">PŁATNOŚĆ</Nav.Link>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
  
  export default Basket;
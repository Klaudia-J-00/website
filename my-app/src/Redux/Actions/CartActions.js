import axios from "axios";
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_ADD_CUSTOM_ITEM,
    CART_REMOVE_CUSTOM_ITEM
 } from "../Constants/CartConstants";

 export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  
  const item = {
    product: data._id,
    title: data.title,
    image_src: data.image_src,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  };

  dispatch({
      type: CART_ADD_ITEM,
      payload: item,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const addToCustomCart = (customProduct) => (dispatch, getState) => {
  dispatch({ 
    type: CART_ADD_CUSTOM_ITEM, 
    payload: customProduct 
  });

  localStorage.setItem('customCartItems', JSON.stringify(getState().cart.customCartItems));
};
  
  export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCustomCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_CUSTOM_ITEM,
        payload: id,
    });

    localStorage.setItem('customCartItems', JSON.stringify(getState().cart.customCartItems));
};
  

//SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}


//SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
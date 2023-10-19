import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { productListReducer, productDetailsReducer } from './Reducers/ProductReducers';
import { cartReducer } from './Reducers/CartReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage
  }
}

const middleware = [thunk]

const store = configureStore({
  reducer: reducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
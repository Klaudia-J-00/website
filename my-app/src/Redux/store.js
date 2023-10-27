import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { productListReducer, productDetailsReducer } from './Reducers/ProductReducers';
import { cartReducer } from './Reducers/CartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer } from './Reducers/UserReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

//login
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage
  }
}

const middleware = [thunk]

const store = configureStore({
  reducer: reducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState
})

export default store;
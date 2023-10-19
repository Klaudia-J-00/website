import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {}

const middleware = [thunk]

const store = configureStore({
  reducer: {},
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
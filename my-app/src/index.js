import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './Navbar';
import About from './components/About';
import Personalization from './components/Personalization';
import Keyboard from './components/Keyboards';
import Hero from './Hero';
import SingleProduct from './components/SingleProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Basket from './components/Basket';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Delivery from './components/Delivery';
import Payment from './components/Payment';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero gltfPath="/keyboard2.glb" />} />
        <Route path="/about" element={<About />} />
        <Route path="/personalization" element={<Personalization />} />
        <Route path="/basket/:id?" element={<Basket />} />
        <Route path="/keyboard" element={<Keyboard />} />
        <Route path='/products/:id'element={<SingleProduct/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/placeorder' element={<h1>placeorder</h1>} />
      </Routes>
    </Router>
  </Provider>
);
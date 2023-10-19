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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero gltfPath="/keyboard2.glb" />} />
        <Route path="/about" element={<About />} />
        <Route path="/personalization" element={<Personalization />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/keyboard" element={<Keyboard />} />
        <Route path='/products/:id'element={<SingleProduct/>} />
      </Routes>
    </Router>
  </Provider>
);
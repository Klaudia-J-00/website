import React from 'react';
import ReactDOM from 'react-dom';
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
import PlaceOrder from './components/PlaceOrder';
import Order from './components/Order';
import PrivateRouter from './PrivateRouter';
import PersonalizeNumpad from './components/PersonalizeNumpad';


 ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero gltfPath="models/keyboard2.glb" />} exact/>
          <Route path="/about" element={<About />} />
          <Route path="/personalization" element={<Personalization />} />
          <Route path="/basket/:id?" element={<Basket />} />
          <Route path="/keyboard" element={<Keyboard />} />
          <Route path='/products/:id'element={<SingleProduct/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path="*" element={<h1>404</h1>} />
          <Route path="/search/:keyword" element={<Keyboard />} />
          {/* private routes (they will be shown to u only if u are logged in) */}
          <Route path='/' element={<PrivateRouter />} >
            <Route path='/profile' element={<Profile />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/order/:id' element={<Order />} />
          </Route><Route path='/personalize-numpad' element={<PersonalizeNumpad />} />
        </Routes>
      </Router>
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
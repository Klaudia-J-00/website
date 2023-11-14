import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./Navbar";
import About from "./components/About";
import Personalization from "./components/Personalization";
import Keyboard from "./components/Keyboards";
import Hero from "./Hero";
import SingleProduct from "./components/SingleProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Basket from "./components/Basket";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Delivery from "./components/Delivery";
import Payment from "./components/Payment";
import PlaceOrder from "./components/PlaceOrder";
import Order from "./components/Order";
import PrivateRouter from "./PrivateRouter";
import PersonalizeNumpad from "./components/PersonalizeNumpad";
import PersonalizeForty from "./components/PersonalizeForty";
import { CustomizationProvider } from "./components/contexts/Customization";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Loading from "./components/LoadingError/Loading";
import PersonalizeEighty from "./components/PersonalizeEighty";
import PersonalizeHundred from "./components/PersonalizeHundred";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById("root"));

function Main() {
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const fetchClientId = async () => {
      const { data } = await axios.get("/api/config/paypal");
      setClientId(data);
    };

    fetchClientId();
  }, []);

  if (!clientId) {
    return <Loading />;
  }

  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId="120855135136-kbbk72qbrp38n7ai1739hj1te2lb4qc4.apps.googleusercontent.com">
        <Provider store={store}>
          <PayPalScriptProvider
            options={{ "client-id": clientId, currency: "PLN" }}
          >
            <Router>
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={<Hero gltfPath="models/keyboard2.glb" />}
                  exact
                />
                <Route path="/about" element={<About />} />
                <Route path="/personalization" element={<Personalization />} />
                <Route path="/basket/:id?" element={<Basket />} />
                <Route path="/keyboard" element={<Keyboard />} />
                <Route path="/products/:id" element={<SingleProduct />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<h1>404</h1>} />
                <Route path="/search/:keyword" element={<Keyboard />} />
                {/* private routes (they will be shown to u only if u are logged in) */}
                <Route path="/" element={<PrivateRouter />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/placeorder" element={<PlaceOrder />} />

                  <Route path="/order/:id" element={<Order />} />
                </Route>
                <Route
                  path="/personalize-numpad"
                  element={
                    <CustomizationProvider>
                      <PersonalizeNumpad />
                    </CustomizationProvider>
                  }
                />
                <Route path="/personalize-40" element={<PersonalizeForty />} />
                <Route path="/personalize-80" element={<PersonalizeEighty />} />
                <Route
                  path="/personalize-100"
                  element={<PersonalizeHundred />}
                />
              </Routes>
            </Router>
          </PayPalScriptProvider>
        </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
}

root.render(<Main />);

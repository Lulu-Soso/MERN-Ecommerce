import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ProductDetails from "./scenes/productDetails/ProductDetails";
import CartMenu from "./scenes/global/CartMenu";
// import Checkout from "./scenes/checkout/Checkout";
// import Confirmation from "./scenes/checkout/Confirmation";
import Login from "./scenes/login/Login";
import Register from "./scenes/register/Register";
import Shipping from "./scenes/shipping/Shipping";
import Payment from "./scenes/payment/Payment";
import PlaceOrder from "./scenes/placeOrder/PlaceOrder";
import Order from "./scenes/order/Order";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="checkout" element={<Checkout />} /> */}
          {/* <Route path="checkout/success" element={<Confirmation />} /> */}

          {/* private Route */}
          <Route path="/shipping" element={<PrivateRoute><Shipping /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/placeorder" element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
          <Route path="/order/:id" element={<PrivateRoute><Order /></PrivateRoute>} />
        </Routes>
        <CartMenu />
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;

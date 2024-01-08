import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ProductDetails from "./scenes/productDetails/ProductDetails";
import Sidebar from "./scenes/global/Sidebar";
import CartMenu from "./scenes/global/CartMenu";
import Login from "./scenes/login/Login";
import Register from "./scenes/register/Register";
import Shipping from "./scenes/shipping/Shipping";
import Payment from "./scenes/payment/Payment";
import PlaceOrder from "./scenes/placeOrder/PlaceOrder";
import Order from "./scenes/order/Order";
import Profile from "./scenes/profile/Profile";
import OrderList from "./scenes/admin/orderList/OrderList";
import ProductList from "./scenes/admin/productList/ProductList";
import ProductEdit from "./scenes/admin/productEdit/ProductEdit"
import UserList from "./scenes/admin/userList/UserList";
import UserEdit from "./scenes/admin/userEdit/UserEdit";
import ProductSearch from "./scenes/productSearch/ProductSearch";
import DeliveryList from "./scenes/admin/deliveryList/DeliveryList";
import DeliveryEdit from "./scenes/admin/deliveryEdit/DeliveryEdit";


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
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<ProductSearch />} />
          <Route path="/page/:pageNumber" element={<Home />} />
          <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* private Route */}
          <Route path="/shipping" element={<PrivateRoute><Shipping /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/placeorder" element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
          <Route path="/order/:id" element={<PrivateRoute><Order /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          {/* admin Route */}
          <Route path="/admin/deliverylist" element={<AdminRoute><DeliveryList /></AdminRoute>} />
          <Route path="/admin/delivery/:id/edit" element={<AdminRoute><DeliveryEdit /></AdminRoute>} />
          <Route path="/admin/orderlist" element={<AdminRoute><OrderList /></AdminRoute>} />
          <Route path="/admin/productlist" element={<AdminRoute><ProductList /></AdminRoute>} />
          <Route path="/admin/productlist/:pageNumber" element={<AdminRoute><ProductList /></AdminRoute>} />
          <Route path="/admin/product/:id/edit" element={<AdminRoute><ProductEdit /></AdminRoute>} />
          <Route path="/admin/userlist" element={<AdminRoute><UserList /></AdminRoute>} />
          <Route path="/admin/user/:id/edit" element={<AdminRoute><UserEdit /></AdminRoute>} />
        </Routes>
        <CartMenu />
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;

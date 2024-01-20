import { useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Layout from "./scenes/layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./scenes/home/Home";
import ProductDetails from "./scenes/productDetails/ProductDetails";
import Login from "./scenes/login/Login";
import Register from "./scenes/register/Register";
import Shipping from "./scenes/shipping/Shipping";
import Payment from "./scenes/payment/Payment";
import PlaceOrder from "./scenes/placeOrder/PlaceOrder";
import Order from "./scenes/order/Order";
import Profile from "./scenes/profile/Profile";
import OrderList from "./scenes/admin/orderList/OrderList";
import ProductList from "./scenes/admin/productList/ProductList";
import ProductEdit from "./scenes/admin/productEdit/ProductEdit";
import UserList from "./scenes/admin/userList/UserList";
import UserEdit from "./scenes/admin/userEdit/UserEdit";
import ProductSearch from "./scenes/productSearch/ProductSearch";
import DeliveryList from "./scenes/admin/deliveryList/DeliveryList";
import DeliveryEdit from "./scenes/admin/deliveryEdit/DeliveryEdit";
import Dashboard from "./scenes/admin/dashboard/Dashboard";
import LayoutDashboard from "./scenes/admin/layoutDashboard/LayoutDashboard";
import Customers from "./scenes/admin/customers/Customers";
import Overview from "./scenes/admin/overview/Overview";
import Daily from "./scenes/admin/daily/Daily";
import Monthly from "./scenes/admin/monthly/Monthly";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <ScrollToTop />
        <Routes>
          <Route element={<LayoutDashboard />}>
            <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path="/products" element={<AdminRoute><ProductList /></AdminRoute>} />
            <Route path="/product/:id/edit" element={<AdminRoute><ProductEdit /></AdminRoute>} />
            <Route path="/ups-delivery" element={<AdminRoute><DeliveryList /></AdminRoute>} />
            <Route path="/ups-delivery/:id/edit" element={<AdminRoute><DeliveryEdit /></AdminRoute>} />
            <Route path="/customers" element={<AdminRoute><Customers /></AdminRoute>} />
            <Route path="/sales/overview" element={<AdminRoute><Overview /></AdminRoute>} />
            <Route path="/sales/daily" element={<AdminRoute><Daily /></AdminRoute>} />
            <Route path="/sales/monthly" element={<AdminRoute><Monthly /></AdminRoute>} />
          </Route>

          <Route element={<Layout />}>
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
            <Route path="/admin/orderlist" element={<AdminRoute><OrderList /></AdminRoute>} />
            <Route path="/admin/productlist" element={<AdminRoute><ProductList /></AdminRoute>} />
            <Route path="/admin/userlist" element={<AdminRoute><UserList /></AdminRoute>} />
            <Route path="/admin/user/:id/edit" element={<AdminRoute><UserEdit /></AdminRoute>} />
          </Route>
        </Routes>
        <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

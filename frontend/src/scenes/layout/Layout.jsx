import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../global/Navbar";
import Footer from "../global/Footer";
import Sidebar from "../global/Sidebar";
import CartMenu from "../global/CartMenu";

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Sidebar />

      <Outlet />
      <Footer />
      <CartMenu />
    </Box>
  );
};

export default Layout;

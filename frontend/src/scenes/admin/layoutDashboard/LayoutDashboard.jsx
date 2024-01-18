import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import SidebarDashboard from "../dashboard/components/SidebarDashboard";
import NavbarDashboard from "../dashboard/components/NavbarDashboard";
// import FlexBetween from '../../components/FlexBetween';

const LayoutDashboard = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const userId = useSelector((state) => state.global.userId);
  // const { data } = useGetUserQuery(userId);
  // console.log("data :", data);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <SidebarDashboard
        //   user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <NavbarDashboard
          // user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutDashboard;

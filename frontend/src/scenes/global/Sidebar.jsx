import {
  Box,
  IconButton,
  Typography,
  Slide,
  useTheme,
  Drawer,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setIsSidebarOpen } from "../../slices/cartSlice";
import { setMode } from "../../slices/globalSlice";
import FlexBetween from "../../components/FlexBetween";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSidebarOpen = useSelector((state) => state.cart.isSidebarOpen);

  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleCloseSidebar = () => {
    if (isSidebarOpen) {
      dispatch(setIsSidebarOpen(false));
    }
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Box
          onClick={handleCloseSidebar}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            position: "fixed",
            zIndex: 9,
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            cursor: "pointer", // Optionnel, pour changer le curseur
          }}
        />
      )}

      <Slide direction="right" in={isSidebarOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "max(200px, 20%)",
            height: "100%",
            // backgroundColor: "white",
            zIndex: 10,
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSixing: "border-box",
          }}
        >
          <Box padding="30px" overflow="auto" height="100%">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h3">PREA</Typography>

              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
              </IconButton>

              <IconButton onClick={() => dispatch(setIsSidebarOpen(false))}>
                <CloseIcon />
              </IconButton>
              {/* Autres éléments de la barre latérale */}
            </Box>
          </Box>
        </Box>
      </Slide>
    </Box>

    //   <Box component="nav">
    //     {isSidebarOpen && (
    //       <Drawer
    //         open={isSidebarOpen}
    //         onClose={() => setIsSidebarOpen(false)}
    //         variant="persistent"
    //         anchor="left"
    //         sx={{
    //           // width: drawerWidth,
    //           "& .MuiDrawer-paper": {
    //             color: theme.palette.secondary[200],
    //             backgroundColor: theme.palette.background.alt,
    //             boxSixing: "border-box",
    //             // borderWidth: isNonMobile ? 0 : "2px",
    //             // width: drawerWidth,
    //           },
    //         }}
    //       >
    //         <Box width="100%">
    //           <Box m="1.5rem 2rem 2rem 3rem">
    //             <FlexBetween color={theme.palette.secondary.main}>
    //               <Box display="flex" alignItems="center" gap="0.5rem">
    //                 <Link to="/">
    //                 <Typography variant="h4" fontWeight="bold">
    //                   Prea e-commerce
    //                 </Typography>
    //                 </Link>
    //               </Box>
    //               {/* {!isNonMobile && (
    //                 <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
    //                   <ChevronLeft />
    //                 </IconButton>
    //               )} */}
    //             </FlexBetween>
    //           </Box>
    //           <List>
    //             {navItems.map(({ text, icon }) => {
    //               if (!icon) {
    //                 return (
    //                   <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
    //                     {text}
    //                   </Typography>
    //                 );
    //               }
    //               const lcText = text.toLowerCase();

    //               return (
    //                 <ListItem key={text} disablePadding>
    //                   <ListItemButton
    //                     onClick={() => {
    //                       navigate(`/${lcText}`);
    //                       setActive(lcText);
    //                     }}
    //                     sx={{
    //                       backgroundColor:
    //                         active === lcText
    //                           ? theme.palette.secondary[300]
    //                           : "transparent",
    //                       color:
    //                         active === lcText
    //                           ? theme.palette.primary[600]
    //                           : theme.palette.secondary[100],
    //                     }}
    //                   >
    //                     <ListItemIcon
    //                       sx={{
    //                         ml: "2rem",
    //                         color:
    //                           active === lcText
    //                             ? theme.palette.primary[600]
    //                             : theme.palette.secondary[200],
    //                       }}
    //                     >
    //                       {icon}
    //                     </ListItemIcon>
    //                     <ListItemText primary={text} />
    //                     {active === lcText && (
    //                       <ChevronRightOutlined sx={{ ml: "auto" }} />
    //                     )}
    //                   </ListItemButton>
    //                 </ListItem>
    //               );
    //             })}
    //           </List>
    //         </Box>

    //         <Box position="absolute" bottom="2rem">
    //           <Divider />
    //           <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
    //             <Box
    //               component="img"
    //               alt="profile"
    //               // src={profileImage}
    //               height="40px"
    //               width="40px"
    //               borderRadius="50%"
    //               sx={{ objectFit: "cover" }}
    //             />
    //             <Box textAlign="left">
    //               <Typography
    //                 fontWeight="bold"
    //                 fontSize="0.9rem"
    //                 sx={{ color: theme.palette.secondary[100] }}
    //               >
    //                 {/* {user.name} */}
    //               </Typography>
    //               <Typography
    //                 fontSize="0.8rem"
    //                 sx={{ color: theme.palette.secondary[200] }}
    //               >
    //                 {/* {user.occupation} */}
    //               </Typography>
    //             </Box>
    //             <SettingsOutlined
    //               sx={{
    //                 color: theme.palette.secondary[300],
    //                 fontSize: "25px ",
    //               }}
    //             />
    //           </FlexBetween>
    //         </Box>
    //       </Drawer>
    //     )}
    //   </Box>
  );
};

export default Sidebar;

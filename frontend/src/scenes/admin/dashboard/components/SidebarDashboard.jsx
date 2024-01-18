import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../../../../components/FlexBetween";

const navItemsFr = [
  {
    text: "Tableau de bord",
    path: "dashboard", // Chemin en anglais
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Produits",
    path: "products", // Chemin en anglais
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Livraison UPS",
    path: "ups-delivery", // Chemin en anglais
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Clients",
    path: "customers", // Chemin en anglais
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    path: "transactions", // Chemin en anglais
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Géographie",
    path: "geography", // Chemin en anglais
    icon: <PublicOutlined />,
  },
  {
    text: "Ventes",
    icon: null,
  },
  {
    text: "Vue d'ensemble",
    path: "sales/overview", // Chemin en anglais
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Journalier",
    path: "sales/daily", // Chemin en anglais
    icon: <TodayOutlined />,
  },
  {
    text: "Mensuel",
    path: "sales/monthly", // Chemin en anglais
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Répartition",
    path: "sales/breakdown", // Chemin en anglais
    icon: <PieChartOutlined />,
  },
  {
    text: "Gestion",
    icon: null,
  },
  {
    text: "Administration",
    path: "management/admin", // Chemin en anglais
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    path: "management/performance", // Chemin en anglais
    icon: <TrendingUpOutlined />,
  },
];

const SidebarDashboard = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Link to="/">
                    <Typography variant="h4" fontWeight="bold">
                      Prea e-commerce
                    </Typography>
                  </Link>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItemsFr.map(({ text, path, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${path}`); // Utilisez la propriété path pour la navigation
                        setActive(path); // Utilisez path pour définir l'élément actif
                      }}
                      sx={{
                        backgroundColor:
                          active === path
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === path
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === path
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === path && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                // src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {/* {user.name} */}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {/* {user.occupation} */}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SidebarDashboard;

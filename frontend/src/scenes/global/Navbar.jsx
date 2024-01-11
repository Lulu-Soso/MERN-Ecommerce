import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  ArrowDropDown,
} from "@mui/icons-material";
import { shades } from "../../theme";
import { setIsSidebarOpen, setIsCartOpen } from "../../slices/cartSlice.js";
import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";
import SearchBox from "../../components/SearchBox.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const isPlaceOrderRoute =
    location.pathname === "/shipping" ||
    location.pathname === "/payment" ||
    location.pathname === "/placeorder";
    // location.pathname.startsWith("/order/");

  const [anchorEl, setAnchorEl] = useState(null); // État pour l'ancrage du menu
  const [scrolled, setScrolled] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Nettoyer l'écouteur d'événements
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
      sx={{
        boxShadow: scrolled ? "0 2px 4px rgba(0,0,0,0.05)" : "none", // Ajoute une ombre légère quand on scroll
      }}
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          width="30%"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => dispatch(setIsSidebarOpen(true))}
            sx={{ color: "black" }}
          >
            <MenuOutlined />
          </IconButton>
          <span
            style={{
              height: "24px",
              width: "1px",
              backgroundColor: "#ddd",
              margin: "0 10px",
            }}
          ></span>
          <Box
            onClick={() => navigate("/")}
            sx={{
              "&:hover": { cursor: "pointer" },
              marginLeft: "10px",
            }}
            color={shades.secondary[500]}
          >
            PREA
          </Box>
        </Box>

        {isPlaceOrderRoute ? (
          <>
            <Box width="40%" textAlign="center">
              <Typography>
                Passer la commande ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                articles)
              </Typography>
            </Box>
            <Box width="30%" textAlign="center"></Box>
          </>
        ) : (
          <>
            <Box width="40%">
              <SearchBox />
            </Box>

            <Box
              width="30%"
              display="flex"
              justifyContent="end"
              columnGap="20px"
              zIndex="2"
            >
              <Badge
                badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}
                color="secondary"
                invisible={cartItems.length === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    right: 5,
                    top: 5,
                    padding: "5px",
                    height: "18px",
                    minWidth: "13px",
                  },
                }}
              >
                <IconButton
                  onClick={() => dispatch(setIsCartOpen(true))}
                  sx={{ color: "black" }}
                >
                  <ShoppingBagOutlined />
                  <Typography>Panier</Typography>
                </IconButton>
              </Badge>

              {/* Combined User and Admin Menu */}
              {userInfo ? (
                <Box>
                  <Button
                    aria-controls="user-admin-menu"
                    aria-haspopup="true"
                    endIcon={<ArrowDropDown />}
                    onClick={handleClick}
                  >
                    <Box>
                      {userInfo.name}
                      {userInfo.isAdmin && (
                        <span style={{ color: "red" }}>{" ***admin*** "}</span>
                      )}
                    </Box>
                  </Button>
                  <Menu
                    id="user-admin-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    {/* User Profile Link */}
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/profile"
                    >
                      Profile
                    </MenuItem>
                    {/* Logout Link */}
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>

                    {/* Admin Links (only if the user is an admin) */}
                    {userInfo.isAdmin && (
                      <>
                        <MenuItem>*** ADMIN ***</MenuItem>
                        <MenuItem
                          style={{ color: "red" }}
                          onClick={handleClose}
                          component={Link}
                          to="/admin/deliverylist"
                        >
                          Livraison
                        </MenuItem>
                        <MenuItem
                          style={{ color: "red" }}
                          onClick={handleClose}
                          component={Link}
                          to="/admin/productlist"
                        >
                          Products
                        </MenuItem>
                        <MenuItem
                          style={{ color: "red" }}
                          onClick={handleClose}
                          component={Link}
                          to="/admin/orderlist"
                        >
                          Orders
                        </MenuItem>
                        <MenuItem
                          style={{ color: "red" }}
                          onClick={handleClose}
                          component={Link}
                          to="/admin/userlist"
                        >
                          Users
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </Box>
              ) : (
                <IconButton
                  component={Link}
                  to="/login"
                  sx={{ color: "black" }}
                >
                  <PersonOutline />
                  <Typography>Identifiez-vous</Typography>
                </IconButton>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;

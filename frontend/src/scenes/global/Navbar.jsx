import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Menu, MenuItem, Button } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
  ArrowDropDown,
} from "@mui/icons-material";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../slices/cartSlice.js";
import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null); // État pour l'ancrage du menu

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
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          MERN ECOMMERCE
        </Box>

        <Box display="flex">
          <Button component={Link} to="/menu1">Menu1</Button>
          <Button component={Link} to="/menu2">Menu2</Button>
          <Button component={Link} to="/menu3">Menu3</Button>
          <Button component={Link} to="/menu4">Menu4</Button>
          <Button component={Link} to="/menu5">Menu5</Button>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>

          <Badge
            badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}
            color="secondary"
            invisible={cartItems.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen(true))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
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
                <MenuItem onClick={handleClose} component={Link} to="/profile">
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
            <IconButton component={Link} to="/login" sx={{ color: "black" }}>
              <PersonOutline />
            </IconButton>
          )}

          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;

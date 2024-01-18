import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Slide,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../slices/cartSlice";
import { addToCart, removeFromCart } from "../../slices/cartSlice";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const goToProductDetails = (item) => {
    dispatch(setIsCartOpen({}));
    navigate(`/product/${item._id}`);
  };

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
    dispatch(setIsCartOpen({}));
  };

  const handleCloseCart = () => {
    if (isCartOpen) {
      dispatch(setIsCartOpen(false));
    }
  };

  return (
    <>
      {isCartOpen && (
        <Box
          onClick={handleCloseCart}
          backgroundColor="rgba(0, 0, 0, 0.4)"
          position="fixed"
          zIndex={9}
          width="100%"
          height="100%"
          left="0"
          top="0"
        />
      )}

      <Slide direction="left" in={isCartOpen} mountOnEnter unmountOnExit>
        <Box
          position="fixed"
          right="0"
          bottom="0"
          width="max(400px, 30%)"
          height="100%"
          // backgroundColor="white"
          zIndex={10}
          sx={{
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSixing: "border-box",
          }}
        >
          <Box padding="30px" overflow="auto" height="100%">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "15px",
              }}
            >
              <Typography variant="h3">PANIER d'ACHAT</Typography>
              <IconButton onClick={() => dispatch(setIsCartOpen(false))}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* CART LIST */}
            <Box>
              {cartItems.length === 0 ? (
                <Typography>Votre panier est vide</Typography>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <Box key={`${item.name}-${item._id}`}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          m: "15px 0",
                        }}
                      >
                        <Box
                          flex="1 1 40%"
                          onClick={() => goToProductDetails(item)}
                          sx={{ cursor: "pointer" }}
                        >
                          <img
                            alt={item.name}
                            width="123px"
                            height="164px"
                            src={item.mainImage}
                          />
                        </Box>
                        <Box flex="1 1 60%">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: "15px",
                            }}
                          >
                            <Typography fontWeight="bold">
                              {item.name}
                            </Typography>
                            <IconButton
                              onClick={() => removeFromCartHandler(item._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                          <Typography>{item.description}</Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              m: "15px 0",
                            }}
                          >
                            <Box mr="20px">
                              <FormControl
                                display="flex"
                                alignItems="center"
                                border={`1.5px solid ${shades.neutral[300]}`}
                                height="60px"
                                p="2px 5px"
                              >
                                <Select
                                  value={item.qty}
                                  onChange={(e) =>
                                    addToCartHandler(
                                      item,
                                      Number(e.target.value)
                                    )
                                  }
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <MenuItem key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </Box>
                            <Typography fontWeight="bold">
                              {item.price} €
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </>
              )}
            </Box>

            {/* ACTIONS */}
            {cartItems.length > 0 && (
              <Box m="20px 0">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    m: "20px 0",
                  }}
                >
                  <Typography fontWeight="bold">
                    SOUS-TOTAL :{" "}
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                    articles
                  </Typography>
                  <Typography fontWeight="bold">
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}{" "}
                    €
                  </Typography>
                </Box>

                <Button
                  sx={{
                    backgroundColor: shades.primary[400],
                    color: "white",
                    borderRadius: 0,
                    minWidth: "100%",
                    padding: "20px 40px",
                    m: "20px 0",
                  }}
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                >
                  Passer la commande (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)} articles)
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Slide>
    </>
  );
};

export default CartMenu;

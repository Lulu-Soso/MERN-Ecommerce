import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../slices/cartSlice";
import { addToCart, removeFromCart } from "../../slices/cartSlice";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

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

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">
              SHOPPING BAG ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
              )
            </Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cartItems.length === 0 ? (
              <Typography>Votre panier est vide</Typography>
            ) : (
              <>
                {cartItems.map((item) => (
                  <Box key={`${item.name}-${item._id}`}>
                    <FlexBox p="15px 0">
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
                        <FlexBox mb="5px">
                          <Typography fontWeight="bold">{item.name}</Typography>
                          <IconButton
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </FlexBox>
                        <Typography>{item.description}</Typography>

                        <FlexBox m="15px 0">
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
                                  addToCartHandler(item, Number(e.target.value))
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
                            ${item.price}
                          </Typography>
                        </FlexBox>
                      </Box>
                    </FlexBox>
                    <Divider />
                  </Box>
                ))}
              </>
            )}
          </Box>

          {/* ACTIONS */}
          {cartItems.length > 0 && (
            <Box m="20px 0">
              <FlexBox m="20px 0">
                <Typography fontWeight="bold">SUBTOTAL</Typography>
                <Typography fontWeight="bold">
                  TOTAL : $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Typography>
              </FlexBox>

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
                PROCEED TO CHECKOUT
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   Grid,
//   Box,
//   List,
//   ListItem,
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../../components/Message";
// import CheckoutSteps from "../../components/CheckoutSteps";
// import Loader from "../../components/Loader";
// import { useCreateOrderMutation } from "../../slices/ordersApiSlice";
// import { saveShippingPrice, clearCartItems } from "../../slices/cartSlice";

// const PlaceOrder = () => {
//   const navigate = useNavigate();

//   const cart = useSelector((state) => state.cart);
//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

//   useEffect(() => {
//     if (!cart.shippingAddress.address) {
//       navigate("/shipping");
//     } else if (!cart.paymentMethod) {
//       navigate("/payment");
//     }
//   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Ici, vous pouvez charger les options de livraison depuis une API si nécessaire
//   }, []);

//   const [deliveryMethod, setDeliveryMethod] = useState("");
//   const [deliveryOptions, setDeliveryOptions] = useState([
//     { id: 1, name: "Gratuit", price: 0 },
//     { id: 2, name: "Ups", price: 5 },
//   ]);

//   const handleDeliveryChange = (event) => {
//     setDeliveryMethod(event.target.value);
//     const selectedOption = deliveryOptions.find(
//       (option) => option.id.toString() === event.target.value
//     );
//     if (selectedOption) {
//       dispatch(saveShippingPrice(selectedOption.price));
//     }
//   };
  

//   const placeOrderHandler = async () => {
//     try {
//       const totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
//       const orderData = {
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         shippingPrice: cart.shippingPrice,
//         taxPrice: cart.taxPrice,
//         totalPrice,
//       };
  
//       const res = await createOrder(orderData).unwrap();
//       dispatch(clearCartItems());
//       navigate(`/order/${res._id}`);
//     } catch (err) {
//       toast.error(err.data.message || err.error);
//     }
//   };
  

//   return (
//     <Box width="80%" m="80px auto">
//       <CheckoutSteps step1 step2 step3 step4 />
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <List>
//             <ListItem>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={3}>
//                   <Typography>
//                     <strong>Adresse de livraison : </strong>
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} md={9}>
//                   <Typography>
//                     {`${cart.shippingAddress.address}, ${cart.shippingAddress.city} 
//                  ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </ListItem>

//             <ListItem>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={3}>
//                   <Typography>
//                     <strong>Mode de paiement : </strong>
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} md={9}>
//                   <Typography>{cart.paymentMethod}</Typography>
//                 </Grid>
//               </Grid>
//             </ListItem>

//             <ListItem>
//               <Box>
//                 <Typography variant="h6">Order Items</Typography>
//                 {cart.cartItems.length === 0 ? (
//                   <Message>Votre panier est vide</Message>
//                 ) : (
//                   <List>
//                     {cart.cartItems.map((item, index) => (
//                       <ListItem key={index}>
//                         <Grid container spacing={1}>
//                           <Grid item md={1}>
//                             <img
//                               src={item.mainImage}
//                               alt={item.name}
//                               style={{ width: "100%" }}
//                             />
//                           </Grid>
//                           <Grid item xs>
//                             <Link to={`/product/${item.product}`}>
//                               {item.name}
//                             </Link>
//                           </Grid>
//                           <Grid item md={4}>
//                             {`${item.qty} x $${item.price} = $${
//                               item.qty * item.price
//                             }`}
//                           </Grid>
//                         </Grid>
//                       </ListItem>
//                     ))}

//                     <ListItem>
//                       <Box>
//                         <Typography variant="h6">Delivery Options</Typography>
//                         <FormControl component="fieldset">
//                           <RadioGroup
//                             aria-label="delivery-method"
//                             name="delivery-method"
//                             value={deliveryMethod}
//                             onChange={handleDeliveryChange}
//                           >
//                             {deliveryOptions.map((option) => (
//                               <FormControlLabel
//                                 key={option.id}
//                                 value={option.id.toString()}
//                                 control={<Radio />}
//                                 label={`${option.name} - $${option.price}`}
//                               />
//                             ))}
//                           </RadioGroup>
//                         </FormControl>
//                       </Box>
//                     </ListItem>
//                   </List>
//                 )}
//               </Box>
//             </ListItem>
//           </List>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" m={2}>
//                 Résumé de la commande
//               </Typography>
//               <Box my={2}>
//                 <Typography>
//                   <strong>Items: </strong>${cart.itemsPrice}
//                 </Typography>
//               </Box>
//               <Box my={2}>
//                 <Typography>
//                   <strong>Shipping: </strong>${cart.shippingPrice}
//                 </Typography>
//               </Box>
//               <Box my={2}>
//                 <Typography>
//                   <strong>Tax: </strong>${cart.taxPrice}
//                 </Typography>
//               </Box>
//               <Box my={2}>
//                 <Typography>
//                   {/* <strong>Total: </strong>${cart.totalPrice} */}
//                   <strong>Total: </strong>${cart.itemsPrice + cart.shippingPrice + cart.taxPrice}
//                 </Typography>
//               </Box>

//               {/* {error && <Message severity="error">{error}</Message>} */}
//               {error && (
//                 <Message severity="error">
//                   {error.data.message || error.error}
//                 </Message>
//               )}

//               <Button
//                 type="button"
//                 variant="contained"
//                 disabled={cart.cartItems.length === 0}
//                 onClick={placeOrderHandler}
//                 // onClick={() => console.log("hello")}
//                 fullWidth
//               >
//                 Passer la Commande
//               </Button>
//               {isLoading && <Loader />}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default PlaceOrder;

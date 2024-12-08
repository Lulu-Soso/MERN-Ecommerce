import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Grid,
  Box,
  List,
  ListItem,
  Card,
  CardContent,
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
// import CheckoutSteps from "../../components/CheckoutSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";
// import { useUpdateOverallStatsMutation } from "../../slices/overallStatsApiSlice";
import { clearCartItems } from "../../slices/cartSlice";
// import { updateOverallStat } from ""

const PlaceOrder = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  // const [updateOverallStats] = useUpdateOverallStatsMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Ici, vous pouvez charger les options de livraison depuis une API si nécessaire
  }, []);

  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryOptions, setDeliveryOptions] = useState([
    { id: 1, name: "Gratuit", price: 0 },
    { id: 2, name: "Ups", price: 10 },
  ]);

  const handleDeliveryChange = (event) => {
    setDeliveryMethod(event.target.value);
    // Mettez à jour le prix de livraison en fonction de l'option choisie
    const selectedOption = deliveryOptions.find(
      (option) => option.id.toString() === event.target.value
    );
    if (selectedOption) {
      // dispatch(updateShippingPrice(selectedOption.price));
    }
  };

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
  
      // Mettez à jour les statistiques globales avec les détails de la commande
      // await updateOverallStats({
      //   year: new Date().getFullYear(), // Obtenez l'année actuelle
      //   cartItems: cart.cartItems,
      //   totalPrice: cart.totalPrice,
      // });
  
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <Box width="80%" m="80px auto">
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <List>
            <ListItem
              sx={{ padding: "30px 0", borderBottom: "1px solid grey" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ marginRight: "10px" }}>
                      <strong>1 - </strong>
                    </Typography>
                    <Typography>
                      <strong>Adresse de livraison : </strong>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography>{cart.shippingAddress.address}</Typography>
                  <Typography>
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.city}
                  </Typography>
                  <Typography>{cart.shippingAddress.country}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem
              sx={{ padding: "30px 0", borderBottom: "1px solid grey" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ marginRight: "10px" }}>
                      <strong>2 -</strong>
                    </Typography>
                    <Typography>
                      <strong>Mode de paiement : </strong>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography>{cart.paymentMethod}</Typography>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem
              sx={{ padding: "30px 0"}}
            >
              <Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ marginRight: "10px" }}>
                    <strong>3 -</strong>
                  </Typography>
                  <Typography>
                    <strong>Vérification et validation de la commande </strong>
                  </Typography>
                </Box>
                {cart.cartItems.length === 0 ? (
                  <Message>Votre panier est vide</Message>
                ) : (
                  <List>
                    {cart.cartItems.map((item, index) => (
                      <ListItem key={index}>
                        <Grid container spacing={1}>
                          <Grid item md={1}>
                            <img
                              src={item.mainImage}
                              alt={item.name}
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid item xs>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Grid>
                          <Grid item md={4}>
                            {`${item.qty} x $${item.price} = $${
                              item.qty * item.price
                            }`}
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}

                    <ListItem>
                      <Box>
                        <Typography variant="h6">Mode de livraison</Typography>
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="delivery-method"
                            name="delivery-method"
                            value={deliveryMethod}
                            onChange={handleDeliveryChange}
                          >
                            {deliveryOptions.map((option) => (
                              <FormControlLabel
                                key={option.id}
                                value={option.id.toString()}
                                control={<Radio />}
                                label={`${option.name} - $${option.price}`}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </ListItem>
                  </List>
                )}
              </Box>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ padding: "5px 0", borderBottom: "1px solid grey" }}>
                <Typography variant="h6">
                  <strong>Récapitulatif de commande</strong>
                </Typography>
                <Box
                  my={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>
                    Sous-total (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                    articles):
                  </Typography>
                  <Typography>{cart.itemsPrice} €</Typography>
                </Box>
                <Box
                  my={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>Livraison:</Typography>
                  <Typography>{cart.shippingPrice} €</Typography>
                </Box>
              </Box>
              <Box sx={{ padding: "5px 0", borderBottom: "1px solid grey" }}>
                <Box
                  my={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "red",
                  }}
                >
                  <Typography variant="h6">
                    <strong>Montant total: </strong>
                  </Typography>
                  <Typography variant="h6">{cart.totalPrice} €</Typography>
                </Box>
                <Box my={2}>
                  <Typography>
                    Le total de la commande inclut la TVA. Voir les détails.
                    {/* ${cart.taxPrice} */}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ padding: "5px 0" }}>
                <Typography>
                  En validant votre commande, vous consentez à respecter les
                  "Conditions générales de vente" de Prea. Nous vous
                  encourageons à prendre connaissance de notre "Politique de
                  Protection des Données Personnelles", notre "Politique sur les
                  Cookies", ainsi que notre "Politique sur les Publicités
                  personnalisées en fonction de vos centres d'intérêt".
                </Typography>
              </Box>

              {/* {error && <Message severity="error">{error}</Message>} */}
              {error && (
                <Message severity="error">
                  {error.data.message || error.error}
                </Message>
              )}

              <Button
                type="button"
                variant="contained"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
                // onClick={() => console.log("hello")}
                fullWidth
              >
                Passer la Commande
              </Button>
              {isLoading && <Loader />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceOrder;

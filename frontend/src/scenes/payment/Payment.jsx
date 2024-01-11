import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  Card,
  CardContent,
} from "@mui/material";
// import FormContainer from "../../components/FormContainer";
// import CheckoutSteps from "../../components/CheckoutSteps";
import { savePaymentMethod } from "../../slices/cartSlice";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(savePaymentMethod(paymentMethod));
  //   navigate("/placeorder");
  // };

  const submitHandler = (e) => {
    if (e) {
      e.preventDefault();
    }
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const handleExternalButtonClick = () => {
    // if (formRef.current) {
    //   formRef.current.submit(); // Soumettez le formulaire en utilisant la référence lorsque le bouton est cliqué
    // }
    submitHandler();
  };

  return (
    <Box width="80%" m="80px auto">
      {/* <CheckoutSteps step1 step2 step3 /> */}
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
                <Grid item xs={12}>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ marginRight: "10px" }}>
                      <strong>2 -</strong>
                    </Typography>
                    <Typography>
                      <strong>Sélectionnez un mode de paiement : </strong>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <form onSubmit={submitHandler}>
                    <RadioGroup
                      aria-label="paymentMethod"
                      name="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value="PayPal"
                        control={<Radio />}
                        label="PayPal ou Carte de crédit"
                      />
                    </RadioGroup>
                  </form>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ padding: "30px 0" }}>
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
                  // <Message>Votre panier est vide</Message>
                  <>Votre panier est vide</>
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
                            {/* <Link to={`/product/${item.product}`}> */}
                            {item.name}
                            {/* </Link> */}
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
                            // value={deliveryMethod}
                            // onChange={handleDeliveryChange}
                          >
                            {/* {deliveryOptions.map((option) => (
                              <FormControlLabel
                                key={option.id}
                                value={option.id.toString()}
                                control={<Radio />}
                                label={`${option.name} - $${option.price}`}
                              />
                            ))} */}
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
                    {/* {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "} */}
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
              {/* {error && (
                <Message severity="error">
                  {error.data.message || error.error}
                </Message>
              )} */}

              <Button
                type="button"
                variant="contained"
                disabled={cart.cartItems.length === 0}
                onClick={handleExternalButtonClick}
                // onClick={placeOrderHandler}
                fullWidth
              >
                Utiliser ce mode de paiement
              </Button>
              {/* {isLoading && <Loader />} */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;

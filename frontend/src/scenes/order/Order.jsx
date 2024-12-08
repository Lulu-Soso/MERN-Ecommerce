import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Grid,
  Box,
  List,
  ListItem,
  Card,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../slices/ordersApiSlice";
import { useUpdateOverallStatsMutation } from "../../slices/overallStatsApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // const [updateOverallStats] = useUpdateOverallStatsMutation();
  const { data: updateOverallStats } = useUpdateOverallStatsMutation();

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        console.log(details);

      // Extrayez les informations nécessaires de 'details' pour la mise à jour des statistiques globales
        const { payer, purchase_units } = details;
        const totalPaid = purchase_units[0].amount.value;

        console.log("Total Paid:", totalPaid);

        // Appelez la fonction updateOverallStats avec les informations appropriées
        await updateOverallStats({
          id: '65b2e55143f94a3f7c3f52a2', // Remplacez par l'ID réel de votre overallStats
          // month: 'January', // Remplacez par le mois correspondant à la commande
          // date: '2021-01-02', // Remplacez par la date correspondant à la commande
          salesIncrement: 100, // Utilisez le montant total payé
          unitsIncrement: 50, // Utilisez le nombre total d'articles dans la commande
          // category: 'shoes', // Remplacez par la catégorie appropriée
        });

        console.log("OverallStats updated successfully");


        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();

    toast.success("Order is paid");
  }
  // TESTING ONLY! REMOVE BEFORE PRODUCTION

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    // <Message severity="error">{error}</Message>
    <Message severity="error">{error?.data?.message || error.error}</Message>
  ) : (
    <Box width="80%" m="80px auto">
      <Typography variant="h4" gutterBottom>
        Commande {order._id}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <List>
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Livraison</Typography>
                  <p>
                    <strong>Nom: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{" "}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Adresse: </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.postalCode}{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message severity="success">
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message severity="error">non livré</Message>
                  )}
                </Grid>
              </Grid>
            </ListItem>

            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Méthode de paiement</Typography>
                  <p>
                    <strong>Méthode: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message severity="success">Payé le {order.paidAt}</Message>
                  ) : (
                    <Message severity="error">Non payé</Message>
                  )}
                </Grid>
              </Grid>
            </ListItem>

            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Articles de la commande</Typography>
                  {order.orderItems.length === 0 ? (
                    <Message>La commande est vide</Message>
                  ) : (
                    order.orderItems.map((item, index) => (
                      <Grid container key={index} spacing={2}>
                        <Grid item xs={1}>
                          <img
                            src={item.mainImage}
                            alt={item.name}
                            style={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Grid>
                        <Grid item xs={3}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Grid>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <List>
                <ListItem>
                  {/* <Typography variant="h6">Résumé de la commande</Typography> */}
                  <Typography variant="h6">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Items</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${order.itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${order.shippingPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${order.taxPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${order.totalPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
              {!order.isPaid && (
                <>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <>
                      {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                      <Button
                        style={{ marginBottom: "10px" }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button>
                      {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}

                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    </>
                  )}
                </>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <Button
                    type="button"
                    variant="contained"
                    onClick={deliverHandler}
                    fullWidth
                  >
                    Marquer comme livré
                  </Button>
                )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;

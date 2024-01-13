import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { updateShippingFees } from "../../../slices/cartSlice";

const labelTranslations = {
  "XSMALL": "XSMALL (Très Petit)",
  "SMALL": "SMALL (Petit)",
  "MEDIUM": "MOYEN (Moyen)",
  "LARGE": "LARGE (Grand)",
  "XLARGE": "XLARGE (Très grand)",
};

const DeliveryEdit = () => {
  const { id: upsId } = useParams();

  const [size, setSize] = useState("");
  const [franceFee, setFranceFee] = useState("");
  const [europeanUnionFee, setEuropeanUnionFee] = useState("");
  const [unitedKingdomFee, setUnitedKingdomFee] = useState("");
  const [unitedStatesFee, setUnitedStatesFee] = useState("");

  // Utilisez useSelector pour accéder aux frais d'expédition dans Redux
  const shippingFees = useSelector((state) => state.cart.shippingFees);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (upsId && shippingFees) {
      // Trouvez la taille correspondante dans les frais d'expédition
      const fee = shippingFees.find((fee) => fee.size === upsId);
      if (fee) {
        setSize(fee.size);
        setFranceFee(fee.fees.france.toString());
        setEuropeanUnionFee(fee.fees.europeanUnion.toString());
        setUnitedKingdomFee(fee.fees.unitedKingdom.toString());
        setUnitedStatesFee(fee.fees.unitedStates.toString());
      }
    }
  }, [upsId, shippingFees]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Mettez à jour les frais d'expédition dans Redux
      const updatedShippingFees = shippingFees.map((fee) =>
        fee.size === upsId
          ? {
              size: fee.size,
              fees: {
                france: parseFloat(franceFee),
                europeanUnion: parseFloat(europeanUnionFee),
                unitedKingdom: parseFloat(unitedKingdomFee),
                unitedStates: parseFloat(unitedStatesFee),
              },
            }
          : fee
      );

      // Dispatchez l'action pour mettre à jour les frais d'expédition
      dispatch(updateShippingFees(updatedShippingFees));

      toast.success("Option de livraison mise à jour");
      navigate("/admin/deliverylist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Box width="80%" m="80px auto">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Link to="/admin/deliverylist" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Retourner
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Modifier l'Option de Livraison</Typography>
        </Grid>

        <Grid item xs={12}>
          {shippingFees && (
            <form onSubmit={submitHandler}>
              <TextField
                label="Taille"
                variant="outlined"
                value={labelTranslations[size]}
                disabled
                // onChange={(e) => setSize(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Frais France"
                type="number"
                variant="outlined"
                value={franceFee}
                onChange={(e) => setFranceFee(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Frais Union Européenne"
                type="number"
                variant="outlined"
                value={europeanUnionFee}
                onChange={(e) => setEuropeanUnionFee(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Frais Royaume-Uni"
                type="number"
                variant="outlined"
                value={unitedKingdomFee}
                onChange={(e) => setUnitedKingdomFee(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Frais Etats-Unis"
                type="number"
                variant="outlined"
                value={unitedStatesFee}
                onChange={(e) => setUnitedStatesFee(e.target.value)}
                margin="normal"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
              >
                Mettre à jour
              </Button>
            </form>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeliveryEdit;

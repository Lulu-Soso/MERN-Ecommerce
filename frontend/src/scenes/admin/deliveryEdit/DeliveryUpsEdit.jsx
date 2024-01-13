import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUpsDetailsQuery,
  useUpdateUpsOptionMutation,
} from "../../../slices/upsApiSlice";

const DeliveryEdit = () => {
    const { id: upsId } = useParams();
  
    const [label, setLabel] = useState("");
    const [franceFee, setFranceFee] = useState("");
    const [europeanUnionFee, setEuropeanUnionFee] = useState("");
    const [unitedKingdomFee, setUnitedKingdomFee] = useState("");
    const [unitedStatesFee, setUnitedStatesFee] = useState("");
  
    const { data: ups, isLoading, refetch, error } = useGetUpsDetailsQuery(upsId);
  
    const [updateDelivery, { isLoading: loadingUpdate }] =
      useUpdateUpsOptionMutation();
    const navigate = useNavigate();
  
    const isAnyLoading = isLoading || loadingUpdate;
  
    useEffect(() => {
      if (ups) {
        setLabel(ups.label);
        setFranceFee(ups?.fees?.france.toString());
        setEuropeanUnionFee(ups?.fees?.europeanUnion.toString());
        setUnitedKingdomFee(ups?.fees?.unitedKingdom.toString());
        setUnitedStatesFee(ups?.fees?.unitedStates.toString());
      }
    }, [ups]);
  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateDelivery({
        upsId,
        label,
        fees: {
          france: parseFloat(franceFee), // Convert to number
          europeanUnion: parseFloat(europeanUnionFee),
          unitedKingdom: parseFloat(unitedKingdomFee),
          unitedStates: parseFloat(unitedStatesFee),
        },
      });
      toast.success("Delivery option updated");
      refetch();
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

        {isAnyLoading ? (
          <Loader />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          <>
            <Grid item xs={12}>
              <form onSubmit={submitHandler}>
                <TextField
                  label="Label"
                  variant="outlined"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
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
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default DeliveryEdit;

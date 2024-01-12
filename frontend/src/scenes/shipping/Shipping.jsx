import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FormContainer from "../../components/FormContainer";
import { saveShippingAddress, updateLocation, calculateShippingPrice } from "../../slices/cartSlice";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [location, setLocation] = useState(shippingAddress?.location || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, location }));
    dispatch(updateLocation(location));
    dispatch(calculateShippingPrice());

    navigate("/payment");
  };

  // const countries = ["France", "Union-Européenne", "Royaume-Uni", "Etats-Unis"];
  const countries = ["france", "europeanUnion", "unitedKingdom", "unitedStates"];

  return (
    <Box width="80%" m="80px auto">
      <FormContainer>
        <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
          Adresse de livraison
        </Typography>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Adresse postale"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Ville"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Code postal"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="country-label">Région</InputLabel>
              <FormControl fullWidth>
                <Select
                  labelId="country-label"
                  id="country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {countries.map((countryOption) => (
                    <MenuItem key={countryOption} value={countryOption}>
                      {countryOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Continue
          </Button>
        </form>
      </FormContainer>
    </Box>
  );
};

export default Shipping;

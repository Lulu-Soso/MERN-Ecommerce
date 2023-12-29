import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
} from "@mui/material";
import FormContainer from "../../components/FormContainer";
import CheckoutSteps from "../../components/CheckoutSteps";
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Box width="80%" m="80px auto">
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <Typography variant="h4" gutterBottom>
          Payment Method
        </Typography>
        <form onSubmit={submitHandler}>
          <Box>
          <FormControl component="fieldset" className="my-3">
            <FormLabel component="legend">Select Method</FormLabel>
            <RadioGroup
              aria-label="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="PayPal"
                control={<Radio />}
                label="PayPal or Credit Card"
              />
            </RadioGroup>
          </FormControl>
          </Box>

          <Box>
          <Button type="submit" variant="contained" color="primary">
            Continue
          </Button>
          </Box>
        </form>
      </FormContainer>
    </Box>
  );
};

export default Payment;

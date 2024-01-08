import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { saveUpsFees } from "../../../slices/upsApiSlice";

const DeliveryOptions = () => {
  const dispatch = useDispatch();
  const upsDeliveryFees = useSelector(
    (state) => state.upsDelivery.feesDelivery
  );

  const [isEdit, setIsEdit] = useState(false);
  const [prices, setPrices] = useState(upsDeliveryFees);

  useEffect(() => {
    if (upsDeliveryFees) {
      setPrices(upsDeliveryFees);
    }
  }, [upsDeliveryFees]);

  const handleEditToggle = () => {
    if (isEdit) {
      localStorage.setItem("upsDeliveryFees", JSON.stringify(prices));
      dispatch(saveUpsFees(prices));
    }
    setIsEdit(!isEdit);
  };

  const handlePriceChange = (size, region, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [size]: {
        ...prevPrices[size],
        fees: {
          ...prevPrices[size].fees,
          [region]: value,
        },
      },
    }));
  };

  return (
    <Box width="80%" m="80px auto">
      <Typography variant="h6">UPS Delivery Options</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Taille du colis</TableCell>
            <TableCell>France</TableCell>
            <TableCell>Union Européenne</TableCell>
            <TableCell>Royaume-Uni</TableCell>
            <TableCell>États-Unis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(prices).map(([size, { label, fees }]) => (
            <TableRow key={size}>
              <TableCell component="th" scope="row">
                {label}
              </TableCell>
              {Object.entries(fees).map(([region, price]) => (
                <TableCell key={region}>
                  {isEdit ? (
                    <TextField
                      value={price}
                      onChange={(e) =>
                        handlePriceChange(size, region, e.target.value)
                      }
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                      size="small"
                    />
                  ) : (
                    `${parseFloat(price).toFixed(2)} €`
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditToggle}
        sx={{ marginBottom: 2 }}
      >
        {isEdit ? "Sauvegarder" : "Modifier les prix de UPS"}
      </Button>
    </Box>
  );
};

export default DeliveryOptions;

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

import {
  useCreateUpsOptionMutation,
  useDeleteUpsOptionMutation,
} from "../../../slices/upsApiSlice";
import { setIsFreeShipping } from "../../../slices/cartSlice";
import { useEffect, useState } from "react";

const labelTranslations = {
  XSMALL: "XSMALL (Très Petit)",
  SMALL: "SMALL (Petit)",
  MEDIUM: "MOYEN (Moyen)",
  LARGE: "LARGE (Grand)",
  XLARGE: "XLARGE (Très grand)",
};

const DeliveryList = () => {
  const dispatch = useDispatch();
  const [selectedOffer, setSelectedOffer] = useState(
    localStorage.getItem("selectedOffer") || null
  );

  const isFreeShipping = useSelector((state) => state.cart.isFreeShipping);
  const shippingFees = useSelector((state) => state.cart.shippingFees);
  const price50 = useSelector((state) => state.cart.price50);
  const price100 = useSelector((state) => state.cart.price100);
  const price150 = useSelector((state) => state.cart.price150);

  const [createUpsOption, { isLoading: upsCreate }] =
    useCreateUpsOptionMutation();

  const [deleteUpsOption, { isLoading: loadingDelete }] =
    useDeleteUpsOptionMutation();

  const isAnyLoading = upsCreate || loadingDelete;

  const enableFreeShipping = (offerPrice) => {
    setSelectedOffer(offerPrice);
    dispatch(setIsFreeShipping());
    localStorage.setItem("selectedOffer", offerPrice); // Stockez la valeur dans le localStorage
  };

  const disableFreeShipping = () => {
    setSelectedOffer(null);
    dispatch(setIsFreeShipping());
    localStorage.removeItem("selectedOffer"); // Supprimez la valeur du localStorage
  };

  const createUpsOptionHandler = async () => {
    if (
      window.confirm("Êtes-vous sûr de vouloir créer une nouvelle option UPS ?")
    ) {
      try {
        await createUpsOption();
        toast.success("Nouvelle option UPS créée");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Êtes-vous sûr ?")) {
      try {
        await deleteUpsOption(id);
        toast.success("Option UPS supprimée");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  useEffect(() => {
    // Chargez la valeur depuis le localStorage lors du montage du composant
    const storedSelectedOffer = localStorage.getItem("selectedOffer");
    if (storedSelectedOffer) {
      setSelectedOffer(parseInt(storedSelectedOffer, 10));
    }
  }, []);

  return (
    <Box width="80%" m="80px auto">
      <Grid container justifyContent="space-around" spacing={3}>
        <Box>
          <Box>
            <Box>
              <FormControl component="fieldset">
                <RadioGroup>
                  <FormControlLabel
                    control={<Radio />}
                    label="Livraison gratuite à partir de 50 €"
                    checked={selectedOffer === 50 && isFreeShipping && price50}
                    onChange={() => enableFreeShipping(50)}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              {selectedOffer === 50 && isFreeShipping && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={disableFreeShipping}
                >
                  Désactiver l'offre
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box>
            <Box>
              <FormControl component="fieldset">
                <RadioGroup>
                  <FormControlLabel
                    control={<Radio />}
                    label="Livraison gratuite à partir de 100 €"
                    checked={
                      selectedOffer === 100 && isFreeShipping && price100
                    }
                    onChange={() => enableFreeShipping(100)}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              {selectedOffer === 100 && isFreeShipping && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={disableFreeShipping}
                >
                  Désactiver l'offre
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box>
            <Box>
              <FormControl component="fieldset">
                <RadioGroup>
                  <FormControlLabel
                    control={<Radio />}
                    label="Livraison gratuite à partir de 150 €"
                    checked={
                      selectedOffer === 150 && isFreeShipping && price150
                    }
                    onChange={() => enableFreeShipping(150)}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              {selectedOffer === 150 && isFreeShipping && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={disableFreeShipping}
                >
                  Désactiver l'offre
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Tarifs UPS
          </Typography>
        </Grid>
        <Grid item>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={createUpsOptionHandler}
          >
            Créer un champ UPS
          </Button>
        </Grid>
      </Grid>
      {isAnyLoading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Taille</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>France</TableCell>
                <TableCell>Union-Européenne</TableCell>
                <TableCell>Royaume-Uni</TableCell>
                <TableCell>Etats-Unis</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shippingFees?.map((fee) => (
                <TableRow key={fee.size}>
                  <TableCell>{labelTranslations[fee.size]}</TableCell>
                  <TableCell>{fee.volume}</TableCell>
                  <TableCell>{fee.fees.france} € TTC</TableCell>
                  <TableCell>{fee.fees.europeanUnion} € TTC</TableCell>
                  <TableCell>{fee.fees.unitedKingdom} € TTC</TableCell>
                  <TableCell>{fee.fees.unitedStates} € TTC</TableCell>
                  <TableCell>
                    <Link
                      to={`/admin/delivery/${fee.size}/edit`}
                      style={{ marginRight: "10px" }}
                    >
                      <Button variant="outlined">
                        <EditIcon />
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteHandler(fee.size)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default DeliveryList;

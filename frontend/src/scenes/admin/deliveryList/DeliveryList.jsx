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
  Radio
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

const labelTranslations = {
  "XSMALL": "XSMALL (Très Petit)",
  "SMALL": "SMALL (Petit)",
  "MEDIUM": "MOYEN (Moyen)",
  "LARGE": "LARGE (Grand)",
  "XLARGE": "XLARGE (Très grand)",
};

const DeliveryList = () => {
  const dispatch = useDispatch();

  const isFreeShipping = useSelector((state) => state.cart.isFreeShipping);
  const shippingFees = useSelector((state) => state.cart.shippingFees);

  const [createUpsOption, { isLoading: upsCreate }] =
    useCreateUpsOptionMutation();

  const [deleteUpsOption, { isLoading: loadingDelete }] =
    useDeleteUpsOptionMutation();

  const isAnyLoading = upsCreate || loadingDelete;

  const enableFreeShipping = () => {
    dispatch(setIsFreeShipping());
  };

  const disableFreeShipping = () => {
    dispatch(setIsFreeShipping());
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

  return (
    <Box width="80%" m="80px auto">
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Offre Livraison
          </Typography>
          <Box>
            <FormControl component="fieldset">
              <RadioGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Livraison gratuite à partir de 100 €"
                  checked={isFreeShipping}
                  onChange={enableFreeShipping}
                />
              </RadioGroup>
            </FormControl>
            {isFreeShipping && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={disableFreeShipping}
              >
                Désactiver l'offre
              </Button>
            )}
          </Box>
        </Grid>

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

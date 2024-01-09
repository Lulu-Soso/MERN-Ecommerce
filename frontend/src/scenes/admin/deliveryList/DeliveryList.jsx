import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
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
import {
  useGetUpsOptionsQuery,
  useCreateUpsOptionMutation,
  useDeleteUpsOptionMutation,
} from "../../../slices/upsApiSlice";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';

import { toggleFreeShipping } from "../../../slices/cartSlice"

const labelTranslations = {
  "Very Small": "Très Petit",
  Small: "Petit",
  Medium: "Moyen",
  Large: "Grand",
  "Very Large": "Très Grand",
};

const DeliveryList = () => {
  const {
    data: ups,
    isLoading: upsLoading,
    error: upsError,
    refetch,
  } = useGetUpsOptionsQuery();

  const dispatch = useDispatch()

  const freeShippingEnabled = useSelector((state) => state.cart.freeShippingEnabled);

  const [createUpsOption, { isLoading: upsCreate }] =
    useCreateUpsOptionMutation();

  const [deleteUpsOption, { isLoading: loadingDelete }] =
    useDeleteUpsOptionMutation();

  const isAnyLoading = upsLoading || upsCreate || loadingDelete;

  const enableFreeShipping = () => {
    if (toggleFreeShipping) {
      dispatch(toggleFreeShipping());
    }
  };

  const disableFreeShipping = () => {
    dispatch(toggleFreeShipping()); 
  };

  const createUpsOptionHandler = async () => {
    if (
      window.confirm("Êtes-vous sûr de vouloir créer une nouvelle option UPS ?")
    ) {
      try {
        await createUpsOption();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Êtes-vous sûr ?")) {
      try {
        await deleteUpsOption(id);
        toast.success("Product deleted");
        refetch();
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
                  checked={freeShippingEnabled}
                  onChange={enableFreeShipping}
                />
              </RadioGroup>
            </FormControl>
            {freeShippingEnabled && (
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
      ) : upsError ? (
        <Message severity="error">{upsError}</Message>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell>France</TableCell>
                <TableCell>European Union</TableCell>
                <TableCell>United Kingdom</TableCell>
                <TableCell>United States</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ups?.map((option) => (
                <TableRow key={option._id}>
                  <TableCell>{labelTranslations[option.label]}</TableCell>
                  <TableCell>{option.fees.france} € TTC</TableCell>
                  <TableCell>{option.fees.europeanUnion} € TTC</TableCell>
                  <TableCell>{option.fees.unitedKingdom} € TTC</TableCell>
                  <TableCell>{option.fees.unitedStates} € TTC</TableCell>
                  <TableCell>
                    <Link
                      to={`/admin/delivery/${option._id}/edit`}
                      style={{ marginRight: "10px" }}
                    >
                      <Button variant="outlined">
                        <EditIcon />
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteHandler(option._id)}
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

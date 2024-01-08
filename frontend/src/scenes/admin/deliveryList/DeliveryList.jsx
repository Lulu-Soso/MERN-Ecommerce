import { Link } from "react-router-dom";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetUpsOptionsQuery,
  useCreateUpsOptionMutation,
  useDeleteUpsOptionMutation,
} from "../../../slices/upsApiSlice"; // Assurez-vous que le chemin est correct
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

const DeliveryList = () => {
  // Utilisez useGetUpsOptionsQuery pour obtenir les options UPS
  const {
    data: ups,
    isLoading: upsLoading,
    error: upsError,
    refetch,
  } = useGetUpsOptionsQuery();

  const [createUpsOption, { isLoading: upsCreate }] =
    useCreateUpsOptionMutation();

  const [deleteUpsOption, { isLoading: loadingDelete }] =
    useDeleteUpsOptionMutation();

  const isAnyLoading = upsLoading || upsCreate || loadingDelete;

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
            Créer une option UPS
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
                    <TableCell>{option.label}</TableCell>
                    <TableCell>{option.fees.france}</TableCell>
                    <TableCell>{option.fees.europeanUnion}</TableCell>
                    <TableCell>{option.fees.unitedKingdom}</TableCell>
                    <TableCell>{option.fees.unitedStates}</TableCell>
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

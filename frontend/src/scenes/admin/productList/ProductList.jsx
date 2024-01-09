import { Link, useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Paginate from '../../../components/Paginate';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const { pageNumber } = useParams()
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const isAnyLoading = isLoading || loadingCreate || loadingDelete;

  const createProductHandler = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir créer un nouveau produit ?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Êtes-vous sûr ?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Box width="80%" m="80px auto">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4">Produits</Typography>
        </Grid>
        <Grid item>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={createProductHandler}
          >
            Créer un Produit
          </Button>
        </Grid>
      </Grid>

      {isAnyLoading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>NOM</TableCell>
                  <TableCell>PRIX</TableCell>
                  <TableCell>CATÉGORIE</TableCell>
                  <TableCell>MARQUE</TableCell>
                  <TableCell>TAILLE</TableCell>
                  <TableCell>DIMENSIONS</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price} €</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.size}</TableCell>
                    <TableCell>{product.packageSize.L} x {product.packageSize.W} x {product.packageSize.H}</TableCell>
                    <TableCell>
                      <Link to={`/admin/product/${product._id}/edit`} style={{ marginRight: '10px' }}>
                        <Button variant="outlined">
                          <EditIcon />
                        </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </Box>
  );
};

export default ProductList;

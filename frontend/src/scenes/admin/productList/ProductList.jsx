import { Link } from "react-router-dom";
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
import { useParams } from "react-router-dom";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
// import Paginate from '../../../components/Paginate';
import {
  useGetProductsQuery,
  //   useDeleteProductMutation,
  //   useCreateProductMutation,
} from "../../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const isAnyLoading = isLoading 

  const deleteHandler = (id) => {
    console.log('delete', id);
  }

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
            // onClick={createProductHandler}
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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price} €</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <Button startIcon={<EditIcon />} />
                      </Link>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteHandler(product._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
        </>
      )}
    </Box>
  );
};

export default ProductList;

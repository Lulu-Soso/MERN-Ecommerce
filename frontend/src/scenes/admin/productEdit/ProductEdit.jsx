import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../../slices/productsApiSlice";

const ProductEdit = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  const navigate = useNavigate();

  const isAnyLoading = isLoading || loadingUpdate || loadingUpload;

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success("Product updated");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Box width="80%" m="80px auto">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Link to="/admin/productlist" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Retourner
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Modifier le Produit</Typography>
        </Grid>

        {/* {isAnyLoading && <Loader />}
        {error ? (
          <Message severity="error">{error}</Message>
        ) : ( */}
        {isAnyLoading ? (
          <Loader />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          <Grid item xs={12}>
            <form onSubmit={submitHandler}>
              <TextField
                label="Image URL"
                variant="outlined"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                margin="normal"
                fullWidth
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={uploadFileHandler}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "1rem 0" }}
                >
                  Télécharger une image
                </Button>
              </label>
              <TextField
                label="Nom"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Prix"
                type="number"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Marque"
                variant="outlined"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Quantité en Stock"
                type="number"
                variant="outlined"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Catégorie"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
        )}
      </Grid>
    </Box>
  );
};

export default ProductEdit;
import React, { useState, useEffect } from "react";
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
  const [mainImage, setMainImage] = useState("");
  const [thumbnail1, setThumbnail1] = useState("");
  const [thumbnail2, setThumbnail2] = useState("");
  const [thumbnail3, setThumbnail3] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  console.log(length, width, height);

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
      setMainImage(product.mainImage);
      setThumbnail1(product.thumbnailImages[0]);
      setThumbnail2(product.thumbnailImages[1]);
      setThumbnail3(product.thumbnailImages[2]);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setSize(product.size);
      setLength(product.packageSize.L);
      setWidth(product.packageSize.W);
      setHeight(product.packageSize.H);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        mainImage,
        thumbnail1,
        thumbnail2,
        thumbnail3,
        brand,
        category,
        description,
        countInStock,
        size,
        length,
        width,
        height,
      });
      toast.success("Product updated");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e, fieldName) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      if (fieldName === "mainImage") {
        setMainImage(res.image);
      } else if (fieldName === "thumbnail1") {
        setThumbnail1(res.image);
      } else if (fieldName === "thumbnail2") {
        setThumbnail2(res.image);
      } else if (fieldName === "thumbnail3") {
        setThumbnail3(res.image);
      }
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

        {isAnyLoading ? (
          <Loader />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          <Grid item xs={12}>
            <form onSubmit={submitHandler}>
              <Box>
                <img
                  src={mainImage}
                  alt={name}
                  style={{ maxWidth: "100px", margin: "1rem 0" }}
                />
                <TextField
                  label="Image URL"
                  variant="outlined"
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  margin="normal"
                  fullWidth
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file-mainImage"
                  multiple
                  type="file"
                  onChange={(e) => uploadFileHandler(e, "mainImage")}
                />
                <label htmlFor="raised-button-file-mainImage">
                  <Button
                    variant="contained"
                    component="span"
                    style={{ margin: "1rem 0" }}
                  >
                    Télécharger une image principale
                  </Button>
                </label>
              </Box>
              <Box>
                <img
                  src={thumbnail1}
                  alt={name}
                  style={{ maxWidth: "100px", margin: "1rem 0" }}
                />
                <TextField
                  label="Image URL"
                  variant="outlined"
                  value={thumbnail1}
                  onChange={(e) => setThumbnail1(e.target.value)}
                  margin="normal"
                  fullWidth
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file-thumbnail1"
                  multiple
                  type="file"
                  onChange={(e) => uploadFileHandler(e, "thumbnail1")}
                />
                <label htmlFor="raised-button-file-thumbnail1">
                  <Button
                    variant="contained"
                    component="span"
                    style={{ margin: "1rem 0" }}
                  >
                    Télécharger une image miniature 1
                  </Button>
                </label>
              </Box>
              <Box>
                <img
                  src={thumbnail2}
                  alt={name}
                  style={{ maxWidth: "100px", margin: "1rem 0" }}
                />
                <TextField
                  label="Image URL"
                  variant="outlined"
                  value={thumbnail2}
                  onChange={(e) => setThumbnail2(e.target.value)}
                  margin="normal"
                  fullWidth
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file-thumbnail2"
                  multiple
                  type="file"
                  onChange={(e) => uploadFileHandler(e, "thumbnail2")}
                />
                <label htmlFor="raised-button-file-thumbnail2">
                  <Button
                    variant="contained"
                    component="span"
                    style={{ margin: "1rem 0" }}
                  >
                    Télécharger une image miniature 2
                  </Button>
                </label>
              </Box>
              <Box>
                <img
                  src={thumbnail3}
                  alt={name}
                  style={{ maxWidth: "100px", margin: "1rem 0" }}
                />
                <TextField
                  label="Image URL"
                  variant="outlined"
                  value={thumbnail3}
                  onChange={(e) => setThumbnail3(e.target.value)}
                  margin="normal"
                  fullWidth
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file-thumbnail3"
                  multiple
                  type="file"
                  onChange={(e) => uploadFileHandler(e, "thumbnail3")}
                />
                <label htmlFor="raised-button-file-thumbnail3">
                  <Button
                    variant="contained"
                    component="span"
                    style={{ margin: "1rem 0" }}
                  >
                    Télécharger une image miniature 3
                  </Button>
                </label>
              </Box>
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
              <TextField
                label="Taille"
                variant="outlined"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Longueur du colis"
                variant="outlined"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Largeur du colis"
                variant="outlined"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Hauteur du colis"
                variant="outlined"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
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

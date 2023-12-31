import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Product from "../../components/Product.jsx";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { shades } from "../../theme.js";
import { useDispatch } from "react-redux";
import Rating from "../../components/Rating.jsx";
import React from "react";
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
} from "../../slices/productsApiSlice.js";
import { addToCart } from "../../slices/cartSlice.js";

const ProductDetails = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const [value, setValue] = useState("description");

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsQuery();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Si le produit est chargé, définir l'image sélectionnée
  useState(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (isProductLoading || isProductsLoading) {
    return <Loader />;
  }

  if (productError) {
    return (
      <Box width="80%" m="20px auto">
        <Message severity="error">
          {productError?.data.message || productError.error}
        </Message>
      </Box>
    );
  }

  if (productsError) {
    return (
      <Box width="80%" m="20px auto">
        <Message severity="error">
          {productsError?.data.message || productsError.error}
        </Message>
      </Box>
    );
  }

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        {/* <Box flex="1 1 40%" mb="40px">
          <img
            alt={product.name}
            width="100%"
            height="100%"
            src={product.image}
            style={{ objectFit: "contain" }}
          />
        </Box> */}
        {/* <Box flex="1 1 40%" mb="40px"> */}
        <Box flex="1 1 40%">
          <Box>
          <img
            alt={product.name}
            width="100%"
            height="100%"
            src={product.image}
            // src={selectedImage}
            style={{ objectFit: "contain" }}
          />
          </Box>
          {/* Mini Images pour la sélection */}
          <Box display="flex" justifyContent="space-between">
            {[
              product.image,
              product.image,
              product.image,
            ].map((imgSrc, index) => (
              <img
              key={`mini-image-${index}`}
              alt={`Variante ${index + 1} de ${product.name}`}
              src={imgSrc}
              style={{
                width: "30%", 
                height: "auto",
                objectFit: "cover",
                cursor: "pointer",
                // margin: "0 1%", 
              }}
              onClick={() => setSelectedImage(imgSrc)}
            />
            ))}
          </Box>
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{product.name}</Typography>
            <Typography>${product.price}</Typography>
            <Typography sx={{ mt: "20px" }}>{product?.description}</Typography>
          </Box>

          <Box m="20px 0">
            <Typography>
              {product.countInStock > 0 ? "En Stock" : "Rupture de Stock"}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            {product.countInStock > 0 && (
              <React.Fragment>
                <Box mr="20px">
                  <FormControl
                    display="flex"
                    alignItems="center"
                    border={`1.5px solid ${shades.neutral[300]}`}
                    height="60px"
                    p="2px 5px"
                  >
                    <Select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Button
                  sx={{
                    backgroundColor: "#222222",
                    color: "white",
                    borderRadius: 0,
                    minWidth: "150px",
                    padding: "10px 40px",
                  }}
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  ADD TO CART
                </Button>
              </React.Fragment>
            )}
          </Box>

          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />

          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {product.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && <div>{product.description}</div>}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {products.slice(0, 4).map((product, i) => (
            <Product key={`${product.name}-${i}`} product={product} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;

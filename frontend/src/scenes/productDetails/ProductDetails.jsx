import { useEffect, useState } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Product from "../../components/Product.jsx";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme.js";
// import { addToCart } from "../../state/index.js";
import { useDispatch } from "react-redux";
// import products from "../../products.js";
import Rating from "../../components/Rating.jsx";
import React from "react";
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
} from "../../slices/productsApiSlice.js";

const ProductDetails = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useGetProductDetailsQuery(productId);

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsQuery();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isProductLoading || isProductsLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (productError) {
    return (
      <Typography>
        Error: {productError?.data.message || productError.error}
      </Typography>
    );
  }

  if (productsError) {
    return (
      <Typography>
        Error: {productsError?.data.message || productsError.error}
      </Typography>
    );
  }

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            // alt={item?.name}
            alt={product.name}
            width="100%"
            height="100%"
            src={product.image}
            style={{ objectFit: "contain" }}
          />
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

          <Box display="flex" alignItems="center" minHeight="50px">
            {product.countInStock > 0 && (
              <React.Fragment>
                <Box
                  display="flex"
                  alignItems="center"
                  border={`1.5px solid ${shades.neutral[300]}`}
                  mr="20px"
                  p="2px 5px"
                >
                  <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                  <IconButton onClick={() => setCount(count + 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>

                <Button
                  sx={{
                    backgroundColor: "#222222",
                    color: "white",
                    borderRadius: 0,
                    minWidth: "150px",
                    padding: "10px 40px",
                  }}
                  // onClick={() =>
                  //   dispatch(addToCart({ item: { ...product, count } }))
                  // }
                >
                  ADD TO CART
                </Button>
              </React.Fragment>
            )}

            <Typography sx={{ ml: product.countInStock > 0 ? "20px" : "0" }}>
              {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
            </Typography>
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

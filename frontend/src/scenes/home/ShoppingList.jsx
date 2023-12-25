import React, { useState } from "react";
// import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { setItems } from "../../state";

const ShoppingList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  // const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  // const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  // console.log("items", items);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const topRatedItems = products?.filter(
    (product) => product.category === "topRated"
  );
  const newArrivalsItems = products?.filter(
    (product) => product.category === "newArrivals"
  );
  const bestSellersItems = products?.filter(
    (product) => product.category === "bestSellers"
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Box width="80%" margin="20px auto">
          <Message severity="error">
            {error?.data?.message || error.error}
          </Message>
        </Box>
      ) : (
        <Box width="80%" margin="80px auto">
          <Typography variant="h3" textAlign="center">
            Our Featured <b>Products</b>
          </Typography>
          <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              sx: { display: breakPoint ? "block" : "none" },
            }}
            sx={{
              m: "25px",
              "& .MuiTabs-flexContainer": {
                flexWrap: "wrap",
              },
            }}
          >
            <Tab label="ALL" value="all" />
            <Tab label="NEW ARRIVALS" value="newArrivals" />
            <Tab label="BEST SELLERS" value="bestSellers" />
            <Tab label="TOP RATED" value="topRated" />
          </Tabs>
          <Box
            margin="0 auto"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, 300px)"
            justifyContent="space-around"
            rowGap="20px"
            columnGap="1.33%"
          >
            {/* {products.map((product) => (
            <Product item={product} key={`${product.name}-${product._id}`} />
          ))} */}

            {value === "all" &&
              products.map((product) => (
                <Product
                  product={product}
                  key={`${product.name}-${product._id}`}
                />
              ))}
            {value === "newArrivals" &&
              newArrivalsItems.map((product) => (
                <Product
                  product={product}
                  key={`${product.name}-${product._id}`}
                />
              ))}
            {value === "bestSellers" &&
              bestSellersItems.map((product) => (
                <Product
                  product={product}
                  key={`${product.name}-${product._id}`}
                />
              ))}
            {value === "topRated" &&
              topRatedItems.map((product) => (
                <Product
                  product={product}
                  key={`${product.name}-${product._id}`}
                />
              ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ShoppingList;

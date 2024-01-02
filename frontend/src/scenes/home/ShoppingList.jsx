import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Paginate from "../../components/Paginate";

const ShoppingList = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const [value, setValue] = useState("all");
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const topRatedItems = data?.products.filter(
    (product) => product.category === "topRated"
  );
  const newArrivalsItems = data?.products.filter(
    (product) => product.category === "newArrivals"
  );
  const bestSellersItems = data?.products.filter(
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
            {value === "all" &&
              data?.products.map((product) => (
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
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </Box>
      )}
    </>
  );
};

export default ShoppingList;

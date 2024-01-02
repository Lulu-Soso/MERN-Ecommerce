import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Paginate from "../../components/Paginate";

const ProductSearch = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  // const breakPoint = useMediaQuery("(min-width:600px)");

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" width="100%">
      <Box width="20%" minWidth="200px" p="10px">
        <Box>
          <Typography m="10px 0">
            hello colonne gauche Hello
          </Typography>
          <Typography m="10px 0">
            hello colonne gauche Hello
          </Typography>
          <Typography m="10px 0">
            hello colonne gauche Hello
          </Typography>
          <Typography m="10px 0">
            hello colonne gauche Hello
          </Typography>
          <Typography m="10px 0">
            hello colonne gauche Hello
          </Typography>
          <Typography m="10px 0">
            hello colonne gauche Hello
          </Typography>
          <Typography m="10px 0">
            hello colonne gauche Hello
          </Typography>
          <Typography m="10px 0">
            hello colonne gauche Hello
          </Typography>
        </Box>
        </Box>
      {/* {keyword && <Link to="/">Go Back</Link>} */}
      {isLoading ? (
          <Loader />
        ) : error ? (
          <Box flex="1">
            <Message severity="error">
              {error?.data?.message || error.error}
            </Message>
          </Box>
        ) : (
          <Box flex="1">
          <Box
              display="grid"
              // gridTemplateColumns="repeat(auto-fill, 24%)"
              gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
              justifyContent="space-between"
              // gridTemplateColumns="repeat(4, 1fr)"
              gap="10px"
            >
            {data?.products.map((product) => (
              <Box key={`${product.name}-${product._id}`} width="100%">
              <Product
                product={product}
                key={`${product.name}-${product._id}`}
              />
              </Box>
            ))}
          </Box>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </Box>
      )}
      </Box>
    </Box>
  );
};

export default ProductSearch;

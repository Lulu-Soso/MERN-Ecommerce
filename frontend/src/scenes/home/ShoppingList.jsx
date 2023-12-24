import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Product from "../../components/Product";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { useDispatch, useSelector } from "react-redux";
// import { setItems } from "../../state";


const ShoppingList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);



  // const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  // const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  // console.log("items", items);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // async function getItems() {
  //   const items = await fetch(
  //     "http://localhost:1337/api/items?populate=image",
  //     { method: "GET" }
  //   );
  //   const itemsJson = await items.json();
  //   dispatch(setItems(itemsJson.data));
  // }

  // useEffect(() => {
  //   getItems();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const topRatedItems = products.filter((item) => item.category === "topRated");
  const newArrivalsItems = products.filter(
    (item) => item.category === "newArrivals"
  );
  const bestSellersItems = products.filter(
    (item) => item.category === "bestSellers"
  );

  return (
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
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
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
        {products.map((item) => (
          <Product item={item} key={`${item.name}-${item.id}`} />
        ))}

        {value === "all" &&
          products.map((item) => (
            <Product item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Product item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Product item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Product item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;

import { useState } from "react";
// import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product, width }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  return (
    // <Box width={width}>
    <Box 
      width={width} 
      border="1px solid #f0f0f0"
      borderRadius="5px"
      overflow="hidden"
    >
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={product.name}
          width="100%"
          // height="400px"
          height="320px"
          // src={`http://localhost:1337${url}`}
          src={product.mainImage}
          onClick={() => navigate(`/product/${product._id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              // onClick={() => {
              //   dispatch(addToCart({ item: { ...item, count } }));
              // }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px" p="10px 5px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {product.category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>

        <Box sx={{ height: "1.5rem", overflow: "hidden" }}>
          <Typography
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "100%",
            }}
          >
            {product.name}
          </Typography>
        </Box>

        <Rating value={product.rating} text={`${product.numReviews} avis`} />

        <Typography fontWeight="bold">${product.price}</Typography>
      </Box>
    </Box>
  );
};

export default Product;

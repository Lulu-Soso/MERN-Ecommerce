import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  TextField,
  InputLabel,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Product from "../../components/Product.jsx";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { shades } from "../../theme.js";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../components/Rating.jsx";
import React from "react";
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useCreateReviewMutation,
} from "../../slices/productsApiSlice.js";
import { toast } from "react-toastify";
import { addToCart } from "../../slices/cartSlice.js";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProductDetails = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const infoRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = useState("description");
  const zoomRef = useRef(null);

  const [cadragePos, setCadragePos] = useState({ x: 0, y: 0 });
  const [cadrageVisible, setCadrageVisible] = useState(false);
  const cadrageSize = { width: 250, height: 250 };

  // Style pour le cadrage avec des points
  const cadrageStyle = {
    position: "absolute",
    left: `${cadragePos.x}px`,
    top: `${cadragePos.y}px`,
    width: `${cadrageSize.width}px`,
    height: `${cadrageSize.height}px`,
    pointerEvents: "none",
    backgroundSize: "2px 2px",
    backgroundImage: `
      linear-gradient(to right, rgba(128, 128, 128, 0.3) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(128, 128, 128, 0.3) 1px, transparent 1px)
    `,
    borderRadius: "50%",
  };

  const {
    data: product,
    isLoading: isProductLoading,
    refetch,
    error: productError,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  const {
    data,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsQuery();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const isAnyLoading = loadingProductReview || isProductsLoading;

  const [hoveredImage, setHoveredImage] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedImage(product.mainImage);
      setThumbnails([product.mainImage, ...product.thumbnailImages]);
      setHoveredImage(product.mainImage); // Image principale par défaut pour le survol
    }
  }, [product]);

  const handleThumbnailHover = (imgSrc) => {
    setHoveredImage(imgSrc); // Mettre à jour l'image survolée
    setSelectedImage(imgSrc);
  };

  const handleMouseLeaveThumbnails = () => {
    setHoveredImage(selectedImage); // Réinitialiser l'image survolée à l'image sélectionnée
  };

  const handleMouseMove = (e) => {
    if (zoomRef.current) {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;

      // Utiliser clientX et clientY pour calculer la position du cadrage
      const cadrageX = Math.min(
        width - cadrageSize.width,
        Math.max(0, e.clientX - left - cadrageSize.width / 2)
      );
      const cadrageY = Math.min(
        height - cadrageSize.height,
        Math.max(0, e.clientY - top - cadrageSize.height / 2)
      );
      setCadragePos({ x: cadrageX, y: cadrageY });
    }
  };

  const handleMouseEnter = () => {
    zoomRef.current.style.display = "block";
    setCadrageVisible(true);
  };

  const handleMouseLeave = () => {
    zoomRef.current.style.display = "none";
    setCadrageVisible(false);
  };

  useEffect(() => {
    if (zoomRef.current && selectedImage) {
      zoomRef.current.style.backgroundImage = `url(${selectedImage})`;
    }
  }, [selectedImage]);

  if (isProductLoading || isProductsLoading) {
    return <Loader />;
  }

  if (productError) {
    return (
      <Box width="80%" m="20px auto">
        <Message severity="error">
          {productError?.data?.message || productError.error}
        </Message>
      </Box>
    );
  }

  if (productsError) {
    return (
      <Box width="80%" m="20px auto">
        <Message severity="error">
          {productsError?.data?.message || productsError.error}
        </Message>
      </Box>
    );
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Box width="80%" m="80px auto">
      {isProductLoading ? (
        <Loader />
      ) : productError ? (
        <Message severity="error">{productError}</Message>
      ) : (
        <>
          <Box display="flex" flexWrap="wrap" columnGap="40px">
            {/* IMAGES */}
            <Box
              flex="1 1 40%"
              sx={{
                position: isMobile ? "static" : "sticky",
                top: 80,
                alignSelf: "flex-start",
                maxHeight: isMobile ? "none" : "100vh",
                overflowY: "auto",
              }}
              onMouseLeave={handleMouseLeaveThumbnails}
            >
              <img
                alt={product.name}
                src={selectedImage}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  transition: "opacity 0.5s ease",
                  borderRadius: "10px",
                }}
              />
              {cadrageVisible && <Box sx={cadrageStyle} />}
              <Box display="flex" justifyContent="space-around" mt="10px">
                {thumbnails.map((imgSrc, index) => (
                  <img
                    key={`thumbnail-${index}`}
                    alt={`Thumbnail ${index + 1}`}
                    src={imgSrc}
                    style={{
                      width: "22%",
                      height: "auto",
                      objectFit: "cover",
                      cursor: "pointer",
                      margin: "0 1%",
                      border:
                        imgSrc === hoveredImage ? "2px solid black" : "none",
                      borderRadius: "10px",
                    }}
                    onMouseEnter={() => handleThumbnailHover(imgSrc)}
                  />
                ))}
              </Box>
            </Box>

            {/* Zone de loupe */}

            {/* ACTIONS */}
            <Box flex="1 1 50%" mb="40px" ref={infoRef}>
              {selectedImage && (
                <Box
                  ref={zoomRef}
                  sx={{
                    width: "100%",
                    maxWidth: "42.6vw", // Largeur maximale, vous pouvez ajuster cette valeur
                    height: 600,
                    backgroundSize: "200%",
                    display: "none",
                    position: "absolute",
                    // border: "1px solid rgba(128, 128, 128, 0.3) 1px",
                    zIndex: 0,
                    backgroundImage: `url(${selectedImage})`,
                    borderRadius: "10px",
                  }}
                />
              )}

              <Box display="flex" mb="40px" justifyContent="space-between">
                <Box>Home/Item</Box>
                <Box>Prev Next</Box>
              </Box>

              <Box m="65px 0 25px 0">
                <Typography variant="h3">{product.name}</Typography>
                <Typography>${product.price}</Typography>
                <Typography sx={{ mt: "20px" }}>
                  {product?.description}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ my: "50px" }}>
                  {product?.description}
                </Typography>
                <Typography sx={{ my: "50px" }}>
                  {product?.description}
                </Typography>
                <Typography sx={{ my: "50px" }}>
                  {product?.description}
                </Typography>
                <Typography sx={{ my: "50px" }}>
                  {product?.description}
                </Typography>
                <Typography sx={{ my: "50px" }}>
                  {product?.description}
                </Typography>
                <Typography sx={{ my: "50px" }}>
                  {product?.description}
                </Typography>
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
                text={`${product.numReviews} avis`}
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
              <Tab label="AVIS" value="reviews" />
            </Tabs>
          </Box>
          <Box display="flex" flexWrap="wrap" gap="15px">
            {value === "description" && (
              <Box>
                <Typography>{product.description}</Typography>
                <Typography>Taille: {product.packageSize.size}</Typography>
                <Typography>Dimensions: (L x l x H) {product.packageSize.dimensions.L} cm x {product.packageSize.dimensions.W} cm x {product.packageSize.dimensions.H} cm </Typography>
              </Box>
            )}
            {value === "reviews" && (
              <Box width="40%">
                <Box>
                  {product.reviews.length === 0 && (
                    <Message>Pas d'avis</Message>
                  )}
                  <List>
                    {product.reviews.map((review) => (
                      <ListItem key={review._id}>
                        <Box>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} readOnly />
                          <Typography component="p">
                            {review.createdAt.substring(0, 10)}
                          </Typography>
                          <Typography component="p">
                            {review.comment}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                    <ListItem>
                      <Box>
                        <Typography variant="h6">Écrire un avis</Typography>
                        {loadingProductReview && <Loader />}
                        {userInfo ? (
                          <form onSubmit={submitHandler}>
                            <FormControl fullWidth margin="normal">
                              <InputLabel>Évaluation</InputLabel>
                              <Select
                                required
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <MenuItem value="">Sélectionner...</MenuItem>
                                <MenuItem value="1">1 - Poor</MenuItem>
                                <MenuItem value="2">2 - Fair</MenuItem>
                                <MenuItem value="3">3 - Good</MenuItem>
                                <MenuItem value="4">4 - Very Good</MenuItem>
                                <MenuItem value="5">5 - Excellent</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                              <TextField
                                label="Commentaire"
                                required
                                multiline
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                fullWidth
                              />
                            </FormControl>
                            <Button
                              disabled={loadingProductReview}
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              Envoyer
                            </Button>
                          </form>
                        ) : (
                          <Message>
                            Veuillez vous <Link to="/login">connecter</Link>{" "}
                            pour écrire un avis.
                          </Message>
                        )}
                      </Box>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            )}
          </Box>

          {/* RELATED ITEMS */}
          <Box mt="50px" width="100%">
            <Typography variant="h3" fontWeight="bold">
              Related Products
            </Typography>
            <Box
              mt="20px"
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              justifyContent="space-between"
              gap="20px"
            >
              {data?.products.slice(0, 4).map((product, i) => (
                <Product key={`${product.name}-${i}`} product={product} />
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductDetails;

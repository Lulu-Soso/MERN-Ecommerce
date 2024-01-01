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
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsQuery();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const isAnyLoading = loadingProductReview || isProductsLoading;

  useEffect(() => {
    if (product) {
      setSelectedImage(product.mainImage);
      // Filtrer pour exclure l'image principale et s'assurer qu'il y a maximum 3 vignettes
      const thumbnailImages = product.thumbnailImages
        .filter((img) => img !== product.mainImage)
        .slice(0, 3);
      setThumbnails(thumbnailImages);
    }
  }, [product]);

  const handleThumbnailClick = (clickedImage) => {
    // Trouver l'index de l'image vignette cliquée dans le tableau
    const clickedIndex = thumbnails.findIndex((img) => img === clickedImage);

    // Construire un nouveau tableau de vignettes
    let updatedThumbnails = [...thumbnails];

    // Remplacer la vignette cliquée par l'ancienne image principale
    updatedThumbnails[clickedIndex] = selectedImage;

    // Mettre à jour l'image principale et le tableau des vignettes
    setSelectedImage(clickedImage);
    setThumbnails(updatedThumbnails);
  };

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
                position: isMobile ? "static" : "sticky", // `static` pour mobile, `sticky` pour les autres
                top: 80,
                alignSelf: "flex-start",
                maxHeight: isMobile ? "none" : "100vh", // `none` pour mobile, `100vh` pour les autres
                overflowY: "auto",
              }}
            >
              <img
                alt={product.name}
                src={selectedImage}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
              <Box display="flex" justifyContent="space-around" mt="10px">
                {thumbnails.map((imgSrc, index) => (
                  <img
                    key={`thumbnail-${index}`}
                    alt={`Thumbnail ${index + 1}`}
                    src={imgSrc}
                    style={{
                      width: "30%", // Chaque image occupe 30% de l'espace
                      height: "auto",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => handleThumbnailClick(imgSrc)}
                  />
                ))}
              </Box>
            </Box>

            {/* ACTIONS */}
            <Box flex="1 1 50%" mb="40px" ref={infoRef}>
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
          {/* </>
      )} */}

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
        </>
      )}
    </Box>
  );
};

export default ProductDetails;

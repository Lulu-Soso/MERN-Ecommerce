import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// const FREE_SHIPPING_THRESHOLD = 100;
// const SHIPPING_COST = 10;

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      isCartOpen: false,
      isSidebarOpen: false,
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "Paypal",
      shippingPrice: 10,
      isFreeShipping: false,
      freeShippingThreshold: 150,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setIsSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // saveShippingPrice: (state, action) => {
    //   state.shippingPrice = action.payload;
    //   localStorage.setItem('cart', JSON.stringify(state));
    // },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    setIsFreeShipping: (state) => {
      state.isFreeShipping = !state.isFreeShipping;

      // Mettre à jour le totalPrice en fonction de l'offre de livraison gratuite et du seuil
      // if (state.isFreeShipping === true) {
      //   // Prix total gratuit
      //   state.totalPrice = 0;
      // } else {
        // Calcul du prix total en fonction du seuil de livraison gratuite
        if (state.isFreeShipping && state.totalPrice >= state.freeShippingThreshold) {
          state.shippingPrice = 0;
        // } else {
        //   // Calcul du prix d'expédition normal (ajoutez votre logique ici)
        //   // state.shippingPrice = ... ;
        //   state.shippingPrice = 10;
        }
      

      // Mettez à jour le localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    setFreeShippingThreshold: (state, action) => {
      state.freeShippingThreshold = action.payload;

      // Mettre à jour le totalPrice en fonction du nouveau seuil de livraison gratuite
      if (state.isFreeShipping && state.totalPrice > state.freeShippingThreshold) {
        // Calcul du prix d'expédition normal (ajoutez votre logique ici)
        state.shippingPrice = 0 ;
      }

      // Mettez à jour le localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },     
  },
});

export const {
  setIsCartOpen,
  setIsSidebarOpen,
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  // saveShippingPrice,
  clearCartItems,
  setIsFreeShipping,
  setFreeShippingThreshold
} = cartSlice.actions;

export default cartSlice.reducer;

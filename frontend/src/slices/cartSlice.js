import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 10;

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      isCartOpen: false,
      isSidebarOpen: false,
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "Paypal",
      shippingPrice: 0,
      freeShippingEnabled: false,
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
    saveShippingPrice: (state, action) => {
      state.shippingPrice = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    toggleFreeShipping: (state) => {
      state.freeShippingEnabled = !state.freeShippingEnabled;
      localStorage.setItem('cart', JSON.stringify(state));

      if (state.freeShippingEnabled) {
        state.shippingPrice = 0;
      } else {
        state.shippingPrice = SHIPPING_COST;
      }
    
      return updateCart(state);
    }      
  },
});

export const {
  setIsCartOpen,
  setIsSidebarOpen,
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  saveShippingPrice,
  clearCartItems,
  toggleFreeShipping
} = cartSlice.actions;

export default cartSlice.reducer;

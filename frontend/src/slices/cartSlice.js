import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// Définir les frais de livraison UPS
// const initializeUpsDeliveryFees = () => {
//   const savedUpsDeliveryFees = localStorage.getItem('upsDeliveryFees');
//   return savedUpsDeliveryFees ? JSON.parse(savedUpsDeliveryFees) : {
//     tresPetit: { france: 0, ue: 0, royaumeUni: 0, etatsUnis: 0 },
//     petit: { france: 0, ue: 0, royaumeUni: 0, etatsUnis: 0 },
//     moyen: { france: 0, ue: 0, royaumeUni: 0, etatsUnis: 0 },
//     grand: { france: 0, ue: 0, royaumeUni: 0, etatsUnis: 0 },
//     tresGrand: { france: 0, ue: 0, royaumeUni: 0, etatsUnis: 0 }
//   };
// };


const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      isCartOpen: false,
      isSidebarOpen: false,
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "Paypal",
      shippingPrice: 0,
      // upsDelivery: initializeUpsDeliveryFees(), 
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
    // saveUpsDeliveryOption: (state, action) => {
    //   const { size, region, priceDelivery } = action.payload;
    //   if (state.upsDelivery[size]) {
    //     state.upsDelivery[size][region] = priceDelivery;
    //     localStorage.setItem('upsDeliveryFees', JSON.stringify(state.upsDelivery));
    //   }
    // },       
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
  saveUpsDeliveryOption
} = cartSlice.actions;

export default cartSlice.reducer;

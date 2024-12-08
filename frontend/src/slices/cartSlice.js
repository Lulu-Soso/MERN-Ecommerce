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
      shippingPrice: 0,
      isFreeShipping: false,
      priceOption: 0,
      location: "",
      shippingFees: [
        {
          size: "XSMALL",
          volume: "max 10 000 cm3",
          fees: {
            france: 5.76,
            europeanUnion: 12.6,
            unitedKingdom: 16,
            unitedStates: 44,
          },
        },
        {
          size: "SMALL",
          volume: "max 25 000 cm3",
          fees: {
            france: 9.48,
            europeanUnion: 15.84,
            unitedKingdom: 19,
            unitedStates: 65.6,
          },
        },
        {
          size: "MEDIUM",
          volume: "max 50 000 cm3",
          fees: {
            france: 13.44,
            europeanUnion: 20.28,
            unitedKingdom: 26.9,
            unitedStates: 102.9,
          },
        },
        {
          size: "LARGE",
          volume: "max 75 000 cm3",
          fees: {
            france: 17.04,
            europeanUnion: 29.16,
            unitedKingdom: 32.6,
            unitedStates: 152.2,
          },
        },
        {
          size: "XLARGE",
          volume: "max 100 000 cm3",
          fees: {
            france: 19.8,
            europeanUnion: 39.12,
            unitedKingdom: 37.9,
            unitedStates: 190,
          },
        },
      ],
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
      const removedItemId = action.payload;
      const removedItem = state.cartItems.find((x) => x._id === removedItemId);

      if (removedItem) {
        state.cartItems = state.cartItems.filter(
          (x) => x._id !== removedItemId
        );

        // Mettez à jour le coût de livraison en fonction des articles restants dans le panier
        const { shippingFees, location } = state;
        let totalShippingPrice = 0;

        state.cartItems.forEach((item) => {
          const { size, qty } = item;

          if (size && location) {
            const shippingFee = shippingFees.find((fee) => fee.size === size);
            if (shippingFee && shippingFee.fees[location]) {
              const shippingRate = shippingFee.fees[location];
              const quantity = parseInt(qty, 10);
              totalShippingPrice += shippingRate * quantity;
            }
          }
        });
        state.shippingPrice = totalShippingPrice;

        return updateCart(state);
      }
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    setIsFreeShipping: (state) => {
      state.isFreeShipping = !state.isFreeShipping;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateLocation: (state, action) => {
      state.location = action.payload;
      updateCart(state);
    },

    setPriceOption: (state, action) => {
      state.priceOption = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removePriceOption: (state) => {
      state.priceOption = null;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    calculateShippingPrice: (state) => {
      if (
        state.isFreeShipping &&
        state.priceOption &&
        state.totalPrice >= state.priceOption
      ) {
        state.shippingPrice = 0;
      } else {
        const { cartItems, shippingFees, location } = state;
    
        if (!shippingFees || !location) {
          console.error("Shipping fees or location is missing.");
          state.shippingPrice = 0;
          return updateCart(state);
        }
    
        let totalShippingPrice = 0;
    
        // Calculate total shipping price with safe checks
        cartItems.forEach((item) => {
          const { size, qty } = item;
    
          if (!size || !qty || !location) {
            console.warn("Invalid item size, quantity, or location:", item);
            return; // Skip invalid items
          }
    
          const shippingFee = shippingFees.find((fee) => fee.size === size);
    
          if (shippingFee && shippingFee.fees[location]) {
            const shippingRate = shippingFee.fees[location];
            const quantity = parseInt(qty, 10) || 0;
            totalShippingPrice += shippingRate * quantity;
          } else {
            console.warn("No shipping fee found for size:", size, "and location:", location);
          }
        });
    
        state.shippingPrice = totalShippingPrice;
      }
    
      return updateCart(state);
    },    

    updateShippingFees: (state, action) => {
      state.shippingFees = action.payload;
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
  clearCartItems,
  setIsFreeShipping,
  updateLocation,
  setPriceOption,
  removePriceOption,
  calculateShippingPrice,
  updateShippingFees,
} = cartSlice.actions;

export default cartSlice.reducer;

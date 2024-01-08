import { createSlice } from "@reduxjs/toolkit";

const initialUpsFees = {
  verySmall: {
    label: "Très Petit",
    fees: {
      france: 5.76,
      europeanUnion: 12.6,
      unitedKingdomi: 16,
      unitedStates: 44,
    },
  },
  small: {
    label: "Petit",
    fees: {
      france: 9.48,
      europeanUnion: 15.84,
      unitedKingdom: 19,
      unitedStates: 65.6,
    },
  },
  medium: {
    label: "Moyen",
    fees: {
      france: 13.44,
      europeanUnion: 20.28,
      unitedKingdom: 26.9,
      unitedStates: 102.9,
    },
  },
  large: {
    label: "Grand",
    fees: {
      france: 17.04,
      ue: 29.16,
      unitedKingdom: 32.6,
      unitedStates: 152.2,
    },
  },
  veryLarge: {
    label: "Très Grand",
    fees: {
      france: 19.8,
      europeanUnion: 39.12,
      royaumeUni: 37.9,
      unitedStates: 190,
    },
  },
};

const initialState = {
  upsFeesDelivery: localStorage.getItem("upsDeliveryFees")
    ? JSON.parse(localStorage.getItem("upsDeliveryFees"))
    : initialUpsFees,
};

export const upsApiSlice = createSlice({
  name: "upsDelivery",
  initialState,
  reducers: {
    saveUpsFees: (state, action) => {
      state.upsFeesDelivery = action.payload;
      localStorage.setItem("upsDeliveryFees", JSON.stringify(action.payload));
    },
    // ... autres réducteurs si nécessaire ...
  },
});

export const { saveUpsFees } = upsApiSlice.actions;

export default upsApiSlice.reducer;

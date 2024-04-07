import { createSlice } from "@reduxjs/toolkit";
import { NEWARRIVALS_PRODUCTS } from "./data";

const newArrivalSlice = createSlice({
  name: "newArrival",
  initialState: NEWARRIVALS_PRODUCTS,
  reducers: {
    addNewArrivalProducts: (store, action) => {
      return store;
    },
  },
});

export const newArrivalSliceAction = newArrivalSlice.actions;
export default newArrivalSlice;

import { createSlice } from "@reduxjs/toolkit";

const featuredItemsSlice = createSlice({
  name: "featuredItems",
  initialState: [],
  reducers: {
    addFeaturedProducts: (store, action) => {
      store = action.payload;
      return store;
    },
  },
});

export const featuredItemsAction = featuredItemsSlice.actions;
export default featuredItemsSlice;

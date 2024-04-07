import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addInitialItems: (store, action) => {
      store = action.payload;
      return store;
    },
  },
});

export const itemsAction = itemSlice.actions;
export default itemSlice;

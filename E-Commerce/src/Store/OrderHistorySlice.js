import { createSlice } from "@reduxjs/toolkit";

const OrderHistorySlice = createSlice({
  name: "orderHistory",
  initialState: null,
  reducers: {
    loadHistory: (store, actions) => {
      store = actions.payload;
      return store;
    },
    deleteHistory: (store, actions) => {
      return store.filter((e) => e._id !== actions.payload);
    },
  },
});

export const OrderHistoryAction = OrderHistorySlice.actions;
export default OrderHistorySlice;

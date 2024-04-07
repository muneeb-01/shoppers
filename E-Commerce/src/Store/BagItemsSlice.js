import { createSlice } from "@reduxjs/toolkit";

const bagItemsSlice = createSlice({
  name: "bagItemsSlice",
  initialState: [],
  reducers: {
    initialCart: (store, action) => {
      store = action.payload;
      return store;
    },
    addbagItems: (store, action) => {
      const index = store.findIndex((e) => {
        return e.item.id == action.payload.item.id;
      });
      if (index >= 0) {
        store[index].quantity += action.payload.quantity;
      } else {
        store.push(action.payload);
      }
    },

    deleteBagItems: (store, action) => {
      return store.filter((e) => e.item.id !== action.payload);
    },
    handleQuantity: (store, action) => {
      const index = store.findIndex((e) => {
        return e.item._id === action.payload.id;
      });
      if (store[index].quantity > 1 && action.payload.qty == -1) {
        store[index].quantity += action.payload.qty;
      } else if (store[index].quantity >= 1 && action.payload.qty == 1) {
        store[index].quantity += action.payload.qty;
      }
    },
  },
});

export const bagItemsAction = bagItemsSlice.actions;
export default bagItemsSlice;

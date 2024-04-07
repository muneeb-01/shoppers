import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemSlice";
import featuredItemsSlice from "./featuredItemsSlice";
import bagItemsSlice from "./BagItemsSlice";
import fetchStatusSlice from "./FetchingSlice";
import userinformationSlice from "./userInformationSlice";
import OrderHistorySlice from "./OrderHistorySlice";

const caraStore = configureStore({
  reducer: {
    items: itemSlice.reducer,
    featuredItems: featuredItemsSlice.reducer,
    bagItems: bagItemsSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    userinformation: userinformationSlice.reducer,
    orderHistory: OrderHistorySlice.reducer,
  },
});

export default caraStore;

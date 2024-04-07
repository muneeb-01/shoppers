import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
  name: "fetchingStatus",
  initialState: {
    fetchDone: false,
    currentlyFetching: false,
  },
  reducers: {
    markFetchDone: (store) => {
      store.fetchDone = true;
      return store;
    },
    markFetchingStarted: (store) => {
      store.currentlyFetching = true;
      return store;
    },
    markFetchOver: (store) => {
      store.currentlyFetching = false;
      return store;
    },
  },
});

export const fetchingAction = fetchStatusSlice.actions;
export default fetchStatusSlice;

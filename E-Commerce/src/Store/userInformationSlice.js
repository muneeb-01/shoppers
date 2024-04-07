import { createSlice } from "@reduxjs/toolkit";

const userinformationSlice = createSlice({
  name: "userInformation",
  initialState: null,
  reducers: {
    addInitialInformation: (store, action) => {
      store = action.payload;
      return store;
    },
  },
});

export const userInformationAction = userinformationSlice.actions;
export default userinformationSlice;

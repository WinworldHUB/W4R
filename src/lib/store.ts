import { configureStore } from "@reduxjs/toolkit";
import { invoiceReducer } from "./reducers/invoiceSlice";

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
  },
});

export default store;

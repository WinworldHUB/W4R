import { configureStore } from "@reduxjs/toolkit";
import { invoiceReducer } from "./reducers/invoiceSlice";
import { orderReducer } from "./reducers/ordersSlice";

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    order: orderReducer,
  },
});

export default store;

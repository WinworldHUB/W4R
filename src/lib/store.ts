import { configureStore } from "@reduxjs/toolkit";
import { invoiceReducer } from "./reducers/invoiceSlice";
import { orderReducer } from "./reducers/ordersSlice";
import { usersReducer } from "./reducers/usersSlice";

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    order: orderReducer,
    users: usersReducer
  },
});

export default store;

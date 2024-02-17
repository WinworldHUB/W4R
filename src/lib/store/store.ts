import { configureStore } from "@reduxjs/toolkit";
import { invoiceReducer } from "./invoices/invoiceSlice";
import { orderReducer } from "./orders/ordersSlice";
import { usersReducer } from "./users/usersSlice";

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    order: orderReducer,
    users: usersReducer
  },
});

export default store;

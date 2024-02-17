import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InvoiceState {
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload;
    },
  },
});

export const { setInvoices } = invoiceSlice.actions;
export const invoiceReducer = invoiceSlice.reducer;
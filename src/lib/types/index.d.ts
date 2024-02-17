type Invoice = {
  InvoiceId: number;
  OrderId: number;
  PaymentDate: string;
  InvoiceDate: string;
  Status: string;
}

type MenuItem = {
  id: number;
  label: String;
  icon: React.ReactElement;
};

type Order = {
  id: number;
  orderValue: number;
  status: string;
  orderDate: string;
  paymentDate?: string;
};

type User = {
  ID: number;
  Status: string;
  "Customer ID": number;
  "Customer email": string;
  "Customer name": string;
  "Customer phone": string;
  "Delivery first name": string;
  "Delivery last name": string;
  "Delivery address 1": string;
  "Delivery address 2": string;
  "Delivery province code": string;
  "Delivery city": string;
  "Delivery zip": string;
  "Delivery country code": string;
  "Delivery phone": string;
  "Delivery company": string;
  "Delivery price amount": number;
  "Delivery price currency": string;
  "Created at": string;
  "Updated at": string;
  "Next order date": string;
  "Billing interval type": string;
  "Billing interval count": number;
  "Billing min cycles": number;
  "Billing max cycles": number;
  "Delivery interval type": string;
  "Delivery interval count": number;
  "Payment ID": string;
  "Payment method name": string;
  "Payment method brand": string;
  "Payment method expiry year": number;
  "Payment method expiry month": number;
  "Payment method last digits": number;
  "Line 0 title": string;
  "Line 0 SKU": boolean;
  "Line 0 quantity": number;
  "Line 0 price amount": number;
  "Line 0 price currency": string;
  "Line 0 product ID": number;
  "Line 0 variant ID": number;
  "Line 0 selling plan ID": number;
  "Line 0 selling plan name": string;
  "Line 0 Attributes": string;
  "Cancellation date": string;
  "Cancellation reason": string;
  "Paused on date": string;
  "Total renewals till date": number;
  "First order name": string;
  "First order amount": number;
  "Last order name": string;
  "Last order date": string;
  "Last order amount": number;
  "Discount applied": string;
}

type RootState = ReturnType<typeof rootReducer>;
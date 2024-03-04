interface AppState {
  isUserLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;

  setAppState: ({
    isUserLoggedIn,
    accessToken,
    refreshToken,
  }: AppState) => void;
}

interface PageProps {
  selectedMenuId: number;
  menuItems: MenuItem[];
}

interface DataTableProps<T> {
  isEditable?: boolean;
  data: T[];
  onCreateClick?: VoidFunction;
  onRowClicked?: Dispatch<SetStateAction<Order>>;
  onDataImport?: (data: T[]) => void;
}

type MenuItem = {
  id: number;
  label: string;
  icon: React.ReactElement;
  route: string;
};

type Order = {
  id: string;
  orderValue: number;
  status: string;
  orderDate: string;
  paymentDate?: string;
  products?: Product[];
  member?: Member;
  packaging?: Packaging;
};

type Invoice = {
  id: number;
  orderId: number;
  paymentDate: string;
  invoiceDate: string;
  orderDate: string;
  orderValue: number;
  status: string;
};

type Member = {
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
};

// type Product = {
//   id: number;
//   Handle: string;
//   Title: string;
//   "Body (HTML)": string;
//   Vendor: string;
//   "Product Category": string;
//   Type: string;
//   Tags: string;
//   Published: boolean;
//   "Option1 Name": string;
//   "Option1 Value": string;
//   "Option2 Name": string;
//   "Option2 Value": string;
//   "Option3 Name": string;
//   "Option3 Value": string;
//   "Variant SKU": string;
//   "Variant Grams": number;
//   "Variant Inventory Tracker": string;
//   "Variant Inventory Qty": number;
//   "Variant Inventory Policy": string;
//   "Variant Fulfillment Service": string;
//   "Variant Price": number;
//   "Variant Compare At Price": any;
//   "Variant Requires Shipping": boolean;
//   "Variant Taxable": boolean;
//   "Variant Barcode": string;
//   "Image Src": string;
//   "Image Position": number;
//   "Image Alt Text": string;
//   "Gift Card": boolean;
//   "SEO Title": string;
//   "SEO Description": string;
//   "Google Shopping ": {
//     " Google Product Category": string;
//     " Gender": string;
//     " Age Group": string;
//     " MPN": string;
//     " Condition": string;
//     " Custom Product": string;
//     " Custom Label 0": string;
//     " Custom Label 1": string;
//     " Custom Label 2": string;
//     " Custom Label 3": string;
//     " Custom Label 4": string;
//   };
//   "Variant Image": string;
//   "Variant Weight Unit": string;
//   "Variant Tax Code": string;
//   "Cost per item": string;
//   "Included ": {
//     " United Kingdom": boolean;
//     " European Union": boolean;
//     " International": boolean;
//   };
//   "Price ": {
//     " United Kingdom": string;
//     " European Union": string;
//     " International": string;
//   };
//   "Compare At Price ": {
//     " United Kingdom": string;
//     " European Union": string;
//     " International": string;
//   };
//   Status: string;
//   quantity?: number;
// };

type Product = {
  id: string;
  title: string;
  body: string;
  category: string;
  published: boolean;
  size: string;
  variants: {
    size: string;
    available: boolean;
    price: number;
    quantity: number;
  }[];
  quantity: number;
  price: number;
  taxable: boolean;
  featuredImage: string;
  otherImages: string;
};

type Packaging = {
  id: string;
  title: string;
  description: string;
  minQuantity: number;
  maxQuantity: number;
  available: boolean;
};

/** To be Removed */
interface TestUserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: TestUser[];
  support: Support;
}

interface TestUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface Support {
  url: string;
  text: string;
}

interface CreatedTestUser {
  name: string;
  job: string;
  id: string;
  createdAt: Date;
}

/** To be Removed */

interface Credentials {
  email: string;
  password: string;
}

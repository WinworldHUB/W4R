interface PageProps {
  selectedMenuId: number;
  menuItems: MenuItem[];
}

type MenuItem = {
  id: number;
  label: string;
  icon: React.ReactElement;
  route: string;
};

type Order = {
  id: number;
  orderValue: number;
  status: string;
  orderDate: string;
  paymentDate?: string;
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


type Product = {
  Handle: string;
  Title: string;
  BodyHTML: string;
  Vendor: string;
  ProductCategory: string;
  ProductType: string;
  ProductTags: string;
  Published: boolean;
  Option1Name: string;
  Option1Value: string;
  Option2Name: string;
  Option2Value: string;
  Option3Name: string;
  Option3Value: string;
  VariantSKU: string;
  VariantGrams: number;
  VariantInventoryTracker: string;
  VariantInventoryQty: number;
  VariantInventoryPolicy: string;
  VariantFulfillmentService: string;
  VariantPrice: number;
  VariantCompareAtPrice: number | null;
  VariantRequiresShipping: boolean;
  VariantTaxable: boolean;
  VariantBarcode: string;
  ImageSrc: string;
  ImagePosition: number;
  ImageAltText: string;
  IsGiftCard: boolean;
  SEOTitle: string;
  SEODescription: string;
  GoogleShopping: {
    GoogleProductCategory: string;
    Gender: string;
    AgeGroup: string;
    MPN: string;
    Condition: string;
    CustomProduct: string;
    CustomLabel0: string;
    CustomLabel1: string;
    CustomLabel2: string;
    CustomLabel3: string;
    CustomLabel4: string;
  };
};

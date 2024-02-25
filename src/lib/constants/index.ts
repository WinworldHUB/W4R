export enum PageRoutes {
  Home = "/",
  Login = "/login",
  Invoices = "/invoices",
  Members = "/members",
  Products = "/products",
}

export enum CreateOrderSlides {
  SelectPackaging = 0,
  SelectMember = 1,
  SelectProducts = 2,
  SelectQuantities = 3,
  Preview = 4,
}

export const BACKGROUND_ANIMATION_STYLE: React.CSSProperties = {
  transition: "background-color 0.3s",
};

export const APP_CONVERSION_DATE_FORMAT = "dd/MM/yyyy";
export const APP_SHORT_DATE_FORMAT = "dd MMM yyyy";
export const APP_LONG_DATE_FORMAT = "DDDD";

export const KEY_LATEST = "Latest";
export const KEY_UNPAID = "Unpaid";
export const KEY_ALL = "All";

export const DEFAULT_PACKAGINGS: Packaging[] = [
  {
    id: "1",
    title: "Box packaging",
    description:
      "With box packaging type you can order minimum 6 quantities and maximum 10 quantities in one order. For more quantities split the order into two or more",
    minQuantity: 6,
    maxQuantity: 10,
    available: true,
  },
  {
    id: "2",
    title: "Flat-pack packaging",
    description:
      "With flat-pack packaging type you can order minimum 6 quantities and maximum 12 quantities in one order. For more quantities split the order into two or more",
    minQuantity: 6,
    maxQuantity: 12,
    available: true,
  },
];

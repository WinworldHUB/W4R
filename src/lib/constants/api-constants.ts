export const DEFAULT_GET_API_HEADER = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
export const DEFAULT_POST_API_HEADER = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};
export const API_BASE_URL = "https://apis.wholesale4resale.com";
// export const API_BASE_URL = "http://localhost:3000";

export const TEST_APIS = {
  GET_API: "https://reqres.in/api/users?page=2",
  POST_API: "https://reqres.in/api/users",
};

export const PRODUCTS_APIS = {
  GET_ALL_PRODUCTS_API: "/products",
  ADD_PRODUCT_API: "/products",
  IMPORT_PRODUCTS_API: "/products/imports",
};

export const MEMBERS_APIS = {
  GET_ALL_MEMBERS_API: "/members",
  GET_MEMBER_BY_EMAIL_API: "/members",
  ADD_MEMBER_API: "/members",
  IMPORT_MEMBERS_API: "/members/imports",
};

export const ORDERS_APIS = {
  GET_ALL_ORDERS_API: "/orders",
  ADD_ORDER_API: "/orders",
  UPDATE_ORDER_API: "/orders",
};

export const INVOICES_APIS = {
  GET_ALL_INVOICES_API: "/invoices",
  UPDATE_INVOICE_API: "/invoices",
};

export const COGNITO_ERROR_CODE = [
  "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED",
];

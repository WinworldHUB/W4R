const token = localStorage.getItem("CognitoIdentityServiceProvider.15lqu9c3b2kucjkkrtlap6l9k3.0c17cd2a-ece6-4c3f-b9dc-ffeb99fdb80f.accessToken");

export const DEFAULT_GET_API_HEADER = {
  "Authorization": `Token ${token}`,
};

export const DEFAULT_POST_API_HEADER = {
  "Content-Type": "application/json",
};
export const API_BASE_URL = "https://main.d20i40zf49k8k8.amplifyapp.com";
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

export const COGNITO_ERROR_CODE = [
  "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED",
];

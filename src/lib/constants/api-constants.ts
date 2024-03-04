export const DEFAULT_GET_API_HEADER = {};
export const DEFAULT_POST_API_HEADER = {};
export const API_BASE_URL = "https://reqres.in";

export const DEFAULT_APP_STATE: AppState = {
  isUserLoggedIn: false,
  accessToken: "",
  refreshToken: "",

  setAppState: () => {},
};

export const TEST_APIS = {
  GET_API: "/api/users?page=2",
  POST_API: "/api/users",
};

export const COGNITO_ERROR_CODE = [
  "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED",
];

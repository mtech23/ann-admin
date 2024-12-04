export const ALERT_TIMEOUT = 3000;
export const DEV_ENV = "dev";
export const PROD_ENV = "prod";
export const APP_ENV = DEV_ENV;
export const API_LOG = APP_ENV === DEV_ENV;
export const API_TIMEOUT = 30000;

// DATE FORMATS
export const DATE_FORMAT1 = "MMM DD, YYYY";
export const DATE_FORMAT2 = "DD, MMM YY";
export const DATE_FORMAT3 = "YYYY-MM-DD";
export const DATE_FORMAT4 = "DD-MM-YYYY";
export const TIME_FORMAT1 = "hh:mma";
export const TIME_FORMAT2 = "hh:mm";
export const TIME_FORMAT3 = "hh";
export const DATE_TIME = "Do MM YYYY, hh:mm a";

// VALIDATION REGEX
export const ALLOW_ALPHABETS_REGEX = new RegExp(/^[a-zA-Z\s]*$/); // allow only alphabets and white spaces
export const ALLOW_ALPHANUM_REGEX = new RegExp(/^[a-zA-Z0-9]*$/); // allow only alphabets and numbers
export const ALLOW_NUMBERS_REGEX = new RegExp(/^[0-9]*$/); // allow only numbers
export const CARD_EXPIRY_REGEX = new RegExp(
  /^(0[1-9]|1[0-2])\/(2[2-9]|[3-9][0-9])$/
);
export const CARD_NUMBER_REGEX = new RegExp(
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/
);

// ACCESS TYPES
export const ACCESS_TYPES = {
  AUTH: "auth",
  PRIVATE: "private",
  PUBLIC: "public",
};

// REACT TOASTIFY ALERT CONFIGURATION
export const ALERT_POSITIONS = {
  TOP_Right: "top-right",
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
};
export const ALERT_THEMES = {
  DARK: "dark",
  COLORED: "colored",
  LIGHT: "light",
};
export const ALERT_TYPES = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  DEFAULT: "default",
};

// PUBLIC ROUTES
export const HOME_ROUTE = "/";
// AUTH ROUTES
export const LOGIN_ROUTE = "/login-page";
export const SIGNUP_ROUTE = "/signup-page";
// PRIVATE ROUTES
export const DASHBOARD_ROUTE = "/dashboard";
export const PROFILE_ROUTE = "/profile-page";
export const MODEL_PROFILE_ROUTE = "/model-profile-page";
export const MODEL_ROUTE = "/model-page";
export const ADD_POST_ROUTE = "/add-post-page";
export const PACKAGES_ROUTE = "/packages-page";
export const PAYMENT_ROUTE = "/payment-page";

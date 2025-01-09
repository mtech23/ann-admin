import { toast } from "react-toastify";
import moment from "moment";
import {
  ALERT_POSITIONS,
  ALERT_THEMES,
  ALERT_TIMEOUT,
  ALERT_TYPES,
  ALLOW_ALPHABETS_REGEX,
  ALLOW_ALPHANUM_REGEX,
  ALLOW_NUMBERS_REGEX,
  CARD_EXPIRY_REGEX,
  CARD_NUMBER_REGEX,
} from "../constants";
import DataHandler from "../services/data-handler";
import {
  cloneDeep,
  filter,
  find,
  includes,
  isEmpty,
  isEqual,
  has,
  findIndex,
  every,
} from "lodash";
import axios from "axios";

// GET CURRENT ACCESS TOKEN FROM USER REDUCER
export const getCurrentAccessToken = () => {
  let token = DataHandler.getStore().getState().user.data.access_token;
  return token;
};

// GET CURRENT REFRESH TOKEN FROM USER REDUCER
export const getCurrentRefreshToken = () => {
  let token = DataHandler.getStore().getState().user.data.refresh_token;
  return token;
};

// CHECK IF URL IS VALID
export const isValidURL = (url) => {
  const re =
    /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
  return re.test(url);
};

// CHECK IF URL IS VALID AND WITH HTTPS SCHEME
export const isValidHttpsURL = (url) => {
  const re =
    /^(https|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
  return re.test(url);
};

// CHECK IF PROVIDED TIME FORMAT IS CORRECT
export const isTimeFormat = (time) => {
  const re =
    /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/[0-9]{4} [012]{0,1}[0-9]:[0-6][0-9]$/;
  let bol = re.test(time);
  return bol;
};

// CHECK IF EMAIL IS VALID
export const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.trim());
};

// CHECK IF PASSWORD LENGTH IS VALID
export const isPasswordValid = (password) => {
  let length = 5; // u can change pass length according to your requirement
  return password.length > length;
};

// CHECK IF NAME IS VALID
export const isValidName = (name) => {
  return /^[a-zA-Z ]*$/.test(name);
};

// CAPITALIZE FIRST LETTER OF STRING
export const capitalizeFirstLetter = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
};

// FORMAT DATE ACCORDING TO PROVIDED FORMAT
export const getFormattedDateTime = (date, format) => {
  if (date) return moment(date).format(format);
  return "";
};

// FORMAT DATE ACCORDING TO PROVIDED FORMAT AND RETURN TO DATE OBJECT
export const getDateObjectFromString = (date, format) => {
  if (date) return moment(date, format).toDate();
  return "";
};

// CHECK IF MOBILE NUMBER IS VALID
export const isValidMobileNumber = (str) => {
  if (!str) return false;
  const isnum = /^\d+$/.test(str);

  if (str.length < 15 && str.length > 9 && isnum) {
    return true;
  }
  return false;
};

// CHECK IF MOBILE NUMBER IS OF UK NUMBER FORMAT
export const isValidUKMobileNumber = (str) => {
  if (!str) return false;
  str = str.replace(/ /g, "");
  let mobileNumber = str.replace("+", "");
  if (mobileNumber.charAt(0) === "4" && mobileNumber.charAt(1) === "4") {
    mobileNumber = "0" + mobileNumber.slice(2);
  }
  return /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/.test(
    mobileNumber
  );
};

// CLONE ARRAY
export const cloneDeepItem = (array) => cloneDeep(array);

// FIND OBJECT FROM ARRAY
export const findDataFromArray = (array, mObj) => find(array, mObj);

// CHECK IF ARRAY HAS VALUE
export const isArrayIncludesValue = (array, value) => includes(array, value);

// CHECK IF VALUES ARE EQUAL
export const areValuesEqual = (objA, objB) => isEqual?.(objA, objB);

// CHECK IF VALUE IS EMPTY
export const isEmptyValue = (value) => isEmpty(value);

// EXCLUDE OBJECT FROM ARRAY BY ID
export const excludeIdFromArray = (mArr, id) =>
  filter(mArr, (item) => item.id !== id);

// EXCLUDE VALUE FROM ARRAY
export const excludeValueFromArray = (mArr, value) =>
  filter(mArr, (item) => item !== value);

// FILTER ARRAY BY FUNCTION
export const filterArray = (array, func) => filter(array, func);

// CHECK IF ARRAY DATA CONTACT ID
export const doesArrayContainsParticularId = (array, mId) => {
  if (find(array, { id: mId })) return true;
  else return false;
};

// CHECK IF STRING HAS ONLY WHITE SPACE
export const isOnlyWhiteSpace = (str) => {
  return !str.trim();
};

// CHECK IF OBJECT HAS PROVIDED KEY
export const hasObjectWithKey = (mObj, key) => has(mObj, key);

// CHECK IF VALUES IS ACCORDING TO FUNCTION CONDITION
export const hasEvery = (mArr, _func) => every(mArr, _func);

// GET OBJECT INDEX IN ARRAY BY ID
export const getIndexOfObjFromArrayByID = (mArr, id) =>
  findIndex(mArr, (item) => item.id === id);

// DELETE OBJECT FROM ARRAY BY ID
export const deleteObjectFromArray = (arr, id) => {
  let arrToReturn = arr?.filter((a) => a.id !== id);
  return arrToReturn;
};

// GENERATE RANDOM STRING
export const generateGuid = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

// REPLACE MULTIPLE VALUES IN STRING BY OBJECT
export const replaceValInString = (string, replacements = {}) => {
  if (!string) return;
  const pattern = new RegExp(Object.keys(replacements).join("|"), "g");
  return string.replace(pattern, (matched) => replacements[matched]);
};

// GET FIRST LETTER FROM NAME
export const getLetterFromName = (string) => {
  let name = string || "";
  const words = name.split(" ");
  let initials = words[0].charAt(0);
  if (words.length > 1) initials = initials + words[1]?.charAt(0);
  return initials;
};

// ANTD FORM INPUT FIELDS RULES
export const inputFieldRule = ({
  name = "Name",
  requiredMessage,
  isRequired = true,
  isWhiteSpace = true,
  isEmail = false,
  emailError = "email address",
  isType = false,
  type,
  isMax = false,
  max = 60,
  isMin = false,
  min = 6,
  isAlphabetsAndNumber = false,
  isAlphabets = false,
  isCardNumber = false,
  isCardExpiry = false,
  isNumberOnly,
}) => {
  const validationRule = [];
  if (isRequired) {
    validationRule.push({
      required: true,
      message: requiredMessage ? requiredMessage : `${name} is required`,
    });
  }
  if (isWhiteSpace) {
    validationRule.push({
      whitespace: true,
      message: requiredMessage ? requiredMessage : `${name} is required`,
    });
  }
  if (isMax) {
    validationRule.push({
      max: max,
      message: `Maximum ${max} characters allowed`,
    });
  }
  if (isMin) {
    validationRule.push({
      min: min,
      message: `Minimum ${min} characters are required`,
    });
  }
  if (isEmail) {
    validationRule.push({
      type: "email",
      message: `Invalid ${emailError.toLowerCase()}`,
    });
  }
  if (isType) {
    validationRule.push({
      type,
      message: `Invalid ${name.toLowerCase()}`,
    });
  }
  if (isAlphabetsAndNumber) {
    validationRule.push({
      pattern: ALLOW_ALPHANUM_REGEX,
      message: `Invalid ${name.toLowerCase()}`,
    });
  }
  if (isAlphabets) {
    validationRule.push({
      pattern: ALLOW_ALPHABETS_REGEX,
      message: `Invalid ${name.toLowerCase()}`,
    });
  }
  if (isCardNumber) {
    validationRule.push({
      pattern: CARD_NUMBER_REGEX,
      message: `Invalid ${name.toLowerCase()}`,
    });
  }
  if (isCardExpiry) {
    validationRule.push({
      pattern: CARD_EXPIRY_REGEX,
      message: `Invalid ${name.toLowerCase()}`,
    });
  }
  if (isNumberOnly) {
    validationRule.push({
      pattern: ALLOW_NUMBERS_REGEX,
      message: `Only numeric values are allowed.`,
    });
  }
  return validationRule;
};

// ANTD FORM AUTOCOMPLETE FIELDS RULES
export const autoCompleteFieldRule = ({
  value,
  name = "",
  isRequired = true,
  isWhiteSpace = true,
  isEmail = false,
  isMax = false,
  max = 80,
}) => {
  if (isRequired && !value) {
    return Promise.reject(new Error(`${name} is required`));
  }
  if (typeof value === "string") {
    if (isWhiteSpace && isOnlyWhiteSpace(value)) {
      return Promise.reject(new Error(`${name} is required`));
    }
    if (isMax && value.length > max) {
      return Promise.reject(new Error(`Maximum ${max} characters allowed`));
    }
    if (isEmail && !isEmailValid(value)) {
      return Promise.reject(new Error(`Invalid ${name}`));
    }
  }
  return Promise.resolve();
};

export const getEntity = async (endPoint) => {
  const url = `${process.env.REACT_APP_BASE_URL}${endPoint}`;
  try {
    const response = await axios.get(url, {headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("login")}`,
    },});
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

// CUSTOM ALERT
export const toastAlert = (
  message = "",
  type = ALERT_TYPES.SUCCESS,
  position = ALERT_POSITIONS.TOP_Right,
  duration = ALERT_TIMEOUT,
  closeOnClick = true,
  pauseOnHover = false,
  theme = ALERT_THEMES.LIGHT,
  draggable = false,
  isProgressBar = false
) => {
  toast[type](message, {
    position: position,
    autoClose: duration,
    hideProgressBar: isProgressBar,
    closeOnClick: closeOnClick,
    pauseOnHover: pauseOnHover,
    draggable: draggable,
    theme: theme,
  });
};

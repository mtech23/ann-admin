import { combineReducers } from "@reduxjs/toolkit";

import general from "./general";
import user from "./user";

export default combineReducers({
  general,
  user,
});

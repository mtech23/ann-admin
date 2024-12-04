import { createSlice } from "@reduxjs/toolkit";

const UserReducer = createSlice({
  name: "user",
  initialState: {
    data: {},
    isAuthenticated: false,
  },
  reducers: {
    // USER LOGIN
    loginRequest() {},
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.data = action.payload;
    },

    // USER SIGNOUT
    logoutRequest(state, action) {
      state.isAuthenticated = false;
      state.data = {};
    },
  },
});

export const { loginRequest, loginSuccess, logoutRequest } =
  UserReducer.actions;

export default UserReducer.reducer;

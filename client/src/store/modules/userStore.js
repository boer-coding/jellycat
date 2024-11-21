// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null, // Store user details (like email, username, userId)
  },
  reducers: {
    setAuthState(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
    setUsername(state, action){
      state.user.username = action.payload;
    }

  },
});
const userReducer = authSlice.reducer;


export const { setAuthState, setUsername } = authSlice.actions;
export default userReducer;

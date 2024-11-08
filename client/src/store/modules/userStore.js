// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null, // Store user details (like email, username, userId)
  loadingAuth: true, // Loading state to wait for authentication initialization
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.loadingAuth = false; // Set to false after initialization
    },
    setLoadingAuth: (state, action) => {
      state.loadingAuth = action.payload;
    },
  },
});
const userReducer = authSlice.reducer;

export const { setAuthState, setLoadingAuth } = authSlice.actions;
export default userReducer;

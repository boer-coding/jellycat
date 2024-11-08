import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counterStore";
import userReducer from "./modules/userStore";

const store = configureStore({
  reducer: {
    counterSlice: counterReducer, // Add the counter slice to the store
    userSlice: userReducer
  },
});

export default store;

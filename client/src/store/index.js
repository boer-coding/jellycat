import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counterStore";

const store = configureStore({
  reducer: {
    counterSlice: counterReducer, // Add the counter slice to the store
  },
});

export default store;

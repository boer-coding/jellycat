import { configureStore     } from "@reduxjs/toolkit";

import counterReducer from "./modules/counterStore";
import productReducer from "./modules/productStore";
import bannerReducer from "./modules/bannerStore";

const store = configureStore({
    reducer: {
        counter: counterReducer,  // Add the counter slice to the store
        productSlice: productReducer,
        banner: bannerReducer,
      },
})

export default store;
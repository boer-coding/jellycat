import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

// Create the slice
// Create the product slice
const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    loading: false,  // Loading state
    error: null,     // Error state
  },
  reducers: {
    // Reducer to manually add multiple products to the state
    addProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(loadProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle fulfilled state when products are successfully fetched
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.products = action.payload;  // Store the fetched products in state
        state.loading = false;  // Set loading to false
      })
      // Handle rejected state when the API call fails
      .addCase(loadProduct.rejected, (state, action) => {
        state.loading = false;  // Set loading to false
        state.error = action.error.message;  // Store the error message
      });
  }
});

// Thunk to load products from API
// Thunk to load products from API
export const loadProduct = createAsyncThunk(
  "productSlice/loadProduct",
  async () => {
    const apiUrl = "https://boer-coding.github.io/boer-coding/data/jellycat/db.json";
    const response = await axios.get(apiUrl);
    return response.data.products;  // Ensure you return the products array
  }
);

// Export the reducer and the actions
export const { addProducts } = productSlice.actions;
export default productSlice.reducer;




import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

// Create the slice
const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    loading: false,  // Set default loading state to false
    error: null,     // Track any errors during the request
  },
  reducers: {
    // Reducer to add multiple products to the state
    addProducts(state, action) {
      action.payload.forEach((product) => {
        state.push({
          id: product.id || nanoid(), // Generate id if not provided
          title: product.title,
          category: product.category,
          des: product.des,
          price: product.price,
          pics: product.pics,
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state
      .addCase(loadProduct.pending, (state) => {
        state.loading = true;  // Set loading to true when the request starts
        state.error = null;    // Reset any previous error state
      })
      // Handle the fulfilled state
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.products = action.payload;  // Populate products with the fetched data
        state.loading = false;  // Set loading to false when the data is successfully fetched
      })
      // Handle the rejected state (error)
      .addCase(loadProduct.rejected, (state, action) => {
        state.loading = false;  // Set loading to false if the request fails
        state.error = action.error.message;  // Set the error message in case of failure
      });
  }
});

// Thunk to load products from API
// Thunk to load products from API
export const loadProduct = createAsyncThunk(
  "productSlice/loadProduct",
  async (apiUrl) => {
    const response = await axios.get(apiUrl);
    return response.data;  // Return the data for Redux to handle in extraReducers
  }
);

// Export the reducer and the actions
export const { addProducts } = productSlice.actions;
export default productSlice.reducer;


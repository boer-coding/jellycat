import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://boer-coding.github.io/boer-coding/data/db.json";

// Thunk for loading banner data
export const loadBanner = createAsyncThunk(
  "bannerSlice/loadBanner",
  async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data.banner[0]; // Directly return the banner data from db.json
    } catch (error) {
      throw Error("Failed to load banners");
    }
  }
);

// Banner Slice
const bannerSlice = createSlice({
  name: "bannerSlice",
  initialState: {
    logo: null,
    home: null,
    newItem: null,
    best: null,
    explore: null,
    loading: false, // To handle loading state
    error: null, // To handle errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBanner.pending, (state) => {
        state.loading = true;  // Set loading to true when fetching starts
        state.error = null;    // Clear previous errors
      })
      .addCase(loadBanner.fulfilled, (state, action) => {
        state.logo = action.payload.logo;
        state.home = action.payload.home;
        state.newItem = action.payload.newItem;
        state.best = action.payload.best;
        state.explore = action.payload.explore;
        state.loading = false;  // Set loading to false when fetching is complete
      })
      .addCase(loadBanner.rejected, (state, action) => {
        state.loading = false;  // Set loading to false on failure
        state.error = action.error.message;  // Capture error message
      });
  },
});

export default bannerSlice.reducer;


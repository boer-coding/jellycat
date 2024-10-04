import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";


const apiUrl = "https://raw.githubusercontent.com/boer-coding/jellycat-json/main/db.json";

// Banner Slice
const bannerSlice = createSlice({
  name: "bannerSlice",
  initialState: {
    logo: null,
    home: null,
    newItem: null,
    best: null,
    explore: null,
  },
  reducers: {
    setBanner(state, action) {
      state.logo = action.payload.logo;
      state.home = action.payload.home;
      state.newItem = action.payload.newItem;
      state.best = action.payload.best;
      state.explore = action.payload.explore;
    },
  },
});

// Thunk for loading banner data
export const loadBanner = createAsyncThunk(
  "bannerSlice/loadBanner",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(apiUrl);
      const bannerData = response.data.banner[0]; // Get banner data from db.json
      dispatch(setBanner(bannerData)); // Dispatch action to update Redux state
      return bannerData;
    } catch (error) {
      throw Error("Failed to load banners");
    }
  }
);

export const { setBanner } = bannerSlice.actions;
export default bannerSlice.reducer;

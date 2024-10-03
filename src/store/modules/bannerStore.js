import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice, nanoid } from "@reduxjs/toolkit";

// const initialState = {
//   home: null,
//   animal: null,
//   amuse: null,
// };

const { actions, reducer: bannerReducer } = createSlice({
  name: "bannerSlice",
  initialState:{
    logo: null,
    home: null,
    newItem: null,
    best: null,
    explore: null
  },
  reducers: {
    // Reducer to set the banner state with each key-value pair
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
    "bannerSlice/loadBanner", // The action type
    async (apiUrl, { dispatch }) => {
      try {
        // Making an API request
        const response = await axios.get(apiUrl);
        // Dispatch the action to update the state with the banner data
        dispatch(setBanner(response.data[0]));
  
        return response.data[0];
      } catch (error) {
        throw Error("Failed to load banners");
      }
    }
  );
export const { setBanner } = actions;
export default bannerReducer;

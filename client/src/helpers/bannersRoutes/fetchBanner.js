// services/fetchBannerData.js

import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchBannerData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/banners`);
    return { data: response.data[0], error: null };
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return { data: null, error: "Failed to fetch banner data" };
  }
};

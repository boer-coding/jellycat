// services/fetchBannerData.js

import axios from 'axios';

export const fetchBannerData = async () => {
  try {
    const response = await axios.get('https://jellycat-backend-14f22f6178c9.herokuapp.com/banners');
    return { data: response.data[0], error: null };
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return { data: null, error: "Failed to fetch banner data" };
  }
};

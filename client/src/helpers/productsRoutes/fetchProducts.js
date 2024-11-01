// src/api/fetchProducts.js
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProducts = async (category, currentPage, pageSize) => {
  try {
    const apiUrl = category
      ? `${API_BASE_URL}/products?category=${category}&page=${currentPage}&pageSize=${pageSize}`
      : `${API_BASE_URL}/products?page=${currentPage}&pageSize=${pageSize}`;

    const response = await axios.get(apiUrl);

    return {
      products: response.data.products,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;  // Throw the error so it can be handled by the calling function
  }
};

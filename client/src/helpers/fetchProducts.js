// src/api/fetchProducts.js
import axios from 'axios';

export const fetchProducts = async (category, currentPage, pageSize) => {
  try {
    const apiUrl = category
      ? `https://jellycat-backend-14f22f6178c9.herokuapp.com/products?category=${category}&page=${currentPage}&pageSize=${pageSize}`
      : `https://jellycat-backend-14f22f6178c9.herokuapp.com/products?page=${currentPage}&pageSize=${pageSize}`;

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

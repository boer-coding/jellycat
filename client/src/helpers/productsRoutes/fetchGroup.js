import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchGroupProducts = async (gridTitle, setLoading, setProducts, setError) => {
  setLoading(true); // Start loading
  try {
    const apiUrl =
      gridTitle === "NEW IN"
        ? `${API_BASE_URL}/newin`
        : `${API_BASE_URL}/bestsellers`;

    const response = await axios.get(apiUrl);
    setProducts(response.data);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    setError("Failed to fetch products. Please try again later.");
  } finally {
    setLoading(false); // Stop loading
  }
};
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProductById = async (id, setLoading, setProduct, setError) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };
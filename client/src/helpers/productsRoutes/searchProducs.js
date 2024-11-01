// src/helpers/searchProducts.js
import debounce from 'lodash/debounce';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const debouncedSearch = debounce(async (query, setSearchResults, setLoading) => {
    if (query) {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`${API_BASE_URL}/search?q=${query}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.products); // Update search results
        } else {
          console.error("Error fetching search results");
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false); // End loading
      }
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, 900);

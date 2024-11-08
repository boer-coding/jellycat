// src/helpers/logoutUser.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const logoutUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
      });
  
      if (response.ok) {  
        // Optionally redirect to the login page or home page
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
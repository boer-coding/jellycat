// auth.js

export const checkLoginStatus = async () => {
  try {
    // Make a request to the backend to check if the user is logged in
    const response = await fetch('https://jellycat-backend-14f22f6178c9.herokuapp.com/auth/status', {
      method: 'GET',
      credentials: 'include'  // Ensure cookies (e.g., session) are sent with the request
    });

    if (response.ok) {
      // If the response is OK, parse the JSON response
      const data = await response.json();
      
      // Return both login status and user information
      return {
        isLoggedIn: data.isLoggedIn,
        userId: data.userId || null,  // User ID (if available)
        username: data.username || null  // Username (if available)
      };
    } else {
      // If the response isn't OK, return default values (not logged in)
      return {
        isLoggedIn: false,
        userId: null,
        username: null
      };
    }
  } catch (error) {
    // Log any error that occurs during the fetch request
    console.error('Error checking login status:', error);

    // Return default values in case of an error (not logged in)
    return {
      isLoggedIn: false,
      userId: null,
      username: null
    };
  }
};

  
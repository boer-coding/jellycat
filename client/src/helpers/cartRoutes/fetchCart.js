// actions/cartActions.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchCartFromSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/fetchSessionCart`, {
      method: 'GET',
      credentials: 'include',  // Include cookies for session access
    });

    const result = await response.json();

    if (response.ok && result.cart && result.cart.length > 0) {
      return result.cart;  // Return the cart if it's not empty
    } else if (response.ok && (!result.cart || result.cart.length === 0)) {
      console.log('Seesion Cart is empty.');
      return null;
    } else {
      console.error('Failed to retrieve Seesion cart:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching cart from session:', error);
    return null;
  }
};

// Fetch Cart from User Collection
export const fetchCartFromUser = async (userId) => {

  try {
    const response = await fetch(`${API_BASE_URL}/fetchUserCart`, {
      method: 'POST',  // Use POST to send data in the request body
      headers: {
        'Content-Type': 'application/json',  // Set content type to JSON
      },
      body: JSON.stringify({ userId }),  // Send the userId in the request body
    });

    const result = await response.json();
    console.log(result)

    if (response.ok && result.cart && result.cart.length > 0) {
      return result.cart;  // Return the cart if it's not empty
    } else if (response.ok && (!result.cart || result.cart.length === 0)) {
      console.log('User Cart is empty.');
      return null;
    } else {
      console.error('Failed to retrieve User cart:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching cart from user:', error);
    return null;
  }
};



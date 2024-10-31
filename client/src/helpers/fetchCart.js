// actions/cartActions.js
export const fetchCartFromSession = async () => {
  try {
    const response = await fetch('http://localhost:8080/fetchSessionCart', {
      method: 'GET',
      credentials: 'include',  // Include cookies for session access
    });

    const result = await response.json();

    if (response.ok && result.cart && result.cart.length > 0) {
      return result.cart;  // Return the cart if it's not empty
    } else if (response.ok && (!result.cart || result.cart.length === 0)) {
      console.log('Cart is empty.');
      return null;
    } else {
      console.error('Failed to retrieve cart:', result.message);
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
    const response = await fetch('http://localhost:8080/fetchUserCart', {
      method: 'POST',  // Use POST to send data in the request body
      headers: {
        'Content-Type': 'application/json',  // Set content type to JSON
      },
      body: JSON.stringify({ userId }),  // Send the userId in the request body
    });

    const result = await response.json();

    if (response.ok && result.cart && result.cart.length > 0) {
      return result.cart;  // Return the cart if it's not empty
    } else if (response.ok && (!result.cart || result.cart.length === 0)) {
      console.log('Cart is empty.');
      return null;
    } else {
      console.error('Failed to retrieve cart:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching cart from user:', error);
    return null;
  }
};



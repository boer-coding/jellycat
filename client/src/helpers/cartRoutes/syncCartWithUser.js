// cartApi.js - Function to sync cart with the user collection in the database

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const syncCartWithUser = async (userId, cartList) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateUserCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,  // Include the userId
          cartList: cartList  // Include the cartList
        }),   // Send the cart to the user collection
        
      });
  
      if (!response.ok) {
        throw new Error('Failed to sync cart with user collection');
      }
  
      const result = await response.json();
      return result.cart;  // Return the updated cart from the user collection
    } catch (error) {
      console.error('Error syncing cart to user:', error.message);
      return null;
    }
  };
  
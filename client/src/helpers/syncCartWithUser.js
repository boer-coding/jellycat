// cartApi.js - Function to sync cart with the user collection in the database
export const syncCartWithUser = async (userId, cartList) => {
    try {
      const response = await fetch('https://jellycat-backend-14f22f6178c9.herokuapp.com/updateUserCart', {
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
  
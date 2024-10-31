
export const syncCartWithSession = async (cartList) => {
  try {
    // Make the API request to sync the cart with the backend session
    const response = await fetch('https://jellycat-backend-14f22f6178c9.herokuapp.com/updateSessionCart', {  // Make sure you have an appropriate route for updating cart
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartList),  // Send the entire updated cart
      credentials: 'include',  // Ensure session cookies are included
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Cart synced with session:', result.cart);
      return result.cart;  // Return the updated cart from the session
    } else {
      console.error('Error syncing cart:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Error syncing cart to session:', error);
    return null;
  }
};

  
  

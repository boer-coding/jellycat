import { increment, decrement } from "../../store/modules/counterStore";
import { syncCartWithSession } from "./syncCartWithSession";
import { syncCartWithUser } from "./syncCartWithUser";

// Function to sync cart with either user collection or session
const syncCart = async (cartList) => {
  const logIn = sessionStorage.getItem("isLoggedIn") === "true"; // Check login status
  const userId = sessionStorage.getItem("userId"); // Dynamically retrieve userId

  if (logIn && userId) {
    console.log("Syncing cart with user collection");
    await syncCartWithUser(userId, cartList);
  } else {
    console.log("Syncing cart with session storage");
    await syncCartWithSession(cartList);
  }
};



// Redux action to add an item to the cart and sync it
export const addToCart = (item) => async (dispatch, getState) => {
  // Update Redux store
  dispatch(increment(item));

  // Get the updated cart from Redux store
  const { cartList } = getState().counterSlice;

  // Sync the cart based on login status
  await syncCart(cartList);
};

// Redux action to remove an item from the cart and sync it
export const removeCart = (item) => async (dispatch, getState) => {
  // Update Redux store
  dispatch(decrement(item));

  // Get the updated cart from Redux store
  const { cartList } = getState().counterSlice;

  // Sync the cart based on login status
  await syncCart(cartList);
};

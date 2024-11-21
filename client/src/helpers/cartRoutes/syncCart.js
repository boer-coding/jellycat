import {
  increment,
  decrement,
  clearCart,
} from "../../store/modules/counterStore";
import { syncCartWithSession } from "./syncCartWithSession";
import { syncCartWithUser } from "./syncCartWithUser";
import store from "../../store/index";

// Function to sync cart with either user collection or session
const syncCart = async (cartList) => {
  const { isLoggedIn, user } = store.getState().userSlice; // Access the Redux state

  if (isLoggedIn) {
    console.log("Syncing cart with user collection");
    await syncCartWithUser(user.userId, cartList);
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

export const emptyCart = () => async (dispatch, getState) => {
  dispatch(clearCart());
  const { cartList } = getState().counterSlice;
  await syncCart(cartList);
};

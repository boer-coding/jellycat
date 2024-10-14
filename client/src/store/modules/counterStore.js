import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    cost: 0,
    cartList: [],
  },
  reducers: {
    increment(state, action) {
      state.count++;
      state.cost += action.payload.price;

      // Find an item by both id and size
      const item = state.cartList.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (item) {
        // If the item with the same id and size exists, update its count and total price
        item.count++;
        item.totalPrice += action.payload.price;
      } else {
        // Otherwise, add the new item with size
        state.cartList.push({
          ...action.payload,
          count: 1,
          totalPrice: action.payload.price,
        });
      }
    },
    decrement(state, action) {
      // Find an item by both id and size
      const item = state.cartList.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (item) {
        if (item.count === 1) {
          // If count is 1, remove the item from the cart
          state.cartList = state.cartList.filter(
            (cartItem) => !(cartItem.id === item.id && cartItem.size === item.size)
          );
        } else {
          // Otherwise, decrement the count and reduce the cost
          item.count--;
          item.totalPrice -= action.payload.price;
        }
        // Decrement global count and cost
        state.count--;
        state.cost -= action.payload.price;
      }
    },
  },
});

const { increment, decrement } = counterStore.actions;

const counterReducer = counterStore.reducer;

export { increment, decrement };
export default counterReducer;

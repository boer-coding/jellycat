import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
  name: "counter",
  initialState: {
    totalCount: 0,
    totalCost: 0,
    cartList: [],
  },
  reducers: {
    // Action to increment an item in the cart
    increment(state, action) {
      state.totalCount++;
      state.totalCost += action.payload.price;  // Add the item's price to the total cost

      // Find an item by both id and size
      const item = state.cartList.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (item) {
        // If the item with the same id and size exists, update its count and total price
        item.count++;
        item.cost += action.payload.price;  // Update the cost of the specific item
      } else {
        // Otherwise, add the new item with size
        state.cartList.push({
          ...action.payload,
          count: 1,
          cost: action.payload.price,  // Initialize cost for this item
        });
      }
    },

    // Action to decrement an item in the cart
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
          item.cost -= action.payload.price;  // Reduce the cost of the specific item
        }
        // Decrement global count and cost
        state.totalCount--;
        state.totalCost -= action.payload.price;  // Reduce the total cost by the item's price
      }
    },

    // Action to set the entire cart (useful when fetching from session or backend)
    setCart: (state, action) => {
      state.cartList = action.payload;
      state.totalCount = action.payload.reduce((total, item) => total + item.count, 0);  // Update count
      state.totalCost = action.payload.reduce((total, item) => total + item.cost, 0);  // Update total cost
    }
  },
});

const { increment, decrement, setCart } = counterStore.actions;

const counterReducer = counterStore.reducer;

export { increment, decrement, setCart };
export default counterReducer;

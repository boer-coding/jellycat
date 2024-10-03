import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
  // name for slice
  name: "counter",
  //sets up the starting value for count
  initialState:{
      count:0,
  },
  // provide actions that can increase or decrease the count
  reducers:{
      increment(state){
          state.count++;
      },
      decrement(state){
          state.count--;
      },
      addToNum(state, action){
          state.count += action.payload
      }
  }
})

const {increment, decrement, addToNum} = counterStore.actions;

const counterReducer = counterStore.reducer

console.log("before reduce"+counterStore)
console.log("after reduce"+counterReducer)


export{increment, decrement,addToNum}
export default counterReducer
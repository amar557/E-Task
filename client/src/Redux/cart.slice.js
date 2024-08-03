import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.items.some((data) => data.id === action.payload.id)) {
        return cartSlice.caseReducers.Increment(state, action);
      }
      state.items.unshift({ ...action.payload, quantity: 1 });
    },
    DeleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    Increment: (state, action) => {
      const data = state.items.find((data) => data.id === action.payload);
      if (data) {
        data.quantity++;
      }
    },
    Decrement: (state, action) => {
      const item = state.items.find((data) => data.id === action.payload);
      if (item) {
        if (item.quantity < 2) {
          return cartSlice.caseReducers.DeleteItem(state, action);
        }
        item.quantity--;
        // Update the total based on discount or normal rate
        item.total = item.isDiscount
          ? item.quantity * item.discountRate
          : item.quantity * item.rate;
      }
    },
  },
});

export const { addToCart, Increment, Decrement, DeleteItem } =
  cartSlice.actions;
export default cartSlice.reducer;

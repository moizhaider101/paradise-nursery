import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalCost: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }

      state.totalQuantity += 1;
      state.totalCost += action.payload.price;
    },

    removeFromCart: (state, action) => {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload,
      );
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalCost -= itemToRemove.totalPrice;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;
        state.totalQuantity += 1;
        state.totalCost += item.price;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price;
        state.totalQuantity -= 1;
        state.totalCost -= item.price;
      } else if (item && item.quantity === 1) {
        state.totalQuantity -= 1;
        state.totalCost -= item.totalPrice;
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalCost = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';

const initialState = {
  cartItems: cartItems,
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload);
      cartItem.amount += 1;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload);
      cartItem.amount -= 1;
      if (cartItem.amount < 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      }
    },
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalPrice = 0;
      state.cartItems.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += item.amount * item.price;
      });
      state.totalAmount = totalAmount;
      state.totalPrice = totalPrice;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;

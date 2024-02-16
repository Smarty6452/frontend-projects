import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    cartItems: [], 
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { setToken, clearToken, setProductId, addToCart, removeFromCart } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export const selectProductId = (state) => state.auth.productId;

export const selectCartItems = (state) => state.auth.cartItems;


export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const rifaSlice = createSlice({
 name: 'rifas',
 initialState: {
  cart: [],
  allRifas: [],
  rifaDetail: {},
 },
 reducers: {
  setRifas: (state, action) => {
   state.allRifas = action.payload;
  },
  setRifaDetail: (state, action) => {
   state.rifaDetail = action.payload;
  },
  setNumbersToCart: (state, action) => {
   state.cart = [...state.cart, ...action.payload];
  },
  delNumbersToCart: (state, action) => {
   state.cart = action.payload;
  },
  clearCart: (state) => {
   state.cart = [];
  },
 },
});

export const {
 setRifas,
 setRifaDetail,
 setNumbersToCart,
 delNumbersToCart,
 clearCart,
} = rifaSlice.actions;

export default rifaSlice.reducer;

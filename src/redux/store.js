import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './redux-slices/cart-slice-folder/cart-slice';
import counterSlice from './redux-slices/counter-slice';
import currencySlice from './redux-slices/currency-slice-folder/currency-slice';

export default configureStore({
  reducer: {
      cart: cartSlice,
      counter: counterSlice,
      currency: currencySlice
  },
})
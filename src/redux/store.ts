import { configureStore } from '@reduxjs/toolkit';
import sliceSelectedCommerce from './sliceSelectedCommerce';

export const store = configureStore({
  reducer: {
    selectCommerce: sliceSelectedCommerce
  }
})
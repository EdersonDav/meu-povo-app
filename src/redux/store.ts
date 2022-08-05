import { configureStore } from '@reduxjs/toolkit';
import sliceSelectedCommerce from './sliceSelectedCommerce';
import sliceCommerce from './sliceCommerce';
import sliceOpenModal from './sliceOpenModal';

export const store = configureStore({
  reducer: {
    selectCommerce: sliceSelectedCommerce,
    comercesData: sliceCommerce,
    openCloseModal: sliceOpenModal
  }
})
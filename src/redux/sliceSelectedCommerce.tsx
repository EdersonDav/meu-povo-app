import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICommerce } from '../@types/interfaces';

const initialState = {} as ICommerce;

const sliceSelectedCommerce = createSlice({
  name: "selectedCommerce",
  initialState,
  reducers:{
    selectCommerce(_state, {payload}:PayloadAction<ICommerce>){
      return {...payload}
    },
    clearSelected(){
      return initialState
    }
  }
});

export default sliceSelectedCommerce.reducer;

export const { selectCommerce, clearSelected } = sliceSelectedCommerce.actions;

export const useSelectCommerce = (state: any) =>{
  return state.selectCommerce as ICommerce
}
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICommerce } from '../@types/interfaces';

const initialState = [] as ICommerce[];

const sliceCommerce = createSlice({
  name: "commerces",
  initialState,
  reducers:{
    setCommerces(_state, {payload}:PayloadAction<ICommerce[]>){
      return [...payload]
    },
    
    clearCommerces(){
      return initialState
    }
  }
});

export default sliceCommerce.reducer;

export const { setCommerces, clearCommerces } = sliceCommerce.actions;

export const useCommerce = (state: any) =>{
  return state.comercesData as ICommerce[]
}
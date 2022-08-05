import { createSlice } from '@reduxjs/toolkit';


const sliceOpenModal = createSlice({
  name: 'openCloseModal',
  initialState: false,
  reducers:{
    setOpenModal: ()=>{
      return true
    },
    closeModal:()=>{
      return false
    }
  }
});

export default sliceOpenModal.reducer;

export const {setOpenModal, closeModal} = sliceOpenModal.actions;

export const useModal = (state: any) =>{
  return state.openCloseModal as boolean
}
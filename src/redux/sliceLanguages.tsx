import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {languages, ILanguage} from '../utils/languages'

const sliceLanguages = createSlice({
  name: "languages",
  initialState: languages.en,
  reducers:{
    setChangeLangages(_state, {payload}:PayloadAction<ILanguage>){
      return payload.buttonLabel === 'en' ? languages.pt : languages.en
    },
    
    setDefault(){
      return languages.en
    }
  }
});

export default sliceLanguages.reducer;

export const { setChangeLangages, setDefault } = sliceLanguages.actions;

export const useLanguages = (state: any) =>{
  return state.languageData as ILanguage
}
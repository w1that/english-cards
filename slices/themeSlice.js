import { createSlice } from "@reduxjs/toolkit";

const initialState = {darkTheme:false};

export const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleTheme:(state,action)=>{
            state.darkTheme = !state.darkTheme;
        }
    }
})


export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;
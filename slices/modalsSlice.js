import { createSlice } from "@reduxjs/toolkit";

const initialState = {optionsVisible:false};

export const modalsSlice= createSlice({
    name:'modals',
    initialState,
    reducers:{
        toggleOptionsVisibility:(state,action)=>{
            state.optionsVisible = !state.optionsVisible;
        }
    }
})

export const {toggleOptionsVisibility} = modalsSlice.actions;
export default modalsSlice.reducer
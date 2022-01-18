import { createSlice } from "@reduxjs/toolkit"

const initialState = {currentScreen : ''}

export const screenRouteSlice = createSlice({
    name:'screenRoute',
    initialState,
    reducers:{
        setCurrentScreen : (state, action)=>{
            state.currentScreen = action.payload;
        }
    }
})

export const {setCurrentScreen} = screenRouteSlice.actions;
export default screenRouteSlice.reducer;
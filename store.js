import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import screenReducer from './slices/screenRouteSlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
        screen:screenReducer,
    },
})
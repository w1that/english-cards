import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import screenReducer from './slices/screenRouteSlice'
import modalsReducer from './slices/modalsSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
        screen:screenReducer,
        modals:modalsReducer,
        theme:themeReducer
    },
})
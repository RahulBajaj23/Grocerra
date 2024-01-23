import { configureStore } from '@reduxjs/toolkit'
import userSliceReucer from "./userSlice"
import productSliceReducer from './productSlice'

export const store = configureStore({
    reducer: {
        user: userSliceReucer,
        product: productSliceReducer
    },
})
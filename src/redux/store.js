import { configureStore } from "@reduxjs/toolkit";
import developerReducer from "./developerSlice";

const store = configureStore({
    reducer:{
        developer:developerReducer,
    }
})

export default store
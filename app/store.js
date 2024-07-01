import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import voterHomeReducer from "../features/home/voterHomeSlice";
import adminReducer from "../features/home/adminProfile/adminSlice";
import candidateReducer from "../features/home/candidateProfile/candidateSlice";
export const store=configureStore({
    reducer:{
        auth:authReducer,
        voterHome:voterHomeReducer,
        admin:adminReducer,
        candidate:candidateReducer
    }
})
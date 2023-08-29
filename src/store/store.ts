import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import oceanReducer from "./reducers/ocean.reducer";

const reducer = {
    auth: authReducer,
    ocean: oceanReducer,
};

export const store = configureStore({reducer});
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import facilitartorReducer from "./facilitator";

export default configureStore({
    reducer: {
        user: userReducer,
        facilitator: facilitartorReducer
    }
});

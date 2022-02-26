import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./client";
export default configureStore({
    reducer: {
        client: clientReducer,
    }
});

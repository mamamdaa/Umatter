import { createSlice } from "@reduxjs/toolkit";

export const facilitatorSlice = createSlice({
    name: "facilitator",
    initialState: {
        isLoggedIn: localStorage.getItem("token") ? true : false,
        user: JSON.parse(localStorage.getItem("user")),
        error: null,
    },
    reducers: {
        facilitatorLoginReducer: (state, action) => {
            state.isLoggedIn = true;
            state.client = action.payload;
        },
        facilitatorLogoutReducer: (state, action) => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            state.isLoggedIn = false;
            state.client = {};
        }
    }
});

export const { facilitatorLoginReducer,facilitatorLogoutReducer } = facilitatorSlice.actions;
export default facilitatorSlice.reducer;

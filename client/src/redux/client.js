import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
    name: "client",
    initialState: {
        isLoggedIn: localStorage.getItem("token") ? true : false,
        client: JSON.parse(localStorage.getItem("client")),
        role: localStorage.getItem("role"),
        error: null,
    },
    reducers: {
        clientLoginReducer: (state, action) => {
            state.isLoggedIn = true;
            state.client = action.payload;
            state.role = action.payload.role; //check error here
        },
        clientLogoutReducer: (state, action) => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            state.isLoggedIn = false;
            state.client = {};
            state.role = "";
        }
    }
});

export const { clientLoginReducer,clientLogoutReducer } = clientSlice.actions;
export default clientSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: localStorage.getItem("token") ? true : false,
        user: JSON.parse(localStorage.getItem("user")),
        error: null,
    },
    reducers: {
        userLogin: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        userLogout: (state, action) => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            state.isLoggedIn = false;
            state.user = {};
        }
    }
});

export const { userLogin,userLogout } = userSlice.actions;
export default userSlice.reducer;

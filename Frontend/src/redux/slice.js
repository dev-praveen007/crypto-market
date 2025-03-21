import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    refresh: false
}

const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setuserData: (state, action) => {
            const payload = action.payload;
            state.userData = payload
        },
        setRefresh: (state, action) => {
            const payload = action.payload;
            state.refresh = payload
        },
        clearData: (state, action) => {
            return initialState
        },
    }
})

export const { setuserData, clearData,setRefresh } = userSlice.actions;

export default userSlice.reducer;
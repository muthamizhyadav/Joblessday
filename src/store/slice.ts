import { createSlice } from '@reduxjs/toolkit';

const AppSlice = createSlice({
    name: 'app',
    initialState: {
        data: null,
    },
    reducers: {
        setProfileData(state, action) {
            state.data = action.payload;
        },

        clearProfileData(state) {
            state.data = null;
        },
    },
});


export const { setProfileData, clearProfileData } = AppSlice.actions;
export default AppSlice.reducer;
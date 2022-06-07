
import { createSlice} from "@reduxjs/toolkit";
import { fetchDataCurrentUserByUserId } from './dataChannelsSlice.js'



const  uiSpinnerSlice = createSlice({
    name: 'messagesChannelsCurrentUser',
    initialState: {status: null},
    extraReducers: (builder) => {
        builder
        .addCase(fetchDataCurrentUserByUserId.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(fetchDataCurrentUserByUserId.fulfilled, (state) => {
            state.status = 'fullfilled';
        })
    }
});

export default uiSpinnerSlice.reducer;
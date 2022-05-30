
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchDataCurrentUserByUserId } from './activeChannelSlice.js'

const adapterMessages = createEntityAdapter();

const  messagesSlice = createSlice({
    name: 'messagesChannelsCurrentUser',
    initialState: adapterMessages.getInitialState(),
    reducers: {
        ////Определить действия
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchDataCurrentUserByUserId.fulfilled, (state, { payload: { messages }}) => {
                adapterMessages.setAll(state, messages)
            })
    }
});

export const selectorsMessages = adapterMessages.getSelectors((state) => state.messages);

export const  actionsMessages = messagesSlice.actions;

export default messagesSlice.reducer;
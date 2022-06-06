
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchDataCurrentUserByUserId } from './dataChannelsSlice.js'
import { actionsChannels } from "./dataChannelsSlice.js";


const adapterMessages = createEntityAdapter();

const  messagesSlice = createSlice({
    name: 'messagesChannelsCurrentUser',
    initialState: adapterMessages.getInitialState(),
    reducers: {
        addMessage: adapterMessages.addOne, //почему далее при использовании не нужно подставлять state
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchDataCurrentUserByUserId.fulfilled, (state, { payload: { messages }}) => {
                adapterMessages.upsertMany(state, messages)
            })
            .addCase(actionsChannels.removeChannel, (state, { payload: id }) => {
                const messagesForRemoving = Object.values(state.entities).flatMap((message) => {
                    if (message.channelId === id) {
                        return message.id
                    }
                    return [];
                });
                adapterMessages.removeMany(state, messagesForRemoving) //почему здесь нужно подставлять state
               
            })
    }
});

export const selectorsMessages = adapterMessages.getSelectors((store) => store.dataMessages);

export const  actionsMessages = messagesSlice.actions;

export default messagesSlice.reducer;
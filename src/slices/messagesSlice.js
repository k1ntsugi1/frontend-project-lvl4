
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchDataCurrentUserByUserId } from './activeChannelSlice.js'
import { actionsChannels } from "./channelsSlice.js";


const adapterMessages = createEntityAdapter();

const  messagesSlice = createSlice({
    name: 'messagesChannelsCurrentUser',
    initialState: adapterMessages.getInitialState(),
    reducers: {
        addMessage: adapterMessages.addOne,
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchDataCurrentUserByUserId.fulfilled, (state, { payload: { messages }}) => {
                adapterMessages.setAll(state, messages)
            })
            .addCase(actionsChannels.removeChannel, (state, { payload: { id }}) => {
                console.log(state, id, 'messagesSlice');
                const allMessages = adapterMessages.selectAll();
                const messageForRemoving = allMessages.flatMap((message) => {
                    if(message.channelId === id) {
                        return message.id;
                    }
                    return [];
                });
                adapterMessages.removeMany(messageForRemoving);
            })
    }
});

export const selectorsMessages = adapterMessages.getSelectors((state) => state.messages);

export const  actionsMessages = messagesSlice.actions;

export default messagesSlice.reducer;
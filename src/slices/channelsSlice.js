
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchDataCurrentUserByUserId } from './activeChannelSlice.js'

const adapterChannels = createEntityAdapter();

const channelsSlice = createSlice({
    name: 'channelsCurrentUser',
    initialState: adapterChannels.getInitialState(),
    reducers: {
        ////Определить действия
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataCurrentUserByUserId.fulfilled, (state, { payload: { channels }}) => {
                adapterChannels.setAll(state, channels)
            })
    }
});

export const selectorsChannels = adapterChannels.getSelectors((state) => state.channels);

export const actionsChannels = channelsSlice.actions;

export default channelsSlice.reducer;
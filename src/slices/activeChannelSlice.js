
import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

import routes from "../routes.js";

export const fetchDataCurrentUserByUserId = createAsyncThunk(
    'currentUser/fetchCurrentUserByUserId', 
    async (token) => {
        const { data } = await axios.get(routes['getUserUrl'](), {
            headers: {
                Authorization: `Bearer ${token}`,
            } 
        });
        console.log(data, 'data')
        return data;
    }
);

//const adapterActiveChannel = createEntityAdapter()

const activeChannelSlice = createSlice({
    name: 'currentChannel',
    initialState: ({ loading: 'idle', error: null, currentChannelId: null }),
    reducers: {
        setNewActiveChannelId(state, { payload: currentChannelId }) {
            state.currentChannelId = currentChannelId;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataCurrentUserByUserId.pending, (state) => {
                console.log('start')
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(fetchDataCurrentUserByUserId.fulfilled, (state, { payload: { currentChannelId } }) => {
                state.loading = 'idle';
                state.error = null;
                console.log('loading')
                state.currentChannelId = currentChannelId
            })
            .addCase(fetchDataCurrentUserByUserId.rejected, (state, actions) => {
                state.loading = 'error';
                state.error = null;
                console.log(actions, 'Error!!!!!')
            })
    }
})

//export const selectorsActiveChannel = adapterActiveChannel.getSelectors(state => state.activeChannel );

export const actionsActiveChannel = activeChannelSlice.actions;

export default activeChannelSlice.reducer;
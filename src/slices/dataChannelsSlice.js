
import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import routes from "../routes.js";
import 'regenerator-runtime/runtime.js';

export const fetchDataCurrentUserByUserId = createAsyncThunk(
    'currentUser/fetchCurrentUserByUserId', 
    async (token) => {
        const { data } = await axios.get(routes['getUserUrl'](), {
            headers: {
                Authorization: `Bearer ${token}`,
            } 
        });
        return data;
    }
);

const adapterChannels = createEntityAdapter();

const channelsSlice = createSlice({
    name: 'channelsCurrentUser',
    initialState: adapterChannels.getInitialState({ loading: 'idle', error: null, currentChannelId: 1 }),
    reducers: {
        setNewActiveChannelId(state, { payload: { newId, typePreviousAct } }) {
            if (typePreviousAct === 'removeChannel') {
                if (state.currentChannelId === newId) state.currentChannelId = 1
                return;
            }
            state.currentChannelId = newId;
        },
        addNewChannel: adapterChannels.addOne,
        removeChannel: adapterChannels.removeOne,
        updateNameOfChannel: adapterChannels.updateOne,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDataCurrentUserByUserId.pending, (state) => {
            state.loading = 'loading';
            state.error = null;
        })
        .addCase(fetchDataCurrentUserByUserId.fulfilled, (state, { payload: { channels }}) => {
            state.loading = 'idle';
            state.error = null;
            adapterChannels.upsertMany(state, channels)
        })
        .addCase(fetchDataCurrentUserByUserId.rejected, (state) => {
            state.loading = 'error';
            state.error = null;
            throw new Error('something wrong with Network');
        })
    }
});

export const selectorsChannels = adapterChannels.getSelectors((state) => state.dataChannels);

export const actionsChannels = channelsSlice.actions;

export default channelsSlice.reducer;


import { configureStore } from '@reduxjs/toolkit';
import channelsCurrentUserReducer from './channelsSlice.js';
import messagesChannelsReducer from './messagesSlice.js';
import activeChannelReducer from './activeChannelSlice.js'
import uiNavbarReducer from './UiNavbarSlice.js';

export default configureStore({
    reducer: {
        activeChannel: activeChannelReducer,
        channels: channelsCurrentUserReducer,
        messages: messagesChannelsReducer,
        uiNavBar: uiNavbarReducer,
    },
})
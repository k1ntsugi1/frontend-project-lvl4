
import { configureStore } from '@reduxjs/toolkit';

import channelsCurrentUserReducer from './channelsSlice.js';
import messagesChannelsReducer from './messagesSlice.js';
import activeChannelReducer from './activeChannelSlice.js'

import uiModalReducer from './uiModalSlice.js'
import uiNavbarReducer from './uiNavbarSlice.js';

export default configureStore({
    reducer: {
        activeChannel: activeChannelReducer,
        channels: channelsCurrentUserReducer,
        messages: messagesChannelsReducer,
        uiModal: uiModalReducer,
        uiNavBar: uiNavbarReducer,
    },
})
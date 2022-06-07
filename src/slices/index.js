
import { configureStore } from '@reduxjs/toolkit';

import channelsCurrentUserReducer from './dataChannelsSlice.js';
import messagesChannelsReducer from './dataMessagesSlice.js';

import uiSpinnerReducer from './uiSpinnerSlice.js'
import uiModalReducer from './uiModalSlice.js'
import uiNavbarReducer from './uiNavbarSlice.js';

export default configureStore({
    reducer: {
        dataChannels: channelsCurrentUserReducer,
        dataMessages: messagesChannelsReducer,
        uiSpinner: uiSpinnerReducer,
        uiModal: uiModalReducer,
        uiNavBar: uiNavbarReducer,
    },
})
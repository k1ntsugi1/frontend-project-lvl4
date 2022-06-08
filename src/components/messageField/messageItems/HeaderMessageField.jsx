
import React from 'react';
import { useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { selectorsMessages } from '../../../slices/dataMessagesSlice.js'; 
import { selectorsChannels } from '../../../slices/dataChannelsSlice.js';
import { getMessagesCurrentChannel } from '../../../additionalFunction/getMessagesCurrentChannel.js';


const HeaderMessageField = ({t}) => {
    const currentActiveChannelId = useSelector( (store) => store.dataChannels.currentChannelId);
    const currentActiveChannel = useSelector( (store) => selectorsChannels.selectById(store, currentActiveChannelId ) ) ?? null

    const messages = useSelector(selectorsMessages.selectAll);
    let messagesCurrentChannel = [];
    if (currentActiveChannel) messagesCurrentChannel = getMessagesCurrentChannel(currentActiveChannelId, messages)

    return (
        <div className="bg-light mb-3 p-3 shadow-sm small border rounded-bottom">
            <h3># {currentActiveChannel && currentActiveChannel['name'] }</h3>
            <span>
            {
                messagesCurrentChannel.length > 0 
                ? messagesCurrentChannel.length 
                : 0
            } 
            {t("chatPage.messagesField.messages", {count: messagesCurrentChannel.length })}</span>
        </div>
    )
}

export default withTranslation()(HeaderMessageField);
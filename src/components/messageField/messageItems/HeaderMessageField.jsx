
import React from 'react';
import { useSelector } from 'react-redux';
import { selectorsMessages } from '../../../slices/messagesSlice.js'; 
import { selectorsChannels } from '../../../slices/channelsSlice.js';
import { getMessagesCurrentChannel } from '../../../additionalFunction/getMessagesCurrentChannel.js';
import { withTranslation } from 'react-i18next';

const HeaderMessageField = ({t}) => {
    const currentActiveChannelId = useSelector( (state) => state.activeChannel.currentChannelId);
    const currentActiveChannel = useSelector( (state) => selectorsChannels.selectById(state,currentActiveChannelId ) ) ?? null

    const messages = useSelector(selectorsMessages.selectAll);
    let messagesCurrentChannel = [];
    if (currentActiveChannel) messagesCurrentChannel = getMessagesCurrentChannel(currentActiveChannelId, messages)

    return (
        <div className="bg-light mb-3 p-3 shadow-sm small">
            <h3># {currentActiveChannel && currentActiveChannel['name'] }</h3>
            <span>{messagesCurrentChannel.length > 0 ? messagesCurrentChannel.length : 0} {t("messagesField.messages")}</span>
        </div>
    )
}

export default withTranslation()(HeaderMessageField);
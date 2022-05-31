
import React from 'react';
import { useSelector } from 'react-redux';
import {  
    actionsMessages,
    selectorsMessages,
} from '../../slices/messagesSlice.js';

import { getMessagesCurrentChannel } from '../../additionalFunction/getMessagesCurrentChannel.js'

export const BodyMessageField = () => {
    const currentActiveChannelId = useSelector( (state) => state.activeChannel.currentChannelId);
    const messages = useSelector(selectorsMessages.selectAll) ?? [];
    const messagesCurrentChannel = getMessagesCurrentChannel(currentActiveChannelId, messages);
    return (
        <div className='overflow-auto px-5 flex-grow-1 border rounded'>
            { messagesCurrentChannel.length > 0 &&
                messagesCurrentChannel.map((message) => {
                    <MessageItem key={message.id} message={message}/>
                })
            }
        </div>
    )
} 
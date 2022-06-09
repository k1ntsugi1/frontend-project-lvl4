
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectorsMessages } from '../../../slices/dataMessagesSlice.js';
import { MessageItem } from './MessageItem.jsx'
import { getMessagesCurrentChannel } from '../../../additionalFunction/getMessagesCurrentChannel.js'

export const BodyMessageField = () => {
    const currentActiveChannelId = useSelector( (store) => store.dataChannels.currentChannelId);
    const messages = useSelector(selectorsMessages.selectAll);
    const messagesCurrentChannel = getMessagesCurrentChannel(currentActiveChannelId, messages);
    const bodyMessageField = useRef();

    useEffect(() => {
        bodyMessageField.current.scrollTop = bodyMessageField.current.scrollHeight;
    })

    return (
        <div ref={bodyMessageField} className='px-5 pb-0 mb-0 flex-grow-1 rounded scrollbar scrollbar-primary'>
            { (messagesCurrentChannel.length > 0) 
                && messagesCurrentChannel.map((message) => {
                    return <MessageItem key={message.id} message={message}/>
                }) 
            }
        </div>
    )
} 
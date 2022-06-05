
import React from 'react';
import { useSelector } from 'react-redux';

import {  selectorsMessages } from '../../../slices/messagesSlice.js';
import { MessageItem } from './MessageItem.jsx'
import { getMessagesCurrentChannel } from '../../../additionalFunction/getMessagesCurrentChannel.js'

export const BodyMessageField = () => {
    const currentActiveChannelId = useSelector( (state) => state.activeChannel.currentChannelId);
    const messages = useSelector(selectorsMessages.selectAll);
    const messagesCurrentChannel = getMessagesCurrentChannel(currentActiveChannelId, messages);
    console.log(messagesCurrentChannel, 'body messages');
    return (
        <div className='px-5 pb-0 mb-0 flex-grow-1 rounded scrollbar scrollbar-info border-top'>
            
            { (messagesCurrentChannel.length > 0) 
                && messagesCurrentChannel.map((message) => {
                    return <MessageItem key={message.id} message={message}/>
                })
                
            }
            
        </div>
    )
} 

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    fetchDataCurrentUserByUserId,
    actionsActiveChannel,
} from '../slices/activeChannelSlice.js';

import {  
    actionsChannels,
    selectorsChannels,
} from '../slices/channelsSlice.js';

import {  
    actionsMessages,
    selectorsMessages,
} from '../slices/messagesSlice.js';

import { Channels } from '../components/Channels.jsx';

export const ChatPage = () => {
    const { token } = JSON.parse(localStorage.getItem('userId'));
    const dispath = useDispatch();

    useEffect( () => { 
            dispath(fetchDataCurrentUserByUserId(token));
        },[]);


    const channels = useSelector(selectorsChannels.selectAll);
    const currentChannelId = useSelector( (state) => state.activeChannel.currentChannelId);
    const messages = useSelector(selectorsMessages.selectAll)
    return (
        <div className="h-100 my-4 overflow-hidden rounded shadow">
            <Channels channels={channels} currentChannel={currentChannelId} />
            {/*<HeaderMessageFiled currentChannel={currentChannelId} channels={channels}/>
            <MessageField messages={messages} currentChannel={currentChannelId}*/}
        </div>
    )
}
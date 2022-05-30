
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    fetchDataCurrentUserByUserId,
    actionsActiveChannel,
} from '../slices/activeChannelSlice.js';

import { ChannelsField } from '../components/ChannelsField.jsx';
import { MessageField } from '../components/MessageField.jsx';

export const ChatPage = () => {
    const { token } = JSON.parse(localStorage.getItem('userId'));
    const dispath = useDispatch();

    useEffect( () => { 
            dispath(fetchDataCurrentUserByUserId(token));
        },[]);



    return (
        <div className="row h-100 my-4 overflow-hidden rounded shadow border border-info">
            <ChannelsField />
            <MessageField/>
        </div>
    )
}
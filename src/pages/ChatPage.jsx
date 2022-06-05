
import React, { useEffect} from "react";
import { useDispatch} from "react-redux";
import { ToastContainer} from 'react-toastify';
import { withTranslation } from "react-i18next";
import toastes from "../toastes/toastes.js";

import { fetchDataCurrentUserByUserId } from '../slices/activeChannelSlice.js';
import { actionsChannels } from '../slices/channelsSlice.js';
import { actionsMessages } from '../slices/messagesSlice.js';
import { actionsUiNavBar } from "../slices/uiNavbarSlice.js";

import { useSocket } from "../hooks/index.jsx";

import { ChannelsField } from '../components/channelsField/ChannelsField.jsx';
import { MessageField } from '../components/messageField/MessageField.jsx';



const handlerSocketListeners = (dispatch, socket, t) => {

    socket.on('newMessage', (messageWithId) => {
        const { id, body, channelId, username } = messageWithId;
        const newMessage = {
            body,
            channelId,
            username, 
            id,
        }
        dispatch(actionsMessages.addMessage(newMessage));
    });

    socket.on('newChannel', (channelWithId) => {
        const { id, removable, name  } = channelWithId;
        const newChannel = {
          id, 
          name,
          removable
        };
        dispatch(actionsChannels.addNewChannel(newChannel));  
        toastes['newChannel'](t, name);
      });

      socket.on('renameChannel', (channelWithId) => {
        const { id, name  } = channelWithId;
        dispatch(actionsChannels.updateNameOfChannel({id, changes: {name} }));
        toastes['renameChannel'](t, name);
      });

      socket.on('removeChannel', (channelWithId) => {
        const { id } = channelWithId;
        dispatch(actionsChannels.removeChannel( id ));
        toastes['removeChannel'](t);
      } )
}


export const ChatPage = ({t}) => {

    const userId = JSON.parse(localStorage.getItem('userId'));
    const { token, username } = userId;
    const dispatch = useDispatch();
    const { socket } = useSocket();
    
    useEffect( () => {
        socket.removeAllListeners() 
        dispatch(fetchDataCurrentUserByUserId(token));
        handlerSocketListeners(dispatch, socket, t);
        toastes['greeting'](t, username);
    }, []);

    useEffect( () => {
        dispatch(actionsUiNavBar.setNewActivePage({newActivePage: 'chat'}))
    }, [])


    return (
        <div className="row h-100 my-4 overflow-hidden rounded shadow border border-info">
            <ChannelsField />
            <MessageField/>
            <ToastContainer/>
        </div>
    )
}

export default withTranslation()(ChatPage)
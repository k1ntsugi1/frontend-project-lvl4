
import React, { useEffect } from "react";
import { batch, useDispatch, useSelector} from "react-redux";
import { ToastContainer} from 'react-toastify';
import { withTranslation } from "react-i18next";
import { ThreeDots } from  'react-loader-spinner'
import toastes from "../toastes/toastes.js";

import { fetchDataCurrentUserByUserId } from '../slices/dataChannelsSlice.js';
import { actionsChannels } from '../slices/dataChannelsSlice.js';
import { actionsMessages } from '../slices/dataMessagesSlice.js';
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
        batch( ()=> {
            dispatch(actionsChannels.addNewChannel(newChannel)); 
            dispatch(actionsChannels.setNewActiveChannelId({ newId: newChannel.id, typePreviousAct: 'addChannel' })); 
        } )
         
        toastes['newChannel'](t, name);
      });

      socket.on('renameChannel', (channelWithId) => {
        const { id, name  } = channelWithId;
        dispatch(actionsChannels.updateNameOfChannel({id, changes: {name} }));
        toastes['renameChannel'](t, name);
      });

      socket.on('removeChannel', (channelWithId) => {
        const { id } = channelWithId;
        batch( () => {
            dispatch(actionsChannels.removeChannel( id ));
            dispatch(actionsChannels.setNewActiveChannelId( { newId: id, typePreviousAct: 'removeChannel' } ));
        } )
        
        toastes['removeChannel'](t);
      } )
}


export const ChatPage = ({t}) => {

    const userId = JSON.parse(localStorage.getItem('userId'));
    const { token, username } = userId;
    const dispatch = useDispatch();
    const { socket } = useSocket();
    const spinnerStatus = useSelector( (store) => store.uiSpinner.status);

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
        spinnerStatus === "pending" 
        ? (
            <div className="position-absolute top-50 start-50">
                <ThreeDots
                    height="70"
                    width="70"
                    color='#e8e8f8'
                    ariaLabel='loading'
                />
            </div>
            )
        : (
            <div className="row h-100 my-4 overflow-hidden rounded shadow border border-success">
                <ChannelsField />
                <MessageField/>
                <ToastContainer draggablePercent={30}/>
            </div>
        )
         
    )
}

export default withTranslation()(ChatPage)
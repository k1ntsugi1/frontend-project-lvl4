
import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import { useImmer } from "use-immer";
import { ToastContainer} from 'react-toastify';


import { fetchDataCurrentUserByUserId } from '../slices/activeChannelSlice.js';
import { actionsChannels } from '../slices/channelsSlice.js';
import { actionsMessages } from '../slices/messagesSlice.js';

import { ModalContext} from '../contexts/index.jsx';
import { useSocket } from "../hooks/index.jsx";

import { ChannelsField } from '../components/channelsField/ChannelsField.jsx';
import { MessageField } from '../components/messageField/MessageField.jsx';
import { withTranslation } from "react-i18next";

import toastes from "../toastes/toastes.js";


const ModalProvider = ({children}) => {
    
    const [showState, setShow] = useImmer({addChannelModal: false, renameChannelModal: false, removeChannelModal: false});

    const handleShow = (typeModal) => () => {
        const mappingShowing = {
            'addChannelModal': () => {
                setShow( (dref) => {
                    dref.addChannelModal = true;
                });
            },
            'renameChannelModal': () => {
                setShow( (dref) => {
                    dref.renameChannelModal = true;
                });
            },
            'removeChannelModal': () => {
                setShow( (dref) => {
                    dref.removeChannelModal = true;
                });
            }
        }
        mappingShowing[typeModal]();
    }
    
    const handleClose = (typeModal) => () => {
        const mappingClosing ={
            'addChannelModal': () => {
                setShow( (dref) => {
                    dref.addChannelModal = false;
                });
            },
            'renameChannelModal': () => {
                setShow( (dref) => {
                    dref.renameChannelModal = false;
                });
            },
            'removeChannelModal': () => {
                setShow( (dref) => {
                    dref.removeChannelModal = false;
                });
            }
        }
        mappingClosing[typeModal]();
    };

    return (
        <ModalContext.Provider value={ { showState, handleShow, handleClose } }>
            {children}
        </ModalContext.Provider>
    )

}

const handlerSocketListeners = (dispatch, socket, t) => {

    socket.on('newMessage', (messageWithId) => {
        const { id, message, channelId } = messageWithId;
        const newMessage = {
            body: message,
            channelId,
            username: JSON.parse(localStorage.getItem('userId')).username, 
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


export const ChatPage = ({t, setNewAdditionalNavBtn}) => {
    setNewAdditionalNavBtn('chat');
    const userId = JSON.parse(localStorage.getItem('userId'));
    const { token, username } = userId;
    const dispatch = useDispatch();
    const { socket } = useSocket()
    useEffect( () => {
        socket.removeAllListeners() 
        dispatch(fetchDataCurrentUserByUserId(token));
        handlerSocketListeners(dispatch, socket, t);
        toastes['greeting'](t, username);
    }, []);


    return (
        <div className="row h-100 my-4 overflow-hidden rounded shadow border border-info">

            <ModalProvider>
                <ChannelsField />
            </ModalProvider>

            <MessageField/>

            <ToastContainer/>
        </div>
    )
}

export default withTranslation()(ChatPage)
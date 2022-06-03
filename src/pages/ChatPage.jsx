
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { ToastContainer, toast } from 'react-toastify';


import { fetchDataCurrentUserByUserId } from '../slices/activeChannelSlice.js';
import { actionsChannels } from '../slices/channelsSlice.js';
import { actionsMessages } from '../slices/messagesSlice.js';

import { ModalContex} from '../contexts/index.jsx';
import { useSocket } from "../hooks/index.jsx";

import { ChannelsField } from '../components/channelsField/ChannelsField.jsx';
import { MessageField } from '../components/messageField/MessageField.jsx';



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
        <ModalContex.Provider value={ { showState, handleShow, handleClose } }>
            {children}
        </ModalContex.Provider>
    )

}

const handlerSocketListeners = (dispatch, socket, currentActiveChannelId) => {

    socket.on('newMessage', (messageWithId) => {
        const { id, message } = messageWithId;
        const newMessage = {
            body: message,
            channelId: currentActiveChannelId,
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
        toast('⭐ Канал создан!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });
      socket.on('renameChannel', (channelWithId) => {
        const { id, name  } = channelWithId;
        dispatch(actionsChannels.updateNameOfChannel({id, changes: {name} }));
        toast('🦄 Канал перименован!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });
      socket.on('removeChannel', (channelWithId) => {
        const { id } = channelWithId;
        dispatch(actionsChannels.removeChannel( id ));
        toast('😲 Канал удален!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } )
}


export const ChatPage = () => {
    //Обработать!
    const currentActiveChannelId = useSelector( (store) => store.activeChannel.currentChannelId) ?? 1;

    const userId = JSON.parse(localStorage.getItem('userId'));
    const dispatch = useDispatch();
    const { socket } = useSocket()
    useEffect( () => { 
        dispatch(fetchDataCurrentUserByUserId(userId.token));
        handlerSocketListeners(dispatch, socket, currentActiveChannelId);
        return socket.removeAllListeners;
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    fetchDataCurrentUserByUserId,
    actionsActiveChannel,
} from '../slices/activeChannelSlice.js';

import { ModalContex, SocketContex } from '../contexts/index.jsx';
import { useSocket } from "../hooks/index.jsx";
import { ChannelsField } from '../components/channelsField/ChannelsField.jsx';
import { MessageField } from '../components/messageField/MessageField.jsx';
import { io } from "socket.io-client";
import { useImmer } from "use-immer";



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

const SocketProvider = ({socket, children}) => {
    return (
        <SocketContex.Provider value={{ socket }}>
            {children}
        </SocketContex.Provider>
    )
}

export const ChatPage = () => {

    const userId = JSON.parse(localStorage.getItem('userId'));
    const dispath = useDispatch();

    const [socket, setSocket] = useState(null);

    const handlerSocket = () => {
        const newSocket = io();
        return setSocket(newSocket)
    }

    useEffect( () => { 
        if (userId && userId.token) {
            dispath(fetchDataCurrentUserByUserId(userId.token));
            handlerSocket();
        }
    },[]);

    return (
        <div className="row h-100 my-4 overflow-hidden rounded shadow border border-info">
            <SocketProvider socket={socket}>
                <ModalProvider>
                    <ChannelsField />
                </ModalProvider>
                <MessageField/>
            </SocketProvider>
        </div>
    )
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    fetchDataCurrentUserByUserId,
    actionsActiveChannel,
} from '../slices/activeChannelSlice.js';

import { ModalContex, SocketContex } from '../contexts/index.jsx';
import { useSocket } from "../hooks/index.jsx";
import { ChannelsField } from '../components/ChannelsField.jsx';
import { MessageField } from '../components/MessageField.jsx';
import { io } from "socket.io-client";
import { useImmer } from "use-immer";



const ModalProvider = ({children}) => {
    
    const [show, setShow] = useImmer({showAddChannelModal: false, showRenameChannelModal: false});

    const handleShow = (action) => () => {
        const mappingShowing ={
            'showAddChannelModal': () => {
                setShow( (state) => {
                    state.showAddChannelModal = true;
                });
            },
            'showRenameChannelModal': () => {
                setShow( (state) => {
                    state.showRenameChannelModal = true;
                });
            }
        }
        mappingShowing[action]();
    }
    
    const handleClose = (action) => () => {
        const mappingClosing ={
            'showAddChannelModal': () => {
                setShow( (state) => {
                    state.showAddChannelModal = false;
                });
            },
            'showRenameChannelModal': () => {
                setShow( (state) => {
                    state.showRenameChannelModal = false;
                });
            }
        }
        mappingClosing[action]();
    };

    return (
        <ModalContex.Provider value={ { show, handleShow, handleClose } }>
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

    const { token } = JSON.parse(localStorage.getItem('userId'));
    const dispath = useDispatch();

    const [socket, setSocket] = useState(null);

    const handlerSocket = () => {
        const newSocket = io();
        return setSocket(newSocket)
    }

    useEffect( () => { 
        dispath(fetchDataCurrentUserByUserId(token));
        handlerSocket();
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
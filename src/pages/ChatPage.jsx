
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    fetchDataCurrentUserByUserId,
    actionsActiveChannel,
} from '../slices/activeChannelSlice.js';

import { ModalContex } from '../contexts/index.jsx';

import { ChannelsField } from '../components/ChannelsField.jsx';
import { MessageField } from '../components/MessageField.jsx';



const ModalProvider = ({children}) => {
    
    const [show, setShow] = useState(false);
    console.log(show, 'modalProvider')
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <ModalContex.Provider value={ { show, handleShow, handleClose } }>
            {children}
        </ModalContex.Provider>
    )

}

export const ChatPage = () => {

    const { token } = JSON.parse(localStorage.getItem('userId'));
    const dispath = useDispatch();

    useEffect( () => { 
            dispath(fetchDataCurrentUserByUserId(token));
        },[]);



    return (
        <div className="row h-100 my-4 overflow-hidden rounded shadow border border-info">
            <ModalProvider>
                <ChannelsField />
            </ModalProvider>
            <MessageField/>
        </div>
    )
}

import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { ToastContainer} from 'react-toastify';
import { withTranslation } from "react-i18next";
import { ThreeDots } from  'react-loader-spinner'
import toastes from "../toastes/toastes.js";

import { fetchDataCurrentUserByUserId } from '../slices/dataChannelsSlice.js';

import { actionsUiNavBar } from "../slices/uiNavbarSlice.js";

import { ChannelsField } from '../components/channelsField/ChannelsField.jsx';
import { MessageField } from '../components/messageField/MessageField.jsx';


export const ChatPage = ({t}) => {

    const userId = JSON.parse(localStorage.getItem('userId'));
    const { token, username } = userId;
    const dispatch = useDispatch();
    const spinnerStatus = useSelector( (store) => store.uiSpinner.status);

    useEffect( () => {
        dispatch(fetchDataCurrentUserByUserId(token));
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
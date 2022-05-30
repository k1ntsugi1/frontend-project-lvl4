
import React from 'react';
import { useSelector } from 'react-redux';
import {  
    actionsMessages,
    selectorsMessages,
} from '../../slices/messagesSlice.js';

export const BodyMessageField = () => {
    const messages = useSelector(selectorsMessages.selectAll)
    return (
        <div className='overflow-auto px-5 flex-grow-1 border rounded'>

        </div>
    )
} 
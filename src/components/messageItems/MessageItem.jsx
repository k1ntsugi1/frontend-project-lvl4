
import React from 'react';


export const MessageItem = ({message}) => {
    const { body, username } = message;
    return (
        <div className='text-break mb-2'>
            <b>{ username }</b>
            "":""
            <span>{ body }</span>
        </div>
    )
}